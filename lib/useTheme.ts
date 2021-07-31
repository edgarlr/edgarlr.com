import { useState } from 'react'
import { useIsomorphicLayoutEffect } from './hooks/use-isomorphic-layout-effect'
import { useLocalStorage } from './useLocalStorage'

export const useTheme = () => {
  const { storedValue, setLocalStorage } = useLocalStorage('theme', 'auto')

  const [theme, setTheme] = useState(storedValue)

  useIsomorphicLayoutEffect(() => {
    setLocalStorage(JSON.stringify(theme))
    document.documentElement.dataset.theme = theme
  }, [theme])

  return { theme, setTheme }
}
