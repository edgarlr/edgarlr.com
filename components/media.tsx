import Image from 'next/image'
import cn from 'clsx'
import { preload as preloadImage } from 'react-dom'
import { AutoplayVideo } from './autoplay-video'

/**
 * Media blocks for case studies and posts.
 *
 * Every block is a `<figure>` that opts out of the typography plugin
 * (`not-prose`) and picks a band from app/globals.css: the default 70ch prose
 * column or `band-wide`. The band class has to land on the element that is a
 * direct child of `.bands`, which is why each block puts it on its own root —
 * and why both article layouts render MDX as direct children of that element.
 *
 * There is deliberately no full-bleed band: every block lands on the same wide
 * band so a case study reads as one column of media. The only exception is
 * portrait media, which is capped by height and centred on a plate instead of
 * towering over the page.
 */

export type Band = 'prose' | 'wide'

export type MediaSource = {
  src: string
  alt?: string
  width: number
  height: number
  /** Render a looping muted clip instead of a still. */
  video?: boolean
  poster?: string
  /**
   * Drop the screenshot chrome. Photography, print and packaging carry their
   * own edges; a hairline border and 6px radius only make them look pasted on.
   */
  bare?: boolean
}

const bandClass: Record<Band, string> = {
  prose: '',
  wide: 'band-wide',
}

/**
 * Keep in sync with `--band-wide` / `--band-gutter` in app/globals.css. A band
 * is gutter-bound until the viewport can hold its full width, which is the
 * breakpoint every `sizes` below switches on.
 */
const BAND_WIDE_REM = 56
const BAND_GUTTER_REM = 1.5
const BAND_WIDE_MIN_REM = BAND_WIDE_REM + BAND_GUTTER_REM * 2

/** Tailwind's `sm`, where the multi-column blocks stop collapsing. */
const SM_REM = 40

const bandSizes: Record<Band, string> = {
  prose: '(min-width: 44rem) 40rem, 100vw',
  wide: `(min-width: ${BAND_WIDE_MIN_REM}rem) ${BAND_WIDE_REM}rem, 100vw`,
}

/**
 * `sizes` for one tile of a grid that runs `columns` across down to `sm` and
 * `mobileColumns` across below it. The last step is the one worth spelling out:
 * without it a tile that goes full width on a phone still asks for a fraction
 * of the viewport, and the browser hands back an image half the size it needs.
 */
const tileSizes = (columns: number, mobileColumns: number) =>
  [
    `(min-width: ${BAND_WIDE_MIN_REM}rem) ${Math.round(BAND_WIDE_REM / columns)}rem`,
    `(min-width: ${SM_REM}rem) ${Math.round(100 / columns)}vw`,
    `${Math.round(100 / mobileColumns)}vw`,
  ].join(', ')

/**
 * Portrait media — a poster, packaging, a phone screen — would tower over the
 * page at the full width of its band, so it gets capped by height instead.
 * Square is the cutoff: anything landscape keeps the band's width, which is
 * what makes every block on a case study line up.
 */
const isTall = ({ width, height }: MediaSource) => height / width > 1

/**
 * The chrome that makes a screenshot read as a screenshot. Drawn once, and on
 * whichever element actually bounds the media: the figure's own wrapper for a
 * single block — `overflow-clip` there is what rounds a playing clip's corners,
 * which a radius on the `<video>` itself doesn't reliably do — or the media
 * element inside a plate or a grid, where the wrapper bounds padding or tiles
 * instead. `bare` drops it either way.
 */
const FRAME = 'rounded-md border-[0.5px] border-tertiary'

const frameClass = (source: MediaSource, capped: boolean, framed: boolean) =>
  cn(
    'block h-auto',
    capped ? 'mx-auto max-h-[78svh] w-auto max-w-full' : 'w-full',
    framed && !source.bare && FRAME,
  )

