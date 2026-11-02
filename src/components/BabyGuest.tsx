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
}

export function BabyGuest({ gender }: Props) {
  const rootRef = useRef<HTMLElement>(null)
  const pokedRef = useRef(false)
  const pokesRef = useRef(0)
  const female = gender === 'f'
  const greeting = female ? 'Тето, хоћеш ли доћи?' : 'Чико, хоћеш ли доћи?'
  const [text, setText] = useState(greeting)
  const [pokes, setPokes] = useState(0)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    let timer = 0
    let seen = false
    const arm = () => {
      if (timer || !seen || document.querySelector('.music-ask')) return
      timer = window.setTimeout(() => {
        if (!pokedRef.current) setText(DARE)
      }, 5000)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        seen = true
        arm()
      },
      { threshold: 0.5 },
    )
    observer.observe(node)
    const gate = new MutationObserver(arm)
    gate.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      gate.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

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

  return (
    <section ref={rootRef} className="baby-end" aria-label={text}>
      <p id="baby-thought" className="baby-cameo__bubble" data-mood={moodFor(pokes)}>
        {text}
      </p>
      <div className="baby-cameo__dots" aria-hidden>
        <span className="baby-cameo__dot baby-cameo__dot--lg" />
        <span className="baby-cameo__dot baby-cameo__dot--sm" />
      </div>
      <button type="button" className="baby-end__poke" onClick={poke} aria-labelledby="baby-thought">
        <img key={pokes} src={baby} alt="" data-mood={moodFor(pokes)} />
      </button>
    </section>
  )
}

function moodFor(pokes: number) {
  if (pokes >= 6) return 'fuming'
  if (pokes >= 3) return 'annoyed'
  if (pokes >= 1) return 'firm'
  return 'curious'
}
