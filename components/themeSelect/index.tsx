import s from './ThemeSelect.module.css'
import { useTheme } from '@lib/useTheme'
import ChevronDown from '@components/icons/ChevronDown'

const ThemeSelect = () => {
  const { theme, setTheme } = useTheme()
  return (
    <label className={s.root}>
      <select
        className={s.select}
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        id="themeSelect"
        aria-label="Change theme color"
      >
        <option value="auto">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <span className={s.icon}>
        <ChevronDown width="14" height="14" />
      </span>
    </label>
  )
}

export default ThemeSelect
