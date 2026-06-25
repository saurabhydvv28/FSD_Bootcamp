import { useRef, useCallback } from 'react'
import gsap from 'gsap'

export function useToast() {
  const toastRef = useRef(null)

  const showToast = useCallback((msg) => {
    const el = toastRef.current
    if (!el) return
    el.textContent = msg
    gsap.killTweensOf(el)
    gsap.to(el, { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' })
    gsap.to(el, { opacity: 0, y: 20, duration: 0.3, delay: 2.2, ease: 'power2.in' })
  }, [])

  return { toastRef, showToast }
}
