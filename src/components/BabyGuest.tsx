import { useEffect, useRef, useState } from 'react'
import baby from '../assets/baby.webp'
import type { GuestGender } from '../utils/guestName'

const DARE = 'Боцни ме ако смијеш'

const POKES = [
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
]

type Props = {
  gender: GuestGender
  /** Younger invitation: the baby dares the guest to poke him. */
  playful?: boolean
}

export function BabyGuest({ gender, playful = true }: Props) {
  const pokedRef = useRef(false)
  const pokesRef = useRef(0)
  const female = gender === 'f'
  const greeting = female ? 'Тето, хоћеш ли доћи?' : 'Чико, хоћеш ли доћи?'
  const [text, setText] = useState(greeting)
  const [pokes, setPokes] = useState(0)
  const [shown, setShown] = useState(false)

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
          if (!pokedRef.current) setText(DARE)
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
    if (next === 1) {
      setText(female ? 'Не боцкај ме дебела!' : 'Не боцкај ме дебели!')
      return
    }
    setText(POKES[Math.min(next - 2, POKES.length - 1)])
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
