import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError() as Response & Error

  return (
    <div className='flex justify-center items-center w-full mt-[10rem] flex-col text-gray-900 dark:text-gray-100 text-center p-3'>
      <h1 className='text-3xl font-bold'>Something has gone wrong!</h1>
      <h2 className='text-lg mt-1'>Certainly not the country you wanted to visit 😉</h2>

      <h3 className='mt-10 text-red-400'>{error.statusText || error.message}</h3>

      <h3>{error.status}</h3>
    </div>
  )
}
