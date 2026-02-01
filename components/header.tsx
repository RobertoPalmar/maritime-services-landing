"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedText } from "@/components/translated-text"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, locale } = useI18n()

  const navLinks = [
    { href: locale === "es" ? "#servicios" : "#services", label: t.nav.services },
    { href: locale === "es" ? "#nosotros" : "#about", label: t.nav.about },
    { href: locale === "es" ? "#clientes" : "#clients", label: t.nav.clients },
    { href: locale === "es" ? "#contacto" : "#contact", label: t.nav.contact },
  ]

  const contactHref = locale === "es" ? "#contacto" : "#contact"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-header.svg"
              alt="World Maritime Services Logo"
              width={250}
              height={100}
              className="h-14 lg:h-14 w-auto object-contain"
              priority
            />
            <div className="flex flex-col justify-center">
              <span className="text-xl font-semibold text-foreground">World Maritime</span>
              <span className="text-xl font-semibold text-foreground">Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <TranslatedText>{link.label}</TranslatedText>
              </Link>
            ))}
          </nav>

          {/* CTA Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button asChild>
              <Link href={contactHref}>
                <TranslatedText>{t.nav.cta}</TranslatedText>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <TranslatedText>{link.label}</TranslatedText>
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href={contactHref}>
                <TranslatedText>{t.nav.cta}</TranslatedText>
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
