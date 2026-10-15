import { useEffect } from 'react'

/** Locks body scroll while a modal or the mobile menu is open. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [active])
}

export default useScrollLock
