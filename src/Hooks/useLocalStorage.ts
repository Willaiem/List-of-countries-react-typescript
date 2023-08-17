import { useState } from 'react'

export default function useLocalStorage<V>(key: string, initialValue: V) {
  const [storedValue, setStoredValue] = useState<V>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const storageItem = window.localStorage.getItem(key)
      return storageItem ? JSON.parse(storageItem) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: V) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }
  return [storedValue, setValue] as const
}
