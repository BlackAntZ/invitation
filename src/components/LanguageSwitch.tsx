import type { Lang } from '../content'

type Props = {
  lang: Lang
  onChange: (lang: Lang) => void
}

export function LanguageSwitch({ lang, onChange }: Props) {
  return (
    <div className="lang-switch glass glass--compact" role="group" aria-label="Language">
      <button
        type="button"
        className={lang === 'sr' ? 'lang-switch__btn is-active' : 'lang-switch__btn'}
        onClick={() => onChange('sr')}
        aria-pressed={lang === 'sr'}
      >
        SR
      </button>
      <span className="lang-switch__sep" aria-hidden />
      <button
        type="button"
        className={lang === 'en' ? 'lang-switch__btn is-active' : 'lang-switch__btn'}
        onClick={() => onChange('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}
