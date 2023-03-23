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
    '#9bd798',
    '#c1d798',
  ],
} as const

const validThemes = Object.keys(themes)

export const getSelectColor = (theme?: string) => {
  if (!theme || !validThemes.includes(theme)) return
  const colors = themes[theme as 'light']
  return colors[Math.floor(Math.random() * colors.length)]
}
