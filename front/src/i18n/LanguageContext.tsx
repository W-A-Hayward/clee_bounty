import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'fr'

type LanguageContextValue = {
  lang: Lang
  setLang: (next: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'legend:lang'

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'fr') return stored
  } catch {
    // localStorage may be blocked; fall through to navigator sniff
  }
  const navLang = window.navigator.language || ''
  return navLang.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang())

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore write errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'fr' : 'en'))
  }, [])

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, toggle }), [lang, setLang, toggle])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

export function useLang(): Lang {
  return useLanguage().lang
}

export type Bilingual<T> = { en: T; fr: T }
export type T18n<T> = Bilingual<T> | T

function isBilingual<T>(value: unknown): value is Bilingual<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'en' in (value as Record<string, unknown>) &&
    'fr' in (value as Record<string, unknown>)
  )
}

export function pick<T>(entry: T18n<T> | undefined | null, lang: Lang): T {
  if (entry == null) return entry as T
  if (isBilingual<T>(entry)) return entry[lang]
  return entry as T
}
