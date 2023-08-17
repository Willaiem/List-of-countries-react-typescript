import axios from 'axios'
import { useLoaderData, useNavigation } from 'react-router-dom'
// import LoadingIcon from '../src/components/UI/LoadingIcon'
import { useEffect, useState } from 'react'
import Country from '../components/Country/Country'
import LoadingIcon from '../components/UI/LoadingIcon'
import { CountryBoardType } from '../Types/Types'
type RequestType = {
	request: {
		url: string
	}
}
export async function loader({ request }: RequestType) {
	const url = new URL(request.url)
	const params = url.pathname.split('/')[2].replaceAll('-', ' ')
	const { data } = await axios.get(
		`https://restcountries.com/v3.1/name/${params}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
	)

	return { data }
}

export default function CountryBoard() {
	const { data } = useLoaderData() as CountryBoardType
	const country = data[0]
	const navigation = useNavigation()
	const [loadingStatus, setLoadingStatus] = useState(true)
	let loading = navigation.state === 'loading' ? true : false

	useEffect(() => {
		setLoadingStatus(loading)
	}, [loading])

	return <Country country={country} />
}
