import { useEffect, useRef, useState } from 'react'
import baby from '../assets/baby.webp'

const SRC = `${import.meta.env.BASE_URL}beba-sera-2.mp3`
/** Start of each "beba séra" in the track. The baby stays up for HOLD seconds. */
const CUES = [30.7, 48.35, 67.75, 121.65]
const HOLD = 5.6
const LINES = [
  'Ko si ti?',
  'Mene zoveš?',
  'Ovdje sam!',
  'Ko remeti moj mir!?',
  'Opet ja?',
  'Dosta više!',
  'Prestani!',
  'Ne mogu da pijem!',
  'Ma ko ste vi?!',
  'Spustite to!',
  'Hoću mir!',
  'E, sad je dosta!',
  'DOSTA!',
]

type Props = {
  playLabel: string
  pauseLabel: string
}

export function MusicToggle({ playLabel, pauseLabel }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const yesRef = useRef<HTMLButtonElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ask, setAsk] = useState(true)
  const [cameo, setCameo] = useState<{ text: string; level: number } | null>(null)
  const lineRef = useRef(0)
  const lastTimeRef = useRef(0)
  const firedRef = useRef<boolean[]>(CUES.map(() => false))
  const visibleRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = true
    audio.volume = 0.45
    const onTime = () => {
      const t = audio.currentTime
      if (t + 0.4 < lastTimeRef.current) firedRef.current = CUES.map(() => false)
      lastTimeRef.current = t
      const active = CUES.findIndex((start) => t >= start && t < start + HOLD)
      if (active !== -1) {
        if (!firedRef.current[active]) {
          firedRef.current[active] = true
          const level = lineRef.current
          lineRef.current += 1
          visibleRef.current = true
          setCameo({ text: LINES[Math.min(level, LINES.length - 1)], level })
        }
        return
      }
      if (visibleRef.current) {
        visibleRef.current = false
        setCameo(null)
      }
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('seeked', onTime)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('seeked', onTime)
    }
  }, [])

  useEffect(() => {
    if (!ask) return
    const locked = document.querySelectorAll('.page, .lang-switch')
    locked.forEach((node) => node.setAttribute('inert', ''))
    yesRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab' || event.key === 'Escape') {
        event.preventDefault()
        yesRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      locked.forEach((node) => node.removeAttribute('inert'))
      window.removeEventListener('keydown', onKey)
    }
  }, [ask])

  const play = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    setAsk(false)
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={SRC} preload="auto" loop />
      {cameo ? (
        <div
          key={cameo.level}
          className="baby-cameo"
          data-mood={moodFor(cameo.level)}
          role="status"
        >
          <p className="baby-cameo__bubble">{cameo.text}</p>
          <div className="baby-cameo__dots" aria-hidden>
            <span className="baby-cameo__dot baby-cameo__dot--lg" />
            <span className="baby-cameo__dot baby-cameo__dot--sm" />
          </div>
          <img src={baby} alt="" />
        </div>
      ) : null}
      {!ask ? (
        <button
          type="button"
          className={playing ? 'music-toggle glass is-on' : 'music-toggle glass'}
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? pauseLabel : playLabel}
        >
          <SoundIcon muted={!playing} />
        </button>
      ) : (
        <div className="music-ask">
          <button
            ref={yesRef}
            type="button"
            className="music-ask__play glass"
            onClick={play}
            aria-label={playLabel}
          >
            <div className="glass__shine" aria-hidden />
            <SoundIcon muted={false} />
          </button>
        </div>
      )}
    </>
  )
}

function moodFor(level: number) {
  if (level >= 7) return 'fuming'
  if (level >= 3) return 'annoyed'
  if (level >= 2) return 'firm'
  return 'curious'
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10v4h3l4 3V7L7 10H4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {muted ? (
        <path d="M16 10l4 4M20 10l-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      ) : (
        <path
          d="M16 9a4 4 0 0 1 0 6M18.5 7a7 7 0 0 1 0 10"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
