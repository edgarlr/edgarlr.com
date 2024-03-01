import { useCallback, useRef, useState } from 'react'

export function useIntersectionObserver<T>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  initialValue = false,
} = {}) {
  const [inView, setInView] = useState<boolean>(initialValue)

  const previousObserver = useRef<IntersectionObserver | null>(null)

  const customRef = useCallback(
    (node: T) => {
      if (previousObserver.current) {
        previousObserver.current.disconnect()
        previousObserver.current = null
      }

      if ((node as HTMLElement)?.nodeType === Node.ELEMENT_NODE) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setInView(entry?.isIntersecting ?? false)
          },
          { threshold, root, rootMargin },
        )

        observer.observe(node as HTMLElement)
        previousObserver.current = observer
      }
    },
    [threshold, root, rootMargin],
  )

  return { ref: customRef, inView }
}