const Media = ({
  source,
  band,
  sizes,
  preload,
  controls,
  framed = true,
}: {
  source: MediaSource
  band: Band
  sizes?: string
  preload?: boolean
  controls?: boolean
  /** Off when the figure's wrapper draws the frame instead. */
  framed?: boolean
}) => {
  const className = frameClass(source, isTall(source), framed)

  if (source.video) {
    // Pass `controls` for anything long enough to need scrubbing. Everything
    // else is a short UI clip that reads as an animated still — AutoplayVideo
    // starts those itself so `prefers-reduced-motion` can veto the motion.
    // `<video>` has no `alt`, so a clip's description has to land as its
    // accessible name. Left off when there is none rather than set to '': an
    // empty label would leave the element named by its filename.
    return controls ? (
      <video
        src={source.src}
        poster={source.poster}
        width={source.width}
        height={source.height}
        aria-label={source.alt || undefined}
        className={className}
        controls
        preload="metadata"
      />
    ) : (
      <AutoplayVideo
        src={source.src}
        poster={source.poster}
        width={source.width}
        height={source.height}
        aria-label={source.alt || undefined}
        className={className}
      />
    )
  }

  return (
    <Image
      src={source.src}
      alt={source.alt ?? ''}
      width={source.width}
      height={source.height}
      quality={100}
      sizes={sizes ?? bandSizes[band]}
      preload={preload}
      className={className}
    />
  )
}

const Figure = ({
  band,
  caption,
  plate,
  frame,
  className,
  children,
}: {
  band: Band
  caption?: string
  plate?: boolean
  /**
   * Frame the wrapper itself. For a single block, where the wrapper and the
   * media are the same box. A plate is always framed; a block that holds tiles
   * never is, because each tile brings its own.
   */
  frame?: boolean
  className?: string
  children: React.ReactNode
}) => (
  <figure
    className={cn('not-prose my-10 md:my-14', bandClass[band], className)}
  >
    <div
      className={
        cn(
          (plate || frame) && FRAME,
          plate ? 'bg-tertiary p-4 md:p-8' : frame && 'overflow-clip',
        ) || undefined
      }
    >
      {children}
    </div>

    {caption && (
      <figcaption className="mt-3 text-center text-xs text-secondary">
        {caption}
      </figcaption>
    )}
  </figure>
)

/**
 * The band every media block lands on: wider than the reading column, still
 * inset from the edges of the page.
 */
export type WideProps = MediaSource & { caption?: string; preload?: boolean }

export const Wide = ({ caption, preload, ...source }: WideProps) => {
  // On a plate the media keeps its own frame, inset by the plate's padding.
  // Everywhere else the wrapper carries it, so there is only ever one.
  const plate = isTall(source)

  return (
    <Figure band="wide" caption={caption} plate={plate} frame={!source.bare}>
      <Media source={source} band="wide" preload={preload} framed={plate} />
    </Figure>
  )
}

/** Two pieces of media side by side — a spread, two states, two formats. */
export type PairProps = {
  a: MediaSource & { label?: string }
  b: MediaSource & { label?: string }
  caption?: string
  band?: Band
}

export const Pair = ({ a, b, caption, band = 'wide' }: PairProps) => (
  <Figure band={band} caption={caption}>
    <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:gap-6">
      {[a, b].map((source, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Media source={source} band={band} sizes={tileSizes(2, 1)} />
          {source.label && (
            <span className="text-center font-serif text-xs italic text-secondary">
              {source.label}
            </span>
          )}
        </div>
      ))}
    </div>
  </Figure>
)

/** A grid of stills. Pass `aspect` to crop every tile to the same shape. */
export type GalleryProps = {
  items: (MediaSource & { label?: string })[]
  columns?: 2 | 3
  aspect?: string
  caption?: string
  band?: Band
}

