'use client'

import { useLayoutEffect } from 'react'

export const RandomSelectColor = () => {
  useLayoutEffect(() => {
    const theme = document?.documentElement.dataset?.theme

    if (!theme) return

    const randomIndex = Math.floor(Math.random() * 6) + 1

    document.documentElement.style.setProperty(
      '--background-selection',
      `var(--background-selection-${randomIndex})`,
    )
  }, [])
  return null
}
