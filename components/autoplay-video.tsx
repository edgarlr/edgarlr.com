'use client'

import { useEffect, useRef, useState } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/**
 * How far outside the viewport a clip starts buffering. Far enough that a
 * normal scroll finds it ready, close enough that a visitor who never reaches
 * the bottom of a case study never pays for the clips down there.
 */
const BUFFER_MARGIN = '400px'

/**
 * A looping clip that behaves like an animated still — but only for people who
 * haven't asked for less motion.
 *
 * There is deliberately no `autoPlay` attribute. `autoPlay` is honoured by the
 * browser the moment it parses the tag, long before any JS could opt out of it,
 * so a reduced-motion visitor would see the clip start and then stop. Playback
 * is started here instead, which means the server HTML is a still frame and
 * motion only ever begins for people who want it.
 *
 * That still frame is the `poster`, and without one the markup is an empty box
 * until playback begins — so a clip should always be given one.
 *
 * Reduced motion gets `controls` rather than nothing: the clip is the content,
 * so it stays watchable on purpose, it just never moves on its own. That is the
 * same bargain the PlanetScale homepage itself makes.
 *
 * Bytes and playback are gated separately, by two observers:
 *
 *   - `preload="none"` means the markup costs nothing but its poster. A clip
 *     within `BUFFER_MARGIN` of the viewport is switched to `preload="auto"`,
 *     so it buffers just before it is needed rather than on page load. Without
 *     this the browser decides how much of every clip to pull, and a case study
 *     carrying six of them can spend megabytes before anything is on screen.
 *   - Playback still waits for the clip to actually be visible, so a page
 *     carrying ten clips isn't decoding all ten at once.
 *
 * Neither observer fires under reduced motion: nothing plays, so nothing needs
 * to be fetched until the visitor asks for it with the controls.
 */
type Props = Omit<
  React.ComponentProps<'video'>,
  'autoPlay' | 'loop' | 'muted' | 'playsInline' | 'controls' | 'ref'
>

export const AutoplayVideo = ({ preload = 'none', ...props }: Props) => {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const query = window.matchMedia(REDUCED_MOTION)
    let inView = false

    const sync = () => {
      if (query.matches || !inView) {
        video.pause()
      } else {
        // Autoplay can still be refused (a data saver, an OS-level setting).
        // Nothing to recover from — the poster frame stays up.
        video.play().catch(() => {})
      }
    }

    const onPreferenceChange = () => {
      setReduced(query.matches)
      sync()
    }

    // Raising `preload` is enough to start the fetch. Calling `load()` here
    // would be the more explicit way to say it, but it also resets playback,
    // and on a deep link both observers can fire in the same tick.
    const buffer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || query.matches) return
        video.preload = 'auto'
        buffer.disconnect()
      },
      { rootMargin: BUFFER_MARGIN },
    )

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false
        sync()
      },
      { threshold: 0 },
    )

    buffer.observe(video)
    observer.observe(video)
    onPreferenceChange()
    query.addEventListener('change', onPreferenceChange)

    return () => {
      buffer.disconnect()
      observer.disconnect()
      query.removeEventListener('change', onPreferenceChange)
    }
  }, [])

  return (
    // `controls` starts false so the server markup and the first client render
    // agree; the effect turns it on for reduced motion right after.
    <video
      {...props}
      preload={preload}
      ref={ref}
      loop
      muted
      playsInline
      controls={reduced}
    />
  )
}
