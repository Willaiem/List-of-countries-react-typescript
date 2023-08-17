import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Countries } from '../../schemas/countries'
import Card from '../Card/Card'

export const Cards = ({ countries }: { countries: Countries }) => {
  const [searchParams] = useSearchParams()
  const paramSearch = searchParams.get('search') ?? ''

  const [filteredCountries, setFilteredCountries] = useState(countries)

  useEffect(() => {
    if (paramSearch.length > 0) {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(paramSearch.toLowerCase())
      )

      setFilteredCountries(filteredCountries)
      return
    }

    setFilteredCountries(countries)
  }, [countries, paramSearch])

  return (
    <div className='container mx-auto grid grid-cols-1 gap-8 mt-5 pl-6 pr-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'>
      {filteredCountries.length > 0 ? (
        filteredCountries.map(country => <Card key={country.name.common} {...country} />)
      ) : (
        <div className='flex justify-center col-span-full'>
          <p className='text-2xl mt-10 text-center'>There is no such country 😔</p>
        </div>
      )}
    </div>
  )
}
