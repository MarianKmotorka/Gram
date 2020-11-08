import { useRef, useLayoutEffect, RefObject } from 'react'

type Coordinate = {
  x: number
  y: number
}

const isBrowser = typeof window !== `undefined`

const getScrollPosition = <T extends HTMLElement>({
  element,
  useWindow,
}: {
  element?: RefObject<T>
  useWindow: boolean
}) => {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target!.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

const useScrollPosition = <T extends HTMLElement>(
  effect: (position: { prevPos: Coordinate; currPos: Coordinate }) => void,
  deps: any[],
  element?: RefObject<T>,
  useWindow: boolean = false,
  wait: number = 0
) => {
  const position = useRef(getScrollPosition({ useWindow }))

  let timeoutId: number | null = null

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow })
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    timeoutId = null
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (timeoutId === null) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          timeoutId = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}

export default useScrollPosition
