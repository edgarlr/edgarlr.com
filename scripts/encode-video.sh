#!/usr/bin/env bash
#
# Encode screen recordings for the CDN, and optionally upload them to Bunny.
#
#   pnpm encode-video .context/videos/sequence-website/agents.mov
#   pnpm encode-video --upload .context/videos/sequence-website/*.mov
#
# Clips are grouped by page: each sits in a folder named after the slug of the
# work or post MDX it belongs to, and that folder name is reused on Bunny. So
# `.context/videos/sequence-website/agents.mov` ends up as
#
#   cdn.edgarlr.com/sequence-website/agents.mp4         the clip
#   cdn.edgarlr.com/sequence-website/agents-cover.webp  its poster
#
# Both are written into an `encoded/` folder next to the input first, along
# with `<name>-frames.jpg`, a contact sheet of six moments across the clip that
# stays local: it's what the alt text gets written from. Then the <Video> props
# are printed for the MDX. `--upload` also puts the clip and poster on Bunny,
# using BUNNY_STORAGE_UPLOAD_URL and BUNNY_STORAGE_PASSWORD from the
# environment, .env.local or .env.
#
# Why these settings (measured on two CleanShot exports, 33 MB -> 2.7 MB at
# VMAF 97, which no one can tell apart from the source):
#
#   - 2048px wide at most. The wide band is 64rem, so a 2x screen never draws
#     more than 2048 device pixels; anything above that is downloaded and
#     thrown away. Smaller sources are left alone, never upscaled.
#   - CRF instead of a bitrate. Screen recorders export at a fixed ~20 Mbps;
#     constant quality spends almost nothing on the frames where the UI sits
#     still, which is most of them.
#   - Frame rate kept, capped at 60. Dropping to 30 saved 4%: unchanged frames
#     are already free, so halving them only costs smooth motion.
#   - The poster is frame 0 of the encode, so the swap from still to playing is
#     invisible. AutoplayVideo leans on it: it's all a reduced-motion visitor,
#     an iOS Low Power Mode visitor or a not-yet-scrolled-to clip ever shows.
#
# CRF=16 for a clip dense with small text, CRF=20 for one that's mostly flat.
#
# Shaders with film grain are the exception to all of the above: the grain is
# new noise every frame, so at 2048px and CRF 18 a 12s clip came out at 67 MB.
# MAX_WIDTH=1600 CRF=24 brought it to ~10 MB with the grain still visible on a
# 2x screen; halving the frame rate saved under 10%, so it stays at 60.
#
# An upload never overwrites a different file. The CDN tells browsers to keep
# a clip for a year, so a replaced file would only reach people who have never
# seen the old one; a re-encode gets a new name instead (`labs-v2.mp4`).

set -euo pipefail

CRF="${CRF:-18}"
MAX_WIDTH="${MAX_WIDTH:-2048}"
CDN="https://cdn.edgarlr.com"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

usage() {
  echo "Usage: pnpm encode-video [--upload] <page-slug>/<clip> [...]" >&2
  echo "       The folder a clip sits in is the slug of its work or post MDX." >&2
  echo "       CRF=$CRF by default; CRF=16 for dense text, CRF=20 for flat clips" >&2
  echo "       MAX_WIDTH=1600 CRF=24 for shaders with film grain" >&2
  exit 1
}

upload=0
inputs=()
while [ $# -gt 0 ]; do
  case "$1" in
    --upload) upload=1 ;;
    -h | --help) usage ;;
    *) inputs+=("$1") ;;
  esac
  shift
done

[ ${#inputs[@]} -gt 0 ] || usage

if ! command -v ffmpeg >/dev/null; then
  echo "ffmpeg not found. Install it with: brew install ffmpeg" >&2
  exit 1
fi

# Only the two Bunny keys are read, and the real environment wins, then
# .env.local, then .env — the same order Next uses. The files aren't sourced:
# they belong to Next, not to the shell.
load_bunny_env() {
  local file key value
  for file in "$ROOT/.env.local" "$ROOT/.env"; do
    [ -f "$file" ] || continue
    while IFS='=' read -r key value || [ -n "$key" ]; do
      case "$key" in
        BUNNY_STORAGE_PASSWORD | BUNNY_STORAGE_UPLOAD_URL)
          value="${value%$'\r'}"
          value="${value%\"}"
          value="${value#\"}"
          value="${value%\'}"
          value="${value#\'}"
          [ -n "${!key:-}" ] || export "$key=$value"
          ;;
      esac
    done < "$file"
  done
}

# The password goes to curl through a config file descriptor rather than an
# argument, so it never shows up in `ps`.
bunny() {
  curl -sS --config <(printf 'header = "AccessKey: %s"\n' "$BUNNY_STORAGE_PASSWORD") "$@"
}

# "<name>\t<sha256>" for every file in a Bunny folder; nothing for a folder
# that doesn't exist yet, which the first upload creates. Returns 1 when Bunny
# refuses, which means the credentials are wrong.
list_folder() {
  local response status
  response=$(bunny -H "Accept: application/json" -w '\n%{http_code}' "$STORAGE/$1/")
  status="${response##*$'\n'}"
  case "$status" in
    200)
      printf '%s' "${response%$'\n'*}" | node -e '
        let d = ""
        process.stdin.on("data", c => (d += c)).on("end", () => {
          for (const f of JSON.parse(d)) if (!f.IsDirectory) console.log(`${f.ObjectName}\t${f.Checksum}`)
        })'
      ;;
    404) ;;
    *)
      echo "Bunny refused the listing of $1/ (HTTP $status). Check BUNNY_STORAGE_* in .env." >&2
      return 1
      ;;
  esac
}

