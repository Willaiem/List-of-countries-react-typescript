import { useEffect } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import useLocalStorage from "../../Hooks/useLocalStorage";


const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    const html = document.documentElement
    if (theme === 'light') {
      html.classList.remove('dark')
      return
    }

    html.classList.toggle('dark')
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return { theme, toggleTheme }
}

export function Header() {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className='shadow-md bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-gray-100 z-50 sticky top-0 w-full'>
      <div className='container flex justify-between items-center pt-3 pb-3 pl-6 pr-6 font-bold mx-auto '>
        <h1>Where in the world?</h1>

        <button className='pt-2 pb-2 flex items-center' onClick={toggleTheme}>
          {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
        </button>
      </div>
    </header>
  )
}
