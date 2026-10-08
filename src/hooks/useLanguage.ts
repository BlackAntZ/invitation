import { useCallback, useEffect, useState } from 'react'
import { STORAGE_LANG_KEY } from '../content'
import type { Lang } from '../content'

function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_LANG_KEY)
    if (v === 'en' || v === 'sr') return v
  } catch {
    /* ignore */
  }
  return 'sr'
}

export function useLanguage(): [Lang, (lang: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang())

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_LANG_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'sr' ? 'sr' : 'en'
  }, [lang])

  return [lang, setLang]
}
