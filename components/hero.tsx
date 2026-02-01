"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"

export function Hero() {
  const { t, locale } = useI18n()
  const contactHref = locale === "es" ? "#contacto" : "#contact"
  const servicesHref = locale === "es" ? "#servicios" : "#services"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-ship.jpg"
          alt={t.hero.imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <FadeInSection>
          <TranslatedBlock>
            <p className="text-primary-foreground/80 text-sm font-medium tracking-widest uppercase mb-6">
              {t.hero.tagline}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-primary-foreground leading-tight text-balance mb-6">
              {t.hero.title1}
              <br />
              {t.hero.title2}
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-primary-foreground/90 mb-10 text-pretty">
              {t.hero.description}
            </p>
          </TranslatedBlock>
        </FadeInSection>
        <FadeInSection delay={200}>
          <TranslatedBlock>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="text-base px-8">
                <Link href={contactHref}>
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground bg-transparent">
                <Link href={servicesHref}>{t.hero.ctaSecondary}</Link>
              </Button>
            </div>
          </TranslatedBlock>
        </FadeInSection>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
