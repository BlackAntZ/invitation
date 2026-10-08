export type Lang = 'sr' | 'en'

export const STORAGE_LANG_KEY = 'wedding-invite-lang'

export const event = {
  groom: { sr: 'Дејан', en: 'Dejan' },
  bride: { sr: 'Милица', en: 'Milica' },
  groomFull: 'Dejan Bajić',
  son: { sr: 'Вукашин', en: 'Vukašin' },
  date: {
    sr: '13. март 2027',
    en: '13 March 2027',
  },
  /** Europe/Sarajevo — guest gathering. 13 March 2027 is still CET (UTC+1). */
  startsAt: '2027-03-13T17:00:00+01:00',
  /** How long the calendar event lasts after the gathering starts. */
  durationHours: 6,
  icsSummary: {
    sr: 'Милица & Дејан — вјенчање и Вукашинов рођендан',
    en: "Milica & Dejan — wedding and Vukašin's birthday",
  },
  icsDescription: {
    sr: 'Вјенчање Милице и Дејана и рођендан њиховог сина Вукашина',
    en: "Milica and Dejan's wedding, and their son Vukašin's birthday",
  },
  venue: {
    sr: 'Свадбени салон „Кедар“',
    en: 'Wedding hall “Kedar”',
  },
  city: {
    sr: 'Мркоњић Град',
    en: 'Mrkonjić Grad',
  },
  region: {
    sr: 'Босна и Херцеговина',
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
  enabled: true,
  deadline: { sr: '', en: '' },
  phones: {
    sr: [{ label: 'Дејан: 066 866 375', href: 'tel:+38766866375' }],
    en: [{ label: 'Dejan: 066 866 375', href: 'tel:+38766866375' }],
  },
}

export type LocaleCopy = {
  pageTitle: string
  heroSubtitle: string
  coupleJoin: string
  heroBirthday: string
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
    pageTitle: 'Милица & Дејан | Позивница',
    heroSubtitle: 'вјенчају се',
    coupleJoin: 'и',
    heroBirthday: 'слави рођендан',
    saveCalendar: 'Сачувај у календар',
    scrollHint: 'Скролуј',
    inviteTitle: 'Позивамо',
    inviteBody:
      'Наш дан желимо прославити уз оне које волимо, и уз рођендан нашег сина Вукашина. Ваше присуство нам пуно значи.',
    inviteGuest: { f: 'Драга', m: 'Драги', u: '' },
    countdownTitle: 'До великог дана',
    countdownDoneTitle: 'Прослава',
    countdownDone: 'Датум прославе је прошао.',
    days: 'Дана',
    hours: 'Сати',
    minutes: 'Минута',
    seconds: 'Секунди',
    scheduleTitle: 'Распоред',
    scheduleItems: [
      {
        time: '17:00',
        title: 'Скуп сватова',
        detail: 'Свадбени салон „Кедар“ — добродошли!',
      },
    ],
    locationTitle: 'Локација',
    mapsLink: 'Google Maps',
    rsvpTitle: 'Потврдите долазак',
    rsvpBody: 'Молимо да потврдите долазак до 01.03.2026.',
    footer: 'Милица & Дејан — 13. март 2027',
  },
  en: {
    pageTitle: 'Milica & Dejan | Invitation',
    heroSubtitle: 'are getting married',
    coupleJoin: 'and',
    heroBirthday: 'is celebrating a birthday',
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
    rsvpBody: 'Please confirm your attendance by 1 March 2026.',
    footer: 'Milica & Dejan — 13 March 2027',
  },
}
