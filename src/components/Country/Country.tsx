import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { CountryDetails } from '../../schemas/countries';


export function Country({ borders, flags, name, population, region, subregion, capital, tld, currencies, languages }: CountryDetails) {
  const navigate = useNavigate()

  return (
    <div className='mx-5 sm:mx-10 lg:mt-12'>
      <div className='container mx-auto mt-2'>
        <button
          className='flex items-center py-2 px-4 mb-5 bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-gray-100 rounded-md shadow-md hover:bg-gray-200 hover:dark:bg-slate-700'
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft className='mr-2' />
          back
        </button>
      </div>
      <div className='container lg:flex mx-auto mt-5 gap-10 lg:mt-10'>
        <div className='lg:w-1/2'>
          <img className='w-full  ' src={flags.png} alt={flags.alt} />
        </div>
        <div className='lg:w-1/2'>
          <h1 className='mt-5 lg:mt-0 text-2xl md:text-3xl xl:text-4xl xl:mb-8 font-extrabold'>
            {name.common}
          </h1>

          <div className='mt-3 font-semibold md:text-lg'>
            <p className='mb-1'>
              Population:
              <span className='font-light'> {population}</span>
            </p>
            <p className='mb-1'>
              Region:
              <span className='font-light'> {region}</span>
            </p>
            <p className='mb-1'>
              Sub Region:
              <span className='font-light'> {subregion}</span>
            </p>
            <p className='mb-1'>
              Capital:
              <span className='font-light'> {capital}</span>
            </p>
          </div>

          <div className='mt-5 font-semibold md:text-lg'>
            <p className='mb-1'>
              Top Level Domain:
              <span className='font-light'> {tld ? tld.map(domain => domain + ' ') : null}</span>
            </p>
            <p className='mb-1'>
              Currencies:
              <span className='font-light'>
                {currencies.SAR ? (
                  Object.values(currencies).map((keyName) => (
                    <span key={keyName.name}>{keyName.name}</span>
                  ))
                ) : (
                  <span> This country does not have its own currency 🤔</span>
                )}
              </span>
            </p>
            <p className='mb-1'>
              Languages:
              <span className='font-light'>
                {languages ? (
                  Object.values(languages).map(keyName => (
                    <span key={keyName}> {keyName} </span>
                  ))
                ) : (
                  <span> We don't have a language, but we have big balls 😚 </span>
                )}
              </span>
            </p>
          </div>

          <div className='mt-3 '>
            <p className='font-semibold md:text-lg mb-1'>Border Countries:</p>
            <div className='flex gap-1 flex-wrap'>
              {borders.length > 0 ? (
                borders.map(bor => (
                  <Link to={`../${bor.borderName}`} relative='path' key={bor.countryCode}>
                    <span className='font-light bg-slate-200 dark:bg-gray-950  py-1 px-2 rounded-md border-2 border-gray-300 hover:bg-gray-300  hover:dark:bg-gray-800 shadow-sm'>
                      {bor.countryCode}
                    </span>
                  </Link>
                ))
              ) : (
                <span>don't have</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
