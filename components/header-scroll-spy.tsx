"use client"

import { useEffect } from 'react'

import { useIntersectionObserver } from '@lib/hooks/use-intersection-observe'

export const HeaderScrollSpy = ({ className }: { className?: string }) => {
  const { ref, inView } = useIntersectionObserver({
    rootMargin: '-16px 0px 0px 0px'
  })

  useEffect(() => {
    document.querySelector('[data-header]')?.setAttribute("data-visible", `${!inView}`)
  }, [inView])

  return (
    <div ref={ref} className={className} />
  )
}
