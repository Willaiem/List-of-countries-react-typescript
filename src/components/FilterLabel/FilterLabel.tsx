import { Searchbar } from '../UI/SearchBar'
import { SelectInput } from '../UI/SelectInput'

export function FilterLabel() {
  return (
    <div className='container mx-auto max-w-[320px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] sm:flex-row sm:pl-6 sm:pr-6 mt-20 flex flex-col items-center justify-between'>
      <Searchbar />
      <SelectInput />
    </div>
  )
}
