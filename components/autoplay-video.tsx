'use client'

import { useEffect, useRef, useState } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

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
 * Reduced motion gets `controls` rather than nothing: the clip is the content,
 * so it stays watchable on purpose, it just never moves on its own. That is the
 * same bargain the PlanetScale homepage itself makes.
 *
 * Playback is also gated on visibility, so a page carrying ten clips isn't
 * decoding all ten at once.
 */
type Props = Omit<
  React.ComponentProps<'video'>,
  'autoPlay' | 'loop' | 'muted' | 'playsInline' | 'controls' | 'ref'
>

export const AutoplayVideo = (props: Props) => {
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false
        sync()
      },
      { threshold: 0 },
    )

    observer.observe(video)
    onPreferenceChange()
    query.addEventListener('change', onPreferenceChange)

    return () => {
      observer.disconnect()
      query.removeEventListener('change', onPreferenceChange)
    }
  }, [])

  return (
    // `controls` starts false so the server markup and the first client render
    // agree; the effect turns it on for reduced motion right after.
    <video
      {...props}
      ref={ref}
      loop
      muted
      playsInline
      controls={reduced}
    />
  )
}
