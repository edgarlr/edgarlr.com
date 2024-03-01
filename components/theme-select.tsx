'use client'

import { useTheme } from 'next-themes'
import ChevronDown from '@components/icons/ChevronDown'

export const ThemeSelect = () => {
  const { theme, setTheme } = useTheme()
  return (
    <label className="relative rounded-md text-secondary border-[0.5px] border-tertiary transition-colors hover:text-primary hover:bg-secondary">
      <select
        className="bg-transparent border-none w-24 appearance-none relative py-1 px-2 text-sm cursor-default"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        id="themeSelect"
        aria-label="Change theme color"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <span className="absolute flex justify-center items-center pointer-events-none right-2 top-0 bottom-0">
        <ChevronDown width="14" height="14" />
      </span>
    </label>
  )
}
