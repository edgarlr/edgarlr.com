import s from './ThemeSelect.module.css'
import { useTheme } from '@lib/useTheme'

const ThemeSelect = () => {
  const { theme, setTheme } = useTheme()
  return (
    <select
      className={s.root}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="auto">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  )
}

export default ThemeSelect
