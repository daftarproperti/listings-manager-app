import { useEffect } from 'react'
import { useNavigationType } from 'react-router-dom'

const ScrollRestoration: React.FC = () => {
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') {
      // When "back" is triggered, it should restore the scroll context.
      const savedPosition = history.state?.scroll || 0
      window.scrollTo(0, savedPosition)
    } else if (navigationType === 'PUSH') {
      // New navigation always scrolls to top because it's a context change.
      window.scrollTo(0, 0)
    }

    const saveScrollPosition = () => {
      const scrollY = window.scrollY
      history.replaceState({ ...history.state, scroll: scrollY }, '')
    }

    // Keep current scroll position updated for the current context.
    window.addEventListener('scroll', saveScrollPosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', saveScrollPosition)
    }
  }, [navigationType]) // Triggered on path or navigation type changes

  return null
}

export default ScrollRestoration
