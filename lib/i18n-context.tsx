"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { translations, type Locale, type Translations } from "./i18n"

interface I18nContextType {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
  isTransitioning: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return
    
    setIsTransitioning(true)
    
    setTimeout(() => {
      setLocaleState(newLocale)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }, [locale])

  const t = translations[locale]

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, isTransitioning }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
