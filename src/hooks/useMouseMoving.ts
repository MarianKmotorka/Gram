import { useEffect, useState } from 'react'

/**
 * @returns [mouseMoving, onMouseMove()]
 */
const useMouseMoving = (): [boolean, () => void] => {
  const [mouseMoving, setMouseMoving] = useState(false)

  useEffect(() => {
    if (!mouseMoving) return

    const timeoutId = setTimeout(() => setMouseMoving(false), 2500)
    return () => clearTimeout(timeoutId)
  }, [mouseMoving])

  const onMouseMove = () => setMouseMoving(true)

  return [mouseMoving, onMouseMove]
}

export default useMouseMoving
