import { useEffect, useState } from 'react'
import { event } from '../content'

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

const targetMs = new Date(event.startsAt).getTime()

export function countdownUntil(target: number, now: number): CountdownParts {
  const diff = target - now
  if (!Number.isFinite(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds, done: false }
}

function compute(): CountdownParts {
  return countdownUntil(targetMs, Date.now())
}

export function useCountdown(): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() => compute())

  useEffect(() => {
    if (compute().done) return
    const id = window.setInterval(() => {
      const next = compute()
      setParts(next)
      if (next.done) window.clearInterval(id)
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  return parts
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0')
}
