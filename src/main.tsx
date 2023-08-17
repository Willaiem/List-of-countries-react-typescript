import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import CountriesBoard from './routers/CountriesBoard.tsx'
import CountryBoard, { loader as loaderCountry } from './routers/CountryBoard.tsx'
import ErrorPage from './routers/errorPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      { errorElement: <ErrorPage /> },
      {
        index: true,
        element: <CountriesBoard />,
      },
      {
        path: 'countries/:country',
        element: <CountryBoard />,
        loader: loaderCountry,
      },
    ],
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
