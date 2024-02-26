"use client"

import { useLayoutEffect } from 'react'

const themes = {
  dark: [
    '#ff9696',
    '#afbaef',
    '#e9afef',
    '#d3b8ff',
    '#afdfef',
    '#afefcb',
    '#edefaf',
  ],
  light: [
    '#ffb1bc',
    '#c6b1ff',
    '#d798d4',
    '#b1c4ff',
    '#98d7c0',
    '#000000',
    '#99d788',
  ],
} as const


export const RandomSelectColor = () => {
  useLayoutEffect(() => {
    const theme = document?.documentElement.dataset?.theme

    if (!theme || !Object.keys(themes).includes(theme)) return

    const colors = themes[theme as 'light']

    const color = colors.at(Math.floor(Math.random() * colors.length))

    if (!color) return

    document.documentElement.style.setProperty('--highlight', color)
  }, [])

  return null
}
