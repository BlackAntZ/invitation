export type Lang = 'sr' | 'en'

export const STORAGE_LANG_KEY = 'wedding-invite-lang'

export const event = {
  groom: 'Dejan',
  bride: 'Milica',
  groomFull: 'Dejan Bajić',
  son: 'Vukašin',
  date: {
    sr: '13. mart 2027',
    en: '13 March 2027',
  },
  /** Europe/Sarajevo — guest gathering. 13 March 2027 is still CET (UTC+1). */
  startsAt: '2027-03-13T17:00:00+01:00',
  /** How long the calendar event lasts after the gathering starts. */
  durationHours: 6,
  icsSummary: {
    sr: 'Milica & Dejan — vjenčanje i Vukašinov rođendan',
    en: "Milica & Dejan — wedding and Vukašin's birthday",
  },
  icsDescription: {
    sr: 'Vjenčanje Milice i Dejana i rođendan njihovog sina Vukašina',
    en: "Milica and Dejan's wedding, and their son Vukašin's birthday",
  },
  venue: {
    sr: 'Svadbeni salon „Kedar“',
    en: 'Wedding hall “Kedar”',
  },
  city: 'Mrkonjić Grad',
  region: {
    sr: 'Bosna i Hercegovina',
    en: 'Bosnia and Herzegovina',
  },
  mapsQuery: 'Svadbeni salon Kedar Mrkonjić Grad',
}

/**
 * First names the ending rule gets wrong. Keys are lowercase.
 * Example: nikola: 'm'
 */
export const guestGenderOverrides: Record<string, 'f' | 'm' | 'u'> = {}

/** Set `enabled: true` and fill fields when RSVP is ready */
export const rsvp = {
  enabled: false as boolean,
  deadline: { sr: '', en: '' },
  phones: [] as { label: string; href: string }[],
}

export type LocaleCopy = {
  pageTitle: string
  heroSubtitle: string
  heroNote: string
  saveCalendar: string
  scrollHint: string
  inviteTitle: string
  inviteBody: string
  /** Address before the guest name. Empty means the name stands alone. */
  inviteGuest: { f: string; m: string; u: string }
  countdownTitle: string
  countdownDoneTitle: string
  countdownDone: string
  days: string
  hours: string
  minutes: string
  seconds: string
  scheduleTitle: string
  scheduleItems: { time: string; title: string; detail: string }[]
  locationTitle: string
  mapsLink: string
  rsvpTitle: string
  rsvpBody: string
  footer: string
}

export const copy: Record<Lang, LocaleCopy> = {
  sr: {
    pageTitle: 'Milica & Dejan | Pozivnica',
    heroSubtitle: 'vjenčaju se!',
    heroNote: 'Istog dana slavimo i rođendan našeg sina Vukašina.',
    saveCalendar: 'Sačuvaj u kalendar',
    scrollHint: 'Skroluj',
    inviteTitle: 'Pozivamo',
    inviteBody:
      'Naš dan želimo proslaviti uz one koje volimo, i uz rođendan našeg sina Vukašina. Vaše prisustvo nam puno znači.',
    inviteGuest: { f: 'Draga', m: 'Dragi', u: '' },
    countdownTitle: 'Do velikog dana',
    countdownDoneTitle: 'Proslava',
    countdownDone: 'Datum proslave je prošao.',
    days: 'Dana',
    hours: 'Sati',
    minutes: 'Minuta',
    seconds: 'Sekundi',
    scheduleTitle: 'Raspored',
    scheduleItems: [
      {
        time: '17:00',
        title: 'Skup svatova',
        detail: 'Svadbeni salon „Kedar“ — dobrodošli!',
      },
    ],
    locationTitle: 'Lokacija',
    mapsLink: 'Google Maps',
    rsvpTitle: 'Potvrdite dolazak',
    rsvpBody: '',
    footer: 'Milica & Dejan — 13. mart 2027',
  },
  en: {
    pageTitle: 'Milica & Dejan | Invitation',
    heroSubtitle: 'are getting married!',
    heroNote: "The same day we celebrate our son Vukašin's birthday.",
    saveCalendar: 'Save the date',
    scrollHint: 'Scroll',
    inviteTitle: 'You are invited',
    inviteBody:
      "We want to celebrate our day with the people we love, and our son Vukašin's birthday. It would mean the world to have you there.",
    inviteGuest: { f: 'Dear', m: 'Dear', u: 'Dear' },
    countdownTitle: 'Counting down',
    countdownDoneTitle: 'The celebration',
    countdownDone: 'The celebration date has passed.',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    scheduleTitle: 'Schedule',
    scheduleItems: [
      {
        time: '17:00',
        title: 'Guest gathering',
        detail: 'Wedding hall “Kedar” — welcome!',
      },
    ],
    locationTitle: 'Location',
    mapsLink: 'Google Maps',
    rsvpTitle: 'RSVP',
    rsvpBody: '',
    footer: 'Milica & Dejan — 13 March 2027',
  },
}
