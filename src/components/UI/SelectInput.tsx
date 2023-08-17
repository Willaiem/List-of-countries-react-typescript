import { useSearchParams } from 'react-router-dom'
import Select from 'react-tailwindcss-select'
import { SelectValue } from 'react-tailwindcss-select/dist/components/type'
import { getRegionParams } from '../../lib/getRegionParam'

const options = {
  all: 'All regions',
  europe: 'Europe',
  americas: 'Americas',
  asia: 'Asia',
  antarctic: 'Antarctic',
  oceania: 'Oceania',
  africa: 'Africa',
}

const arrOptions = Object.entries(options).map(([value, label]) => ({ value, label }))

const useSelectProps = () => {
  const [searchParam, setSearchParams] = useSearchParams()

  const value = getRegionParams(searchParam)

  const option = {
    label: options[value],
    value,
  }

  const handleChange = (selectedOption: SelectValue) => {
    if (!(!Array.isArray(selectedOption) && selectedOption !== null)) {
      return;
    }

    const selectedRegion = selectedOption.value

    setSearchParams(selectedRegion === 'all' ? {} : { region: selectedRegion })
  }

  return {
    onChange: handleChange,
    value: option,
    options: arrOptions,
    primaryColor: '',
  } satisfies React.ComponentProps<typeof Select>
}

export function SelectInput() {
  return (
    <div className='flex-col flex self-end'>
      <p className='text-xs text-gray-900 dark:text-gray-100 pb-1'>Filter by region</p>
      <Select
        {...useSelectProps()}
        classNames={{
          menuButton: () =>
            `flex rounded-md shadow-md bg-gray-100 dark:bg-slate-800 text-gray-900  dark:text-gray-100 transition-all duration-300 focus:outline-none`,
          menu: 'absolute z-10 w-full bg-gray-100 dark:bg-slate-800 shadow-md rounded-md py-1 mt-1.5 text-sm',
          listItem: isSelected =>
            `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded bg-gray-100 dark:bg-slate-800 text-gray-900  dark:text-gray-100 ${isSelected
              ? `text-gray-900  dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100`
              : `bg-gray-100 dark:bg-slate-800 text-gray-900  dark:text-gray-100 `
            }`,
        }}
      />
    </div>
  )
}
