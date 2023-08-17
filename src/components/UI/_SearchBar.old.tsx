// import { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Form, useNavigate, useSearchParams } from 'react-router-dom'

export interface SearchBarInterface {
  handleSelectChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchValue: any
}

export default function Searchbar({ handleSelectChangeValue, searchValue }: SearchBarInterface) {
  let [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()

  const navigate = useNavigate()

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.includes('  ')) {
      event.target.value.replaceAll('  ', '')
      return
    }
    handleSelectChangeValue(event)
    const orReplace = searchParams.get('search') !== null

    if (event.target.value === ' ') return

    setSearchParams((params: URLSearchParams) => {
      if (event.target.value === '') {
        params.delete('search')
      } else {
        params.set('search', event.target.value)
      }
    })

    navigate({ search: '?' + searchParams.toString() }, { replace: orReplace })
  }

  return (
    <div className=' relative mb-5 sm:mb-0 sm:self-end w-[320px]'>
      <Form role='search'>
        <input
          type='search'
          name='search'
          value={searchValue}
          placeholder='Search...'
          className='input input-bordered h-[40px] pl-9 pt-1 pb-1 bg-gray-100 dark:bg-slate-800 text-gray-900  dark:text-gray-100 focus:outline-none border-none shadow-md rounded-md w-full'
          onChange={event => handleSearch(event)}
        />
      </Form>

      <BiSearchAlt2 className='absolute left-3 bottom-3 text-gray-900  dark:text-gray-100' />
    </div>
  )
}
