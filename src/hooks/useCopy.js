import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Copies text to the clipboard and reports the outcome so the UI can
 * confirm the action. Falls back to a hidden textarea when the async
 * Clipboard API is unavailable or blocked.
 */
export function useCopy(timeout = 2200) {
  const [status, setStatus] = useState('idle')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const flash = useCallback(
    (next) => {
      setStatus(next)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setStatus('idle'), timeout)
    },
    [timeout],
  )

  const legacyCopy = (text) => {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    document.body.removeChild(area)
    return ok
  }

  const copy = useCallback(
    async (text) => {
      const value = String(text ?? '')
      if (!value) return false
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value)
          flash('copied')
          return true
        }
      } catch {
        /* fall through to the legacy path */
      }
      if (legacyCopy(value)) {
        flash('copied')
        return true
      }
      flash('error')
      return false
    },
    [flash],
  )

  return { copy, status, reset: () => setStatus('idle') }
}

export default useCopy
