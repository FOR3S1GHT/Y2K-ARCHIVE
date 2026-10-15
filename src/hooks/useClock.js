import { useEffect, useState } from 'react'

/**
 * Ticks a clock once per second so interface timestamps are real —
 * decorative archive timestamps are separate and clearly fictional.
 */
export function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default useClock
