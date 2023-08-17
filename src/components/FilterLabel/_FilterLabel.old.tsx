import { useState } from 'react'
import Searchbar from '../UI/SearchBar'
import SelectInput from '../UI/SelectInput'

import { useSearchParams } from 'react-router-dom'

export default function FilterLabel() {
  let [searchParams] = useSearchParams()
  const getSearchValue = searchParams.get('search') === null ? '' : searchParams.get('search')
  const [searchValue, setSearchValue] = useState(getSearchValue)

  const handleSelectChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart()
    setSearchValue(value)
  }

  return (
    <div className=' container mx-auto  max-w-[320px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] sm:flex-row sm:pl-6 sm:pr-6 mt-20 flex flex-col items-center justify-between '>
      <Searchbar searchValue={searchValue} handleSelectChangeValue={handleSelectChangeValue} />
      <SelectInput setSearchValue={setSearchValue} />
    </div>
  )
}
