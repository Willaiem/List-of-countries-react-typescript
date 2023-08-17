import { Link } from 'react-router-dom'
import { Countries } from '../../schemas/countries'

type Country = Countries[number]

export default function Card({ countryParam, flags, name, region, population, capital }: Country) {
  return (
    <div className=' bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-md overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform mx-auto h-80 border-b-4 border-gray-300 dark:border-gray-700'>
      <Link to={`countries/${countryParam}`}>
        <div className='h-1/2 max-w-xs overflow-hidden flex items-center justify-center'>
          <img src={flags.png} alt={flags.alt} className='min-w-full min-h-full ' />
        </div>
        <div className=' h-1/2 m-5'>
          <h2 className='font-bold mb-2 text-md'>{name.common}</h2>
          <div className='text-sm '>
            <p className='mb-1'>
              <span className='font-bold'>Region: </span>
              {region}
            </p>
            <p className='mb-1'>
              <span className='font-bold'>Population: </span>
              {population}
            </p>
            <p className=''>
              <span className='font-bold '>Capital: </span>
              {capital.length >= 1 ? capital.join(', ') : 'Does not have'}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
