import { useEffect, useMemo } from 'react'
import { Background } from './components/Background'
import { GlassPanel } from './components/GlassPanel'
import { LanguageSwitch } from './components/LanguageSwitch'
import { copy, event, rsvp, unitLabel } from './content'
import { useCountdown, pad2 } from './hooks/useCountdown'
import { useLanguage } from './hooks/useLanguage'
import { downloadIcsFile } from './utils/calendar'
import { getGuestFromUrl } from './utils/guestName'
import { mapsUrl } from './utils/maps'
import sprig from './assets/sprig.webp'
import './styles.css'

function App() {
  const [lang, setLang] = useLanguage()
  const t = copy[lang]
  const countdown = useCountdown()
  const guest = useMemo(() => getGuestFromUrl(), [])
  const guestPrefix = t.inviteGuest[guest.gender]

  useEffect(() => {
    document.title = t.pageTitle
  }, [t.pageTitle])

  const venueLabel = event.venue[lang]
  const dateLabel = event.date[lang]
  const regionLabel = event.region[lang]
  const cityLabel = event.city[lang]

  return (
    <>
      <Background />
      <LanguageSwitch lang={lang} onChange={setLang} />

      <main className="page">
        <section className="hero" aria-labelledby="hero-title">
          <GlassPanel className="date-pill">
            <time dateTime={event.startsAt}>{dateLabel}</time>
          </GlassPanel>
          <p className="hero__lead">{t.heroSubtitle}</p>
          <h1 id="hero-title" className="hero__names">
            {event.bride[lang]} <span className="hero__amp">{t.coupleJoin}</span> {event.groom[lang]}
          </h1>
          <div className="hero__birthday">
            <p className="hero__names">{event.son[lang]}</p>
            <p className="hero__lead">{t.heroBirthday}</p>
          </div>

          <button type="button" className="btn btn--primary" onClick={() => downloadIcsFile(lang)}>
            <CalendarIcon />
            {t.saveCalendar}
          </button>

          <a href="#invite" className="hero__scroll" aria-label={t.scrollHint}>
            <ChevronDown />
          </a>
        </section>

        <div className="band">
        <section id="invite" className="section" aria-labelledby="invite-title">
          <h2 id="invite-title" className="section__heading">
            {t.inviteTitle}
          </h2>
          <GlassPanel className="section__panel section__panel--narrow">
            {guest.name ? (
              <p className="invite__guest">
                {guestPrefix ? `${guestPrefix} ${guest.name},` : `${guest.name},`}
              </p>
            ) : null}
            <p id="invite-body" className="invite__body">{t.inviteBody}</p>
          </GlassPanel>
        </section>

        <section className="section" aria-labelledby="countdown-title">
          <h2 id="countdown-title" className="section__heading">
            {countdown.done ? t.countdownDoneTitle : t.countdownTitle}
          </h2>
          {countdown.done ? (
            <GlassPanel className="section__panel section__panel--narrow">
              <p className="countdown__done">{t.countdownDone}</p>
            </GlassPanel>
          ) : (
            <div className="countdown">
              {(
                [
                  ['days', countdown.days, t.days],
                  ['hours', countdown.hours, t.hours],
                  ['minutes', countdown.minutes, t.minutes],
                  ['seconds', countdown.seconds, t.seconds],
                ] as const
              ).map(([key, value, label]) => (
                <GlassPanel key={key} className="countdown__cell">
                  <span className="countdown__value">{pad2(value)}</span>
                  <span className="countdown__label">{unitLabel(lang, label, value)}</span>
                </GlassPanel>
              ))}
            </div>
          )}
        </section>
        </div>

        <div className="band">
        <section className="section" aria-labelledby="schedule-title">
          <h2 id="schedule-title" className="section__heading">
            {t.scheduleTitle}
          </h2>
          <ul className="schedule">
            {t.scheduleItems.map((item) => (
              <li key={item.title}>
                <GlassPanel className="schedule__item" as="article">
                  <time className="schedule__time">{item.time}</time>
                  <div>
                    <h3 className="schedule__item-title">{item.title}</h3>
                    <p className="schedule__detail">{item.detail}</p>
                  </div>
                </GlassPanel>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" aria-labelledby="location-title">
          <h2 id="location-title" className="section__heading">
            {t.locationTitle}
          </h2>
          <GlassPanel className="section__panel location">
            <p className="location__venue">{venueLabel}</p>
            <p className="location__city">
              {cityLabel}
              <br />
              {regionLabel}
            </p>
            <a
              className="btn btn--secondary"
              href={mapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.mapsLink}
            </a>
          </GlassPanel>
        </section>
        </div>

        {rsvp.enabled ? (
          <section className="section" aria-labelledby="rsvp-title">
            <GlassPanel className="section__panel section__panel--narrow">
              <h2 id="rsvp-title" className="section__title script">
                {t.rsvpTitle}
              </h2>
              {rsvp.deadline[lang] ? (
                <p className="invite__body">{rsvp.deadline[lang]}</p>
              ) : null}
              {t.rsvpBody ? <p className="invite__body rsvp__body">{t.rsvpBody}</p> : null}
              {rsvp.phones[lang].length > 0 ? (
                <div className="rsvp__phones">
                  {rsvp.phones[lang].map((p) => (
                    <a key={p.href} href={p.href} className="rsvp__phone">
                      {p.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </GlassPanel>
          </section>
        ) : null}

        <img className="sprig" src={sprig} alt="" />
        <footer className="footer">
          <p>{t.footer}</p>
        </footer>
      </main>
    </>
  )
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 2v3M16 2v3M4 9h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default App
