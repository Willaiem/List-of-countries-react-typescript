import { useEffect, useState } from 'react'
import axios from 'axios'
import FilterLabel from '../components/FilterLabel/FilterLabel'
import Cards from '../components/Cards/Cards'
import LoadingIcon from '../components/UI/LoadingIcon'
import { CountariesBoardType } from '../Types/Types'
import { useLoaderData, useNavigation, useSearchParams } from 'react-router-dom'

type RequestType = {
	request: {
		url: string
	}
}

export async function loader({ request }: RequestType) {
	const url = new URL(request.url)
	const paramsRegion = url.searchParams.get('region')
	const region = paramsRegion ? `region/${paramsRegion}` : 'all'
	const response = await axios.get(
		`https://restcountries.com/v3.1/${region}?fields=name,population,region,capital,flags`
	)
	const { data } = response
	return { data }
}

export default function CountriesBoard() {
	const { data } = useLoaderData() as CountariesBoardType
	const navigation = useNavigation()
	const [loadingStatus, setLoadingStatus] = useState<boolean>(true)
	const loading = navigation.state === 'loading' ? true : false
	const [searchParams] = useSearchParams()
	let countaries

	if (searchParams.get('search') === null) {
		countaries = data
	} else {
		const searchParam = searchParams.get('search')!.toLowerCase()
		countaries = data.filter(country => country.name.common.toLowerCase().includes(searchParam))
	}

	useEffect(() => {
		setLoadingStatus(loading)
	}, [loading])

	return (
		<div>
			<FilterLabel />
			{loadingStatus ? <LoadingIcon /> : <Cards data={countaries} />}
		</div>
	)
}
