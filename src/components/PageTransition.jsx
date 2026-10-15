import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'

/**
 * Route-level fade/scale wrapper. Scroll is reset on every navigation and
 * the transition is skipped entirely under reduced-motion.
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  if (reduce) return <div>{children}</div>

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}
