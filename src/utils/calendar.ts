import { event, type Lang } from '../content'

/** Builds an iCalendar file for the gathering. Times are UTC so calendars don't need a timezone block. */
export function buildIcs(lang: Lang, now = new Date()): string {
  const start = new Date(event.startsAt)
  const end = new Date(start.getTime() + event.durationHours * 60 * 60 * 1000)
  const location = `${event.venue[lang]}, ${event.city}, ${event.region[lang]}`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Milica Dejan Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${now.getTime()}@milica-dejan-wedding`,
    `DTSTAMP:${formatIcsUtc(now)}`,
    `DTSTART:${formatIcsUtc(start)}`,
    `DTEND:${formatIcsUtc(end)}`,
    `SUMMARY:${escapeIcs(event.icsSummary[lang])}`,
    `LOCATION:${escapeIcs(location)}`,
    `DESCRIPTION:${escapeIcs(event.icsDescription[lang])}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return `${foldIcsLines(lines.join('\r\n'))}\r\n`
}

export function downloadIcsFile(lang: Lang): void {
  const blob = new Blob([buildIcs(lang)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'milica-dejan-wedding.ics'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}

function formatIcsUtc(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  )
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

/** RFC 5545: fold at 75 octets. Continuation lines start with a space. */
function foldIcsLines(text: string): string {
  const encoder = new TextEncoder()
  const folded: string[] = []

  for (const line of text.split('\r\n')) {
    let current = ''
    let currentBytes = 0
    let first = true

    const push = () => {
      folded.push(first ? current : ` ${current}`)
      first = false
      current = ''
      currentBytes = 0
    }

    for (const ch of line) {
      const size = encoder.encode(ch).length
      const limit = first ? 75 : 74
      if (current && currentBytes + size > limit) push()
      current += ch
      currentBytes += size
    }
    if (current || first) push()
  }

  return folded.join('\r\n')
}
