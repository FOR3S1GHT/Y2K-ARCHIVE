import { useCallback, useEffect, useState } from 'react'

/**
 * localStorage-backed state that degrades gracefully when storage is
 * unavailable (private mode, blocked cookies) or holds corrupt data.
 */
export function useLocalStorage(key, initialValue) {
  const readInitial = () => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initialValue : JSON.parse(raw)
    } catch {
      return initialValue
    }
  }

  const [value, setValue] = useState(readInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage full or unavailable — state still works for this session */
    }
  }, [key, value])

  // Keep multiple tabs of the archive in sync.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== key || event.newValue === null) return
      try {
        setValue(JSON.parse(event.newValue))
      } catch {
        /* ignore malformed payloads from other tabs */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset]
}

export default useLocalStorage
