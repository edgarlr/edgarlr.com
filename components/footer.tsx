"use client"

import { useState } from 'react'
import { useIntersectionObserver } from '@lib/hooks/use-intersection-observe'


const ENDINGS = ['Fin.', 'The End.', 'Fine.', 'Ende.', 'Fim.', '終わり', '剧终']

export const PostsFooter = () => {
  const { ref, inView } = useIntersectionObserver({
    threshold: 0,
    initialValue: false,
    once: true
  })

  // Pick a random ending once, lazily (runs during the first render only).
  // Hydration-safe because the text is gated behind `inView`, which is false
  // during hydration — so the server/client value difference is never in the DOM.
  const [ending] = useState(() => ENDINGS[Math.floor(Math.random() * ENDINGS.length)])

  return (
    <footer data-animate={`${inView}`} className="group flex justify-center relative py-8">
      <div
        style={{ transitionDuration: '1s' }}
        className='absolute top-1/2 delay-[2000ms] ease-out pointer-events-none  -translate-y-1/2  group-data-[animate=true]:opacity-0  group-data-[animate=true]:scale-95 group-data-[animate=true]:blur-xs transition-all'
      >
        {inView && (
          <span className='animate-in fade-in duration-700 text-center italic font-serif text-secondary'>
            {ending}
          </span>
        )}
      </div>

      <div ref={ref} className='absolute bottom-0 w-full h-px bg-transparent' />
    </footer>
  )
}
