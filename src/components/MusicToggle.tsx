import { useEffect, useRef, useState } from 'react'

const SRC = `${import.meta.env.BASE_URL}deus-vult.mp3`

type Props = {
  playLabel: string
  pauseLabel: string
  askTitle: string
  askBody: string
  askYes: string
  askNo: string
}

export function MusicToggle({ playLabel, pauseLabel, askTitle, askBody, askYes, askNo }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const yesRef = useRef<HTMLButtonElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ask, setAsk] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = true
    audio.volume = 0.45
  }, [])

  useEffect(() => {
    if (!ask) return
    yesRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAsk(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ask])

  const play = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    setAsk(false)
  }

  const dismiss = () => setAsk(false)

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
      <button
        type="button"
        className={playing ? 'music-toggle glass is-on' : 'music-toggle glass'}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? pauseLabel : playLabel}
      >
        <SoundIcon muted={!playing} />
      </button>
      {ask ? (
        <div className="music-ask" role="presentation" onClick={dismiss}>
          <div
            className="music-ask__card glass"
            role="dialog"
            aria-modal="true"
            aria-labelledby="music-ask-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="glass__shine" aria-hidden />
            <span className="music-ask__icon" aria-hidden>
              <SoundIcon muted={false} />
            </span>
            <h2 id="music-ask-title" className="music-ask__title script">
              {askTitle}
            </h2>
            <p className="music-ask__body">{askBody}</p>
            <div className="music-ask__actions">
              <button ref={yesRef} type="button" className="btn music-ask__yes" onClick={play}>
                {askYes}
              </button>
              <button type="button" className="btn music-ask__no" onClick={dismiss}>
                {askNo}
              </button>
            </div>
          </div>
        </div>
      ) : null}
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
