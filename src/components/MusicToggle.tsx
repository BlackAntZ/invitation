import { useEffect, useRef, useState } from 'react'
import baby from '../assets/baby.webp'

const SRC = `${import.meta.env.BASE_URL}beba-sera.mp3`
/** First "beba séra" in the track. Later mentions are around 18s and 27s. */
const BEBA_AT = 9.85
const BEBA_UNTIL = 16.6

type Props = {
  playLabel: string
  pauseLabel: string
}

export function MusicToggle({ playLabel, pauseLabel }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const yesRef = useRef<HTMLButtonElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ask, setAsk] = useState(true)
  const [cameo, setCameo] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = true
    audio.volume = 0.45
    const onTime = () => {
      const t = audio.currentTime
      setCameo(t >= BEBA_AT && t < BEBA_UNTIL)
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
        <div className="baby-cameo" role="status">
          <p className="baby-cameo__bubble">Ko remeti moj mir?!</p>
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
