import { guestGenderOverrides } from '../content'

export type GuestGender = 'f' | 'm' | 'u'

export type Guest = {
  name: string | null
  gender: GuestGender
}

const RESERVED = new Set(['p', 'pol', 'gender', 'guest', 'g', 'name'])

/** Common male given names in the region that end in -a. */
const MALE_ENDING_A = new Set([
  'nikola',
  'luka',
  'nemanja',
  'andrija',
  'ilija',
  'mateja',
  'matija',
  'strahinja',
  'toma',
  'sava',
  'kosta',
  'kuzma',
])

/** Given names used for more than one gender. */
const UNISEX = new Set(['vanja', 'sasa', 'minja', 'nika'])

export function getGuestFromUrl(): Guest {
  if (typeof window === 'undefined') return { name: null, gender: 'u' }
  return readGuest(window.location.search)
}

export function readGuest(search: string): Guest {
  if (!search || search.length <= 1) return { name: null, gender: 'u' }

  const params = new URLSearchParams(search)
  const explicit = parseGender(params.get('p') ?? params.get('pol') ?? params.get('gender'))
  const named = params.get('guest') ?? params.get('g') ?? params.get('name')
  let name = named ? decodeName(named) : null

  if (!name) {
    for (const [key, value] of params) {
      if (value !== '' || RESERVED.has(key.toLowerCase())) continue
      name = decodeName(key)
      if (name) break
    }
  }

  const gender = explicit ?? (name ? inferGender(name) : 'u')
  return { name, gender }
}

export function inferGender(fullName: string): GuestGender {
  const first = fold(fullName.trim().split(/\s+/)[0] ?? '')
  if (!first) return 'u'
  const override = guestGenderOverrides[first]
  if (override) return override
  if (UNISEX.has(first)) return 'u'
  if (MALE_ENDING_A.has(first)) return 'm'
  if (first.endsWith('a')) return 'f'
  return 'm'
}

function parseGender(value: string | null): GuestGender | null {
  if (!value) return null
  const v = fold(value)
  if (v === 'z' || v === 'f' || v === 'zensko' || v === 'female') return 'f'
  if (v === 'm' || v === 'musko' || v === 'male') return 'm'
  return null
}

function fold(value: string): string {
  return value
    .toLocaleLowerCase('sr')
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
}

function decodeName(value: string): string | null {
  let decoded = value
  for (let i = 0; i < 2; i++) {
    try {
      const next = decodeURIComponent(decoded)
      if (next === decoded) break
      decoded = next
    } catch {
      break
    }
  }
  const trimmed = decoded.replace(/\+/g, ' ').trim()
  return trimmed.length > 0 ? trimmed : null
}
