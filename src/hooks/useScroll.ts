import { useEffect, useRef, useState, RefObject } from 'react'

/**
 * @returns [ref, scroll()]
 */
const useScroll = <TRef extends HTMLElement>(): [RefObject<TRef>, () => void] => {
  const ref = useRef<TRef>(null)
  const [refreshObject, setRefreshObject] = useState({})

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [ref, refreshObject])

  const scroll = () => setRefreshObject({})

  return [ref, scroll]
}

export default useScroll
