import { Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'

export default function App() {

  return (
    <div className='bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 font-nunito'>
      <Header />
      <Outlet />
    </div>
  )
}
