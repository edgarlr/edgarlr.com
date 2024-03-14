"use client"

import { useIntersectionObserver } from '@lib/hooks/use-intersection-observe'
import { SocialLinks } from './social-links'

export const PostsFooter = () => {
  const { ref, inView } = useIntersectionObserver({
    threshold: 0,
    initialValue: false,
    once: true
  })

  return (
    <footer data-animate={`${inView}`} className="group flex justify-center relative py-10">
      <div
        style={{ transitionDuration: '2.5s' }}
        className='absolute top-1/2 delay-1000 pointer-events-none  -translate-y-1/2  group-data-[animate=true]:opacity-0  group-data-[animate=true]:scale-95 group-data-[animate=true]:blur-sm transition-all'
      >
        {inView && (
          <span className='animate-in fade-in duration-700 text-center font-serif text-secondary'>
            The End.
          </span>
        )}
      </div>

      <div
        style={{ transitionDuration: '2.5s', transitionDelay: '1200ms' }}
        className='opacity-0  blur-sm scale-[0.98] group-data-[animate=true]:opacity-100 group-data-[animate=true]:scale-100 group-data-[animate=true]:blur-0 transition-all'
      >
        <SocialLinks />
      </div>

      <div ref={ref} className='absolute bottom-0 w-full h-px bg-transparent' />
    </footer>
  )
}
