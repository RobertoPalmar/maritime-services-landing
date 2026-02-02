"use client"

import { useI18n } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const toggleLocale = () => {
    setLocale(locale === "es" ? "en" : "es")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="flex items-center gap-2 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium uppercase">{locale === "es" ? "ES" : "EN"}</span>
    </Button>
  )
}
