import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Cards } from '../components/Cards/Cards'
import { FilterLabel } from '../components/FilterLabel/FilterLabel'
import LoadingIcon from '../components/UI/LoadingIcon'
import { getRegionParams } from '../lib/getRegionParam'
import { countriesSchema } from '../schemas/countries'

const getCountries = async (paramRegion: ReturnType<typeof getRegionParams>) => {
  const region = paramRegion === 'all' ? 'all' : `region/${paramRegion}`
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/${region}?fields=name,population,region,capital,flags`
  )

  const result = await countriesSchema.safeParseAsync(data)

  if (!result.success) {
    console.error('Zod error:', result.error)
    throw new Error('Cannot fetch the countries. Please try again later.')
  }


  return result.data
}

export default function CountriesBoard() {
  const [searchParams] = useSearchParams()
  const region = getRegionParams(searchParams)
  const { data: countries, mutate } = useMutation(['countries'], () => getCountries(region))

  useEffect(() => {
    mutate()
  }, [mutate, region])

  return (
    <div>
      <FilterLabel />
      {countries ? <Cards countries={countries} /> : <LoadingIcon />}
    </div>
  )
}
