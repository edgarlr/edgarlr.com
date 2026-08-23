import Image from 'next/image'
import cn from 'clsx'

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

const bandSizes: Record<Band, string> = {
  prose: '(min-width: 44rem) 40rem, 100vw',
  wide: '(min-width: 64rem) 64rem, 100vw',
}

/**
 * Portrait media — a poster, packaging, a phone screen — would tower over the
 * page at the full width of its band, so it gets capped by height instead.
 * Square is the cutoff: anything landscape keeps the band's width, which is
 * what makes every block on a case study line up.
 */
const isTall = ({ width, height }: MediaSource) => height / width > 1

const frameClass = (source: MediaSource, capped: boolean) =>
  cn(
    'block h-auto',
    capped ? 'mx-auto max-h-[78svh] w-auto max-w-full' : 'w-full',
    !source.bare && 'rounded-md border-[0.5px] border-tertiary',
  )

const Media = ({
  source,
  band,
  sizes,
  preload,
  controls,
}: {
  source: MediaSource
  band: Band
  sizes?: string
  preload?: boolean
  controls?: boolean
}) => {
  const className = frameClass(source, isTall(source))

  if (source.video) {
    return (
      <video
        src={source.src}
        poster={source.poster}
        width={source.width}
        height={source.height}
        className={className}
        // Short UI clips read as animated stills, so they behave like the ones
        // already in posts/. Pass `controls` for anything long enough to need
        // scrubbing, which also stops it autoplaying.
        {...(controls
          ? { controls: true, preload: 'metadata' as const }
          : { autoPlay: true, loop: true, muted: true, playsInline: true })}
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
  className,
  children,
}: {
  band: Band
  caption?: string
  plate?: boolean
  className?: string
  children: React.ReactNode
}) => (
  <figure
    className={cn('not-prose my-10 md:my-14', bandClass[band], className)}
  >
    <div
      className={cn(
        plate &&
          'rounded-md border-[0.5px] border-tertiary bg-tertiary p-4 md:p-8',
      )}
    >
      {children}
    </div>

    {caption && (
      <figcaption className="mt-2 text-center font-serif text-xs italic text-secondary">
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

export const Wide = ({ caption, preload, ...source }: WideProps) => (
  <Figure band="wide" caption={caption} plate={isTall(source)}>
    <Media source={source} band="wide" preload={preload} />
  </Figure>
)

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
          <Media
            source={source}
            band={band}
            sizes="(min-width: 64rem) 32rem, (min-width: 40rem) 50vw, 100vw"
          />
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
}: GalleryProps) => (
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
                !source.bare && 'rounded-md border-[0.5px] border-tertiary',
              )}
              style={{ aspectRatio: aspect }}
            >
              <Image
                src={source.src}
                alt={source.alt ?? ''}
                fill
                quality={100}
                sizes={`(min-width: 64rem) ${Math.round(64 / columns)}rem, ${Math.round(100 / columns)}vw`}
                className="object-cover"
              />
            </div>
          ) : (
            <Media
              source={source}
              band={band}
              sizes={`(min-width: 64rem) ${Math.round(64 / columns)}rem, ${Math.round(100 / columns)}vw`}
            />
          )}
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
}

export const Video = ({
  caption,
  band = 'wide',
  controls,
  ...source
}: VideoProps) => (
  <Figure band={band} caption={caption} plate={isTall(source)}>
    <Media
      source={{ ...source, video: true }}
      band={band}
      controls={controls}
    />
  </Figure>
)
