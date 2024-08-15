import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { setDark, setLight } from '@/app/store/slices/themeSlice'
import { Moon, Sun } from 'lucide-react'

export default function ThemeButton() {
  const theme = useAppSelector((state) => state.theme.value)
  const dispatch = useAppDispatch()
  function onChangeTheme() {
    if (theme === 'dark') {
      dispatch(setLight())
    } else {
      dispatch(setDark())
    }
  }
  return (
    <button
      className="absolute top-2 right-2 sm:top-5 sm:right-5 p-2 rounded-full hover:bg-muted transition-colors"
      aria-label={
        theme === 'dark' ? 'Change to light theme' : 'Change to dark theme'
      }
      onClick={() => onChangeTheme()}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
    </button>
  )
}
