import { useEffect, useRef, useState } from 'react'

export function useCountUp(value, active, duration = 1200) {
  const [display, setDisplay] = useState(value)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!active || hasRun.current) return undefined

    const raw = String(value)
    const match = raw.match(/\d+/)
    if (!match) return undefined

    hasRun.current = true
    const target = parseInt(match[0], 10)
    const digits = match[0].length
    const prefix = raw.slice(0, match.index)
    const suffix = raw.slice(match.index + match[0].length)
    const start = performance.now()

    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)
      setDisplay(`${prefix}${String(current).padStart(digits, '0')}${suffix}`)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, value, duration])

  return display
}
