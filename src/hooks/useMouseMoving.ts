import { useEffect, useState } from 'react'

/**
 * @returns [mouseMoving, onMouseMove()]
 */
const useMouseMoving = (): [boolean, () => void] => {
  const [mouseMoving, setMouseMoving] = useState(true)

  useEffect(() => {
    if (!mouseMoving) return

    const timeoutId = setTimeout(() => setMouseMoving(false), 4000)
    return () => clearTimeout(timeoutId)
  }, [mouseMoving])

  const onMouseMove = () => setMouseMoving(true)

  return [mouseMoving, onMouseMove]
}

export default useMouseMoving
