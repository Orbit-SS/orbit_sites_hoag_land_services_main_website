'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const prevPath = useRef(pathname)

  useEffect(() => {
    // If path changed, reset and animate in
    if (prevPath.current !== pathname) {
      const resetTimer = window.setTimeout(() => setIsVisible(false), 0)
      const showTimer = window.setTimeout(() => {
        setIsVisible(true)
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }, 50)
      prevPath.current = pathname
      return () => {
        window.clearTimeout(resetTimer)
        window.clearTimeout(showTimer)
      }
    }

    return undefined
  }, [pathname])

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  )
}
