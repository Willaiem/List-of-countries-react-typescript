import axios from 'axios'
import { LoaderFunctionArgs, useNavigation } from 'react-router-dom'
import { Country } from '../components/Country/Country'
import LoadingIcon from '../components/UI/LoadingIcon'
import { useLoader } from '../lib/useLoader'
import { borderSchema, countrySchema } from '../schemas/countries'

const getCountryParam = (request: Request) => {
  const country = new URL(request.url).pathname.split('/').at(-1) ?? ''
  return country.replaceAll('-', ' ')
}

export async function loader({ request }: LoaderFunctionArgs) {
  const paramCountry = getCountryParam(request)

  try {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/name/${paramCountry}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
    )

    const [country] = await countrySchema.parseAsync(data)

    const preValidatedBorders = await Promise.all(
      country.borders.map(async (countryCode) => {
        const { data } = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=name`);
        const borderName = data.name.common
        return { borderName, countryCode }
      })
    )

    const borders = await borderSchema.parseAsync(preValidatedBorders)

    return { ...country, borders }
  } catch (err) {
    console.error('Loader error: ', err)
    throw new Error('Cannot fetch the country. Please try again later.')
  }
}

export default function CountryBoard() {
  const country = useLoader<typeof loader>()

  const navigation = useNavigation()

  const isLoading = navigation.state === 'loading'

  return isLoading ? <LoadingIcon /> : <Country {...country} />
}
