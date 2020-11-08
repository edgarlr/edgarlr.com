import { useState } from 'react'

export const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key)
        return item !== null ? JSON.parse(item) : initialValue
      } catch (e) {
        return initialValue
      }
    }
    return initialValue
  })

  const setLocalStorage = (value: string) => {
    try {
      window.localStorage.setItem(key, value)
      setStoredValue(value)
    } catch (e) {
      return
    }
  }

  return { storedValue, setLocalStorage }
}