if [ "$upload" = 1 ]; then
  load_bunny_env
  if [ -z "${BUNNY_STORAGE_PASSWORD:-}" ] || [ -z "${BUNNY_STORAGE_UPLOAD_URL:-}" ]; then
    echo "--upload needs BUNNY_STORAGE_PASSWORD and BUNNY_STORAGE_UPLOAD_URL in .env" >&2
    exit 1
  fi
  STORAGE="${BUNNY_STORAGE_UPLOAD_URL%/}"
  # Check the credentials before any encoding time is spent.
  list_folder "" >/dev/null || exit 1
fi

# Prints "uploaded", "unchanged" (already up, byte for byte), "conflict", or
# "failed". Never exits non-zero: it runs in a command substitution.
upload_file() {
  local file="$1" type="$2" folder="$3" listing="$4" name remote sum
  name="$(basename "$file")"
  sum="$(shasum -a 256 "$file" | awk '{ print toupper($1) }')"
  remote="$(printf '%s\n' "$listing" | awk -F'\t' -v n="$name" '$1 == n { print $2 }')"

  if [ "$remote" = "$sum" ]; then
    echo unchanged
  elif [ -n "$remote" ]; then
    echo conflict
  elif bunny --fail -X PUT -o /dev/null \
    -H "Checksum: $sum" -H "Content-Type: $type" \
    --upload-file "$file" "$STORAGE/$folder/$name" >&2; then
    echo uploaded
  else
    echo failed
  fi
}

# What the public URL actually serves. A 404 right after an upload can be one
# the CDN cached from before the file existed.
live() {
  curl -sI -o /dev/null -w '%{http_code}' "$1"
}

# pnpm runs scripts from the repo root; resolve relative paths from where the
# command was typed instead.
cd "${INIT_CWD:-$PWD}"

mb() { awk -v b="$1" 'BEGIN { printf "%.1f", b / 1048576 }'; }

failed=0
for input in "${inputs[@]}"; do
  if [ ! -f "$input" ]; then
    echo "Skipping $input: not a file" >&2
    failed=1
    continue
  fi

  source_dir="$(cd "$(dirname "$input")" && pwd)"
  slug="$(basename "$source_dir")"
  if [ ! -f "$ROOT/work/$slug.mdx" ] && [ ! -f "$ROOT/posts/$slug.mdx" ]; then
    echo "Skipping $input: its folder, $slug/, isn't a page. Put it in a folder named after a slug in work/ or posts/." >&2
    failed=1
    continue
  fi

  dir="$source_dir/encoded"
  name="$(basename "${input%.*}")"
  # The name becomes the CDN path. A recorder's default ("CleanShot 2026-10-14
  # at 10.00.00") would end up as a URL with spaces in it.
  case "$name" in
    *[!A-Za-z0-9._-]*)
      echo "Skipping $input: the filename becomes the CDN filename, so it can only use letters, digits, dots, dashes and underscores. Rename it first." >&2
      failed=1
      continue
      ;;
  esac
  video="$dir/$name.mp4"
  poster="$dir/$name-cover.webp"
  frames="$dir/$name-frames.jpg"
  mkdir -p "$dir"

  ffmpeg -hide_banner -loglevel error -stats -y -i "$input" \
    -vf "scale='min($MAX_WIDTH,iw)':-2:flags=lanczos" -fpsmax 60 -an \
    -c:v libx264 -preset slow -crf "$CRF" -tune animation -pix_fmt yuv420p \
    -movflags +faststart "$video"

  ffmpeg -hide_banner -loglevel error -y -i "$video" \
    -frames:v 1 -c:v libwebp -quality 90 "$poster"

  # Six evenly spaced frames, two across: enough to see what moves, small
  # enough to read in one look.
  duration="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$video")"
  ffmpeg -hide_banner -loglevel error -y -i "$video" \
    -vf "fps=6/$duration,scale=768:-2,tile=2x3:padding=8:color=white" \
    -frames:v 1 -q:v 3 "$frames"

  read -r width height < <(ffprobe -v error -select_streams v:0 \
    -show_entries stream=width,height -of csv=p=0:s=x "$video" | tr x ' ')
  before=$(wc -c < "$input")
  after=$(wc -c < "$video")
  still=$(wc -c < "$poster")

  echo
  echo "$slug/$name: $(mb "$before") MB -> $(mb "$after") MB, poster $((still / 1024)) KB"
  echo "  $video"
  echo "  $poster"
  echo "  $frames (local only, for the alt text)"

  base="$CDN/$slug"
  ok=1
  if [ "$upload" = 1 ]; then
    if ! listing="$(list_folder "$slug")"; then
      failed=1
      continue
    fi
    for file in "$video" "$poster"; do
      case "$file" in *.mp4) type=video/mp4 ;; *) type=image/webp ;; esac
      result="$(upload_file "$file" "$type" "$slug" "$listing")"
      url="$base/$(basename "$file")"
      case "$result" in
        conflict)
          echo "  ✗ $url is already on Bunny with different contents. Rename the clip (e.g. $name-v2) and run again." >&2
          failed=1
          ok=0
          ;;
        failed)
          echo "  ✗ Upload of $url failed (see the curl error above)." >&2
          failed=1
          ok=0
          ;;
        *)
          echo "  ✓ $result, CDN answers $(live "$url"): $url"
          ;;
      esac
    done
  fi

  # Props for a clip that didn't make it up would point at someone else's file.
  [ "$ok" = 1 ] || continue

  echo
  echo "  src=\"$base/$name.mp4\""
  echo "  poster=\"$base/$name-cover.webp\""
  echo "  width={$width}"
  echo "  height={$height}"
done

exit "$failed"
