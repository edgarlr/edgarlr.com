import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useIsomorphicLayoutEffect } from '@lib/hooks/use-isomorphic-layout-effect'

export const useTheme = () => {
  const { storedValue, setLocalStorage } = useLocalStorage('theme', 'auto')

  const [theme, setTheme] = useState(storedValue)

  useIsomorphicLayoutEffect(() => {
    setLocalStorage(JSON.stringify(theme))
    document.documentElement.dataset.theme = theme
  }, [theme])

  return { theme, setTheme }
}
