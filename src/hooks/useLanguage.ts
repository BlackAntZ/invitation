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

export function langFromSearch(search: string): Lang | null {
  const value = new URLSearchParams(search).get('lang')
  if (!value) return null
  const v = value.toLocaleLowerCase('en')
  if (v === 'en' || v === 'english') return 'en'
  if (v === 'sr' || v === 'srp' || v === 'srpski') return 'sr'
  return null
}

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'sr'
  const fromUrl = langFromSearch(window.location.search)
  if (!fromUrl) return readStoredLang()
  try {
    localStorage.setItem(STORAGE_LANG_KEY, fromUrl)
  } catch {
    /* ignore */
  }
  return fromUrl
}

export function useLanguage(): [Lang, (lang: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(() => readInitialLang())

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_LANG_KEY, next)
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.history.replaceState(null, '', url)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'sr' ? 'sr' : 'en'
  }, [lang])

  return [lang, setLang]
}