export const Gallery = ({
  items,
  columns = 2,
  aspect,
  caption,
  band = 'wide',
}: GalleryProps) => {
  // The grid drops a column below `sm` rather than shrinking tiles past
  // reading size, so `sizes` has to account for the wider tile down there.
  const mobileColumns = columns === 3 ? 2 : 1
  const sizes = tileSizes(columns, mobileColumns)

  return (
    <Figure band={band} caption={caption}>
      <div
        className={cn(
          'grid gap-4 md:gap-6',
          columns === 3
            ? 'grid-cols-2 sm:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2',
        )}
      >
        {items.map((source) => (
          <div key={source.src} className="flex flex-col gap-2">
            {aspect ? (
              <div
                className={cn(
                  'relative w-full overflow-hidden',
                  !source.bare && FRAME,
                )}
                style={{ aspectRatio: aspect }}
              >
                {/* Cropping is the only thing this branch does differently, so
                    a clip still has to render as a clip — handing an .mp4 to
                    the image optimizer would just fail. */}
                {source.video ? (
                  <AutoplayVideo
                    src={source.src}
                    poster={source.poster}
                    aria-label={source.alt || undefined}
                    className="absolute inset-0 size-full object-cover"
                  />
                ) : (
                  <Image
                    src={source.src}
                    alt={source.alt ?? ''}
                    fill
                    quality={100}
                    sizes={sizes}
                    className="object-cover"
                  />
                )}
              </div>
            ) : (
              <Media source={source} band={band} sizes={sizes} />
            )}
            {source.label && (
              <span className="text-center text-xs  text-secondary">
                {source.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </Figure>
  )
}

/**
 * A row of blocks that each bring their own frame — the wrapper supplies only
 * the band, the columns and the gap.
 *
 * `Pair` and `Gallery` take their media as data and render the tiles
 * themselves, which fixes what a tile can be. This takes children instead, so a
 * cell is any media block, with its own props and its own caption:
 *
 *   <Grid>
 *     <Video src="…" width={1080} height={1080} bare />
 *     <Video src="…" width={1080} height={1080} bare />
 *   </Grid>
 *
 * Nesting works because the band rules are child combinators — `.bands > *` and
 * `.bands > .band-wide` in app/globals.css — so a nested block's own band class
 * matches nothing and it simply fills its cell. Its vertical margin is not
 * inert, which is what `[&>figure]:my-0` is for: inside the grid, spacing is
 * the gap's job.
 *
 * Clips are the intended cargo. A nested `Wide` still derives `sizes` from its
 * own band, so at two columns it asks for roughly twice the image it needs —
 * stills are better off in `Gallery` until that is plumbed through.
 */
export type GridProps = {
  columns?: 2 | 3
  band?: Band
  children: React.ReactNode
}

export const Grid = ({ columns = 2, band = 'wide', children }: GridProps) => (
  <div
    className={cn(
      'not-prose my-10 grid gap-4 md:my-14 md:gap-6 [&>figure]:my-0',
      bandClass[band],
      columns === 3
        ? 'grid-cols-2 sm:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2',
    )}
  >
    {children}
  </div>
)

/**
 * A crop pulled out of a larger piece — a single control, a lockup, a corner of
 * a poster. Sits on a plate so the crop reads as a zoom rather than a new page.
 */
export type DetailProps = MediaSource & { caption?: string; band?: Band }

export const Detail = ({ caption, band = 'prose', ...source }: DetailProps) => (
  <Figure band={band} caption={caption} plate>
    <Media source={source} band={band} />
  </Figure>
)

/** A clip. Same bands and framing as the still blocks. */
export type VideoProps = Omit<MediaSource, 'video'> & {
  caption?: string
  band?: Band
  /** Show controls instead of autoplaying — for anything worth scrubbing. */
  controls?: boolean
  /**
   * Hint the poster as the LCP image. On a page that opens on a clip the
   * poster is what paints first, and a `poster` attribute is discovered later
   * than a `<link rel=preload>` — this closes that gap. One per page, on the
   * first block, the same rule `Wide`'s `preload` follows.
   */
  preload?: boolean
}

export const Video = ({
  caption,
  band = 'wide',
  controls,
  preload,
  ...source
}: VideoProps) => {
  const plate = isTall(source)

  // A `poster` never goes through the image optimizer the way `Wide`'s `src`
  // does — the browser fetches this URL verbatim, which is what makes it worth
  // hinting: the hint and the request are the same URL, so they dedupe.
  if (preload && source.poster) {
    preloadImage(source.poster, { as: 'image', fetchPriority: 'high' })
  }

  return (
    <Figure band={band} caption={caption} plate={plate} frame={!source.bare}>
      <Media
        source={{ ...source, video: true }}
        band={band}
        controls={controls}
        framed={plate}
      />
    </Figure>
  )
}
