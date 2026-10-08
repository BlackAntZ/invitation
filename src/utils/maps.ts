import { event } from '../content'

export function mapsUrl(): string {
  const q = encodeURIComponent(event.mapsQuery)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}
