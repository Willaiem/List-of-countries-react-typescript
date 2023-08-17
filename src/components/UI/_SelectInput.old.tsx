import Select from 'react-tailwindcss-select'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { SelectValue } from 'react-tailwindcss-select/dist/components/type'

type Option = {
	value: string
	label: string
}

const options: Option[] = [
	{ value: 'all', label: 'All regions' },
	{ value: 'europe', label: 'Europe' },
	{ value: 'americas', label: 'Americas' },
	{ value: 'asia', label: 'Asia' },
	{ value: 'antarctic', label: 'Antarctic' },
	{ value: 'oceania', label: 'Oceania' },
	{ value: 'africa', label: 'Africa' },
]

interface SelectInputInteface {
	setSearchValue: (value: string) => void
}

export default function SelectInput({ setSearchValue }: SelectInputInteface) {
	let [searchParam, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
	const navigate = useNavigate()
	const regionValue = options.find(option => option.value === searchParam.get('region'))

	const handleChange = (value: SelectValue) => {
		if (value !== null) {
			console.log(value.value)
			const params = value.value
			params === 'all' ? navigate('/') : setSearchParams(`?region=${params.toLowerCase()}`)
			setSearchValue('')
		}
	}

	return (
		<div className='flex-col flex self-end'>
			<p className='text-xs text-gray-900 dark:text-gray-100 pb-1'>Filter by region</p>
			<Select
				options={options}
				onChange={handleChange}
				value={regionValue}
				classNames={{
					menuButton: () =>
						`flex rounded-md shadow-md bg-gray-100 dark:bg-slate-800 text-gray-900  dark:text-gray-100 transition-all duration-300 focus:outline-none`,
					menu: 'absolute z-10 w-full bg-gray-100 dark:bg-slate-800 shadow-md rounded-md py-1 mt-1.5 text-sm',
					listItem: isSelected =>
						`block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded bg-gray-100 dark:bg-slate-800 text-gray-900  dark:text-gray-100 ${
							isSelected
								? `text-gray-900  dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100`
								: `bg-gray-100 dark:bg-slate-800 text-gray-900  dark:text-gray-100 `
						}`,
				}}
			/>
		</div>
	)
}
