"use client"

import { useLayoutEffect } from 'react'

import { getSelectColor } from '@lib/select-colors'

export const RandomSelectColor = () => {
  useLayoutEffect(() => {
    const theme = document?.documentElement.dataset?.theme
    const color = getSelectColor(theme)
    if (!color) return
    document.documentElement.style.setProperty('--highlight', color)
  }, [])

  return null
}
