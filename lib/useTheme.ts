import { useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const useTheme = () => {
  const { storedValue, setLocalStorage } = useLocalStorage('theme', 'auto')
  const [theme, setTheme] = useState(storedValue)

  useEffect(() => {
    setLocalStorage(JSON.stringify(theme))
    document.documentElement.dataset.theme = theme
  }, [theme])

  return { theme, setTheme }
}
