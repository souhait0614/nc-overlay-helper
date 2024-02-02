import { useCallback, useEffect, useRef } from "react"

export const useAnimationFrame = (isRunning: boolean, callback = () => {}) => {
  const reqIdRef = useRef<number>()
  const loop = useCallback(() => {
    if (isRunning) {
      reqIdRef.current = requestAnimationFrame(loop)
      callback()
    }
  }, [callback, isRunning])

  useEffect(() => {
    reqIdRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(reqIdRef.current!)
  }, [loop])
}
