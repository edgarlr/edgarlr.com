---
name: encode-video
description: Encode screen recordings and clips for cdn.edgarlr.com before they're uploaded to Bunny, and make their WebP posters. Use whenever a video is being added to a work case study or post, when the user mentions uploading clips to Bunny or the CDN, attaches a raw .mp4/.mov from CleanShot or another recorder, or asks why a clip is heavy. Also use when an MDX `<Video>` points at a cdn.edgarlr.com .mp4 that 404s or weighs more than ~5 MB.
---

# Encode video for the CDN

Every clip on the site is a looping UI recording that has to stay sharp. Raw
recorder exports are 5–12× heavier than they need to be, so nothing goes up to
Bunny without passing through `scripts/encode-video.sh` first.

## The workflow

1. Edgar drops the original recordings into `.context/videos/<slug>/`, where
   `<slug>` is the filename of the work or post MDX they belong to
   (`work/sequence-website.mdx` → `.context/videos/sequence-website/`). If
   they arrive as Conductor attachments instead, move them there yourself,
   once you know which page they're for.
2. Encode and upload:

   ```bash
   pnpm encode-video --upload .context/videos/sequence-website/*.mov
   ```

3. Write each clip's alt text from its frame sheet (see below).
4. Add or update the `<Video>` blocks in the MDX with the printed props and
   the alt. If the page doesn't reference the clip yet and Edgar hasn't said
   where it goes, ask rather than guess the placement.
5. Report back: sizes, CDN status, the alts as drafts, and anything off about
   a clip (a poster frame caught mid-scroll, a cursor parked over the content).

## What the script does

One page, one folder, the same on disk and on Bunny:

| Local input                                   | On the CDN                                           |
| --------------------------------------------- | ---------------------------------------------------- |
| `.context/videos/sequence-website/agents.mov` | `cdn.edgarlr.com/sequence-website/agents.mp4`        |
|                                               | `cdn.edgarlr.com/sequence-website/agents-cover.webp` |

For each input it writes into `encoded/` next to the source:

- `<name>.mp4`: the clip.
- `<name>-cover.webp`: the poster, frame 0 of the encode.
- `<name>-frames.jpg`: six moments across the clip on one sheet. It stays
  local and exists for the alt text.

It then uploads the clip and poster (with `--upload`), checks what
`cdn.edgarlr.com` answers, and prints the `src`, `poster`, `width` and
`height` props. `width`/`height` must come from that output, not the raw
recording, because the encode may have been scaled down.

- A clip whose folder isn't a slug in `work/` or `posts/` is refused, so a
  typo can't create a stray Bunny folder.
- The input filename is the CDN filename. Rename before encoding, not after.
- `CRF=16 pnpm encode-video …` for a clip packed with small text,
  `CRF=20` for one that's mostly flat colour.
- `.context/` is gitignored, and the sandbox can only write inside the
  workspace, which is why the originals live there and not on the Desktop.
- Needs ffmpeg (`brew install ffmpeg`).

Pages uploaded before this convention use older folders (`sequence-2026/`
serves `sequence-website`, posters named `<name>.webp`). Leave them alone.
New clips for those pages still go in the slug folder.

## Alt text

`<video>` has no `alt`, so `Media` turns the prop into the clip's accessible
name. It's the only way a screen reader user learns what the clip shows.

Read `<name>-frames.jpg` with the Read tool. The six frames run left to right,
top to bottom, from start to end. Write one sentence in the voice the rest of
the site already uses:

- Name the surface first, then what it shows, then what moves:
  `The Sequence MCP page — “Connect your AI assistant to Sequence” inside a
dotted, radiating ring that shifts from blue to orange.`
- Quote on-screen headlines exactly, in curly quotes.
- Describe the motion in the present tense (stepping through, easing to,
  swelling on hover). The motion is why it's a clip and not a screenshot.
- Leave out the cursor, the recording itself ("a video of") and colours that
  carry no meaning.
- Match the density of the alts already on that page. Read a few first.

Every alt is a draft. Edgar knows what an interaction was for, and a frame
sheet only shows what it looked like, so flag the alts for him to check.

### Uploading

`--upload` reads `BUNNY_STORAGE_UPLOAD_URL` (the storage endpoint plus zone,
`https://storage.bunnycdn.com/edgarlr-assets`) and `BUNNY_STORAGE_PASSWORD`
(the zone's own password, which can't touch the rest of the account) from
`.env`. Never print the password. The script passes it to curl through a file
descriptor so it stays out of `ps` too.

Uploading publishes to the live CDN. Confirm the folder with Edgar before the
first upload of a batch unless he has already named it.

The script never overwrites a file with different contents, because the CDN
tells browsers to cache for a year, so a replacement would only reach new
visitors. A re-encode gets a new name (`labs-v2.mp4`). Re-running an upload
that already went through is fine: identical files report `unchanged`.

If the CDN answers 404 right after a successful upload, it is probably a 404
the pull zone cached before the file existed. It clears when that cache entry
expires, or with a purge in the Bunny dashboard.

## Why these settings

Measured on `outcomes.mp4`, a 13.9s CleanShot export:

| Encode                                    | Size    | VMAF |
| ----------------------------------------- | ------- | ---- |
| Raw export (2984px, 60fps, ~20 Mbps)      | 32.7 MB | —    |
| H.264 2048w CRF 18 (what the script does) | 2.7 MB  | 97.0 |
| H.264 2048w CRF 22                        | 1.5 MB  | 96.1 |
| AV1 2048w CRF 30                          | 1.5 MB  | 97.5 |
| H.264 CRF 18 at 30fps                     | 2.6 MB  | —    |

A VMAF above ~95 is generally treated as indistinguishable from the source.
Crops of text from the same frame were identical by eye.

- **2048px wide at most.** The wide band is 64rem (`lib/bands.ts`), so a 2x
  screen never draws more than 2048 device pixels. That is where most of the
  saving comes from.
- **Keep 60fps.** Halving the frame rate saved 4%, because unchanged frames are
  already almost free. It isn't worth losing smooth motion for.
- **H.264 only.** AV1 is about 45% smaller, but Safari only decodes it on
  M3/A17 Pro hardware and later, so it would need an H.264 fallback and
  `<source>` support in `components/autoplay-video.tsx`. Not worth it while
  clips are 1–5 MB.
- **Bunny Storage + CDN, not Bunny Stream.** Stream re-encodes uploads with
  its own settings and serves adaptive HLS that opens at low resolution, which
  is the soft first second these clips must not have.

## Posters are not optional

Every `<Video>` needs a `poster`. At 30–100 KB it is 1–4% of the clip, and
`AutoplayVideo` relies on it. The poster is all that shows when:

- the clip hasn't been reached yet (`preload="none"` until it's 400px away);
- the visitor prefers reduced motion (nothing plays until they press play);
- autoplay is refused (iOS Low Power Mode, data saver);
- the network is slow, while the first frames are still arriving.

Without a poster, every one of those cases is an empty bordered box. The
script takes frame 0 _of the encode_, so the switch from poster to playing
video is pixel-identical and doesn't flash.

## Auditing what's already up

To find heavy or missing clips across the site:

```bash
grep -rhoE 'https://cdn\.edgarlr\.com/[^"]+\.mp4' work posts | sort -u |
  while read u; do
    printf '%s %s\n' "$(curl -sI "$u" | grep -i '^content-length' | tr -dc 0-9)" "$u"
  done | sort -rn | head
```

A blank size means a 404 (not uploaded yet). Anything over ~5 MB is worth
re-encoding from its original recording.
