import { useEffect, useRef, useState } from 'react'

const SRC = `${import.meta.env.BASE_URL}deus-vult.mp3`

type Props = {
  playLabel: string
  pauseLabel: string
}

export function MusicToggle({ playLabel, pauseLabel }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const pausedByGuest = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = true
    audio.volume = 0.45

    const start = () => {
      if (pausedByGuest.current) return
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }

    start()

    const onGesture = (event: Event) => {
      const target = event.target
      if (target instanceof Element && target.closest('.music-toggle')) return
      start()
    }

    window.addEventListener('pointerdown', onGesture)
    return () => window.removeEventListener('pointerdown', onGesture)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      pausedByGuest.current = false
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      pausedByGuest.current = true
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={SRC} preload="auto" loop />
      <button
        type="button"
        className={playing ? 'music-toggle glass is-on' : 'music-toggle glass'}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? pauseLabel : playLabel}
      >
        <SoundIcon muted={!playing} />
      </button>
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
