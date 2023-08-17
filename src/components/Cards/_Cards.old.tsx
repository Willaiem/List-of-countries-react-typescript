import Card from '../Card/Card'
import { CountriesType } from '../../Types/Types'

interface CardsInterface {
	data: CountriesType[]
}

const Cards = ({ data }: CardsInterface) => {
	return (
		<div className='container mx-auto grid grid-cols-1 gap-8 mt-5 pl-6 pr-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'>
			{data.length ? (
				data.map(country => <Card key={country.name.common} country={country} />)
			) : (
				<div className='flex justify-center col-span-full'>
					<p className='text-2xl mt-10 text-center'>There is no such country 😔</p>
				</div>
			)}
		</div>
	)
}

export default Cards
