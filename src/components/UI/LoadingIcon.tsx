export default function LoadingIcon() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <span className="sr-only">Loading...</span>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100' />
    </div>
  )
}
