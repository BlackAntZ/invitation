import { useEffect, useRef, useState } from 'react'
import baby from '../assets/baby.webp'
import type { Lang } from '../content'
import type { GuestGender } from '../utils/guestName'

const LINES = {
  sr: {
    uncle: 'Чико, хоћеш ли доћи?',
    aunt: 'Тето, хоћеш ли доћи?',
    dare: 'Боцни ме ако смијеш',
    fattyM: 'Не боцкај ме дебели!',
    fattyF: 'Не боцкај ме дебела!',
    pokes: [
      'Не дирај Гигија',
      'Истуће те моја мама',
      'Мама!!',
      'Хоћеш да те уједем за прст?!',
      'Види ми зубе!',
      'Мама, овај ме боцка!',
      'Ја ћу да кажем!',
      'Гиги је опасан!',
      'Сад ћу да заплачем!',
      'ДОСТА!',
    ],
  },
  en: {
    uncle: 'Uncle, will you come?',
    aunt: 'Auntie, will you come?',
    dare: 'Poke me if you dare',
    fattyM: "Don't poke me, fatty!",
    fattyF: "Don't poke me, fatty!",
    pokes: [
      "Don't touch Gigi",
      'My mum will smack you',
      'Mum!!',
      'Want me to bite your finger?!',
      'Look at my teeth!',
      'Mum, this one is poking me!',
      "I'll tell on you!",
      'Gigi is dangerous!',
      "I'm going to cry!",
      'ENOUGH!',
    ],
  },
} as const

type Beat = 'greet' | 'dare' | number

type Props = {
  gender: GuestGender
  lang: Lang
  /** Younger invitation: the baby dares the guest to poke him. */
  playful?: boolean
}

function thought(lang: Lang, female: boolean, beat: Beat): string {
  const lines = LINES[lang]
  if (beat === 'greet') return female ? lines.aunt : lines.uncle
  if (beat === 'dare') return lines.dare
  if (beat === 1) return female ? lines.fattyF : lines.fattyM
  return lines.pokes[Math.min(beat - 2, lines.pokes.length - 1)]
}

export function BabyGuest({ gender, lang, playful = true }: Props) {
  const pokedRef = useRef(false)
  const pokesRef = useRef(0)
  const female = gender === 'f'
  const [beat, setBeat] = useState<Beat>('greet')
  const [pokes, setPokes] = useState(0)
  const [shown, setShown] = useState(false)
  const text = thought(lang, female, beat)

  useEffect(() => {
    const numbers = document.querySelector('.rsvp__phones')
    if (!numbers) return
    let timer = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || timer) return
        setShown(true)
        if (!playful) return
        timer = window.setTimeout(() => {
          if (!pokedRef.current) setBeat('dare')
        }, 5000)
      },
      { threshold: 0.4 },
    )
    observer.observe(numbers)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [playful])

  const poke = () => {
    pokedRef.current = true
    const next = pokesRef.current + 1
    pokesRef.current = next
    setPokes(next)
    setBeat(next)
  }

  if (!shown) return null

  return (
    <section className="baby-end" aria-label={text}>
      <p id="baby-thought" className="baby-cameo__bubble" data-mood={moodFor(pokes)}>
        {text}
      </p>
      <div className="baby-cameo__dots" aria-hidden>
        <span className="baby-cameo__dot baby-cameo__dot--lg" />
        <span className="baby-cameo__dot baby-cameo__dot--sm" />
      </div>
      {playful ? (
        <button type="button" className="baby-end__poke" onClick={poke} aria-labelledby="baby-thought">
          <img key={pokes} src={baby} alt="" data-mood={moodFor(pokes)} />
        </button>
      ) : (
        <img className="baby-end__still" src={baby} alt="" />
      )}
    </section>
  )
}

function moodFor(pokes: number) {
  if (pokes >= 6) return 'fuming'
  if (pokes >= 3) return 'annoyed'
  if (pokes >= 1) return 'firm'
  return 'curious'
}
