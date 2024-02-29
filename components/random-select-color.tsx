"use client"

import { useLayoutEffect } from 'react'


export const RandomSelectColor = () => {
  useLayoutEffect(() => {
    const theme = document?.documentElement.dataset?.theme

    if (!theme) return

    const randomIndex = Math.floor(Math.random() * 7) + 1

    document.documentElement.style.setProperty('--highlight', `var(--highlight-color-${randomIndex})`)
  }, [])
  return null
}
