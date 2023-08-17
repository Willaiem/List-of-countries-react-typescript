import { useState } from 'react'
import { BiSearchAlt2 as SearchGlassIcon } from 'react-icons/bi'
import { Form, useSearchParams } from 'react-router-dom'
import { clsx } from '../../lib/clsx'


const useSearchbar = () => {
  const [, setSearchParams] = useSearchParams()
  const [searchedCountry, setSearchedCountry] = useState('')

  const [isInputFocused, setIsInputFocused] = useState(false)

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const country = event.target.value

    const isEmpty = country.trim().length === 0

    if (isEmpty && searchedCountry.length === 0) {
      return
    }

    setSearchParams((params) => {
      params.set('search', country)

      if (isEmpty) {
        params.delete('search')
      }

      return params
    })

    setSearchedCountry(country)
  }

  return {
    inputProps: {
      value: searchedCountry,
      onChange: handleSearch,
      onFocus: () => setIsInputFocused(true),
      onBlur: () => setIsInputFocused(false),
    } satisfies React.InputHTMLAttributes<HTMLInputElement>,
    labelProps: {
      className: clsx('text-gray-500 dark:text-gray-100', isInputFocused && 'opacity-0'),
    } satisfies React.LabelHTMLAttributes<HTMLLabelElement>,
  }
}

export function Searchbar() {
  const { inputProps, labelProps } = useSearchbar()

  return (
    <div className='relative flex mb-5 sm:mb-0 sm:self-end w-[320px]'>
      <Form role='search'>
        <div className="absolute top-2 flex justify-center items-center gap-2 pointer-events-none">
          <SearchGlassIcon className='ml-2 text-gray-900 dark:text-gray-100' />
          <label htmlFor="search" {...labelProps}>Search...</label>
        </div>
        <input
          type='search'
          name='search'
          className='input input-bordered h-[40px] pl-9 pt-1 pb-1 bg-gray-100 dark:bg-slate-800 focus:outline-none border-none shadow-md rounded-md w-full'
          {...inputProps}
        />
      </Form>

    </div>
  )
}
