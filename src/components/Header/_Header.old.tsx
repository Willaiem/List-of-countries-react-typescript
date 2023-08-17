import ThemeButton from '../UI/ThemeButton'

type ThemeTypes = {
	theme: 'dark' | 'light'
	setTheme: (value: string) => void
}

export default function Header({ theme, setTheme }: ThemeTypes) {
	return (
		<header className='shadow-md bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-gray-100 z-50 sticky top-0 w-full'>
			<div className='container flex justify-between items-center pt-3 pb-3 pl-6 pr-6 font-bold mx-auto '>
				<h1>Where in the world?</h1>

				<ThemeButton theme={theme} setTheme={setTheme} />
			</div>
		</header>
	)
}
