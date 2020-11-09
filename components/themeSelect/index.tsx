import s from './ThemeSelect.module.css'
import { useTheme } from '@lib/useTheme'
import { ChevronDown } from '@components/icons'

const ThemeSelect = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className={s.root}>
      <select
        className={s.select}
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        id="themeSelect"
      >
        <option value="auto">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <span className={s.icon}>
        <ChevronDown size={14} />
      </span>
    </div>
  )
}

export default ThemeSelect
