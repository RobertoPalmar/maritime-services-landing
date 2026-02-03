"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Anchor } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"

const heroImages = [
  "/hero/hero-ship-1.jpg",
  "/hero/hero-ship-2.jpg",
  "/hero/hero-ship-5.jpg",
]

export function Hero() {
  const { t, locale } = useI18n()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const contactHref = locale === "es" ? "#contacto" : "#contact"
  const servicesHref = locale === "es" ? "#servicios" : "#services"

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={src}
              alt={t.hero.imageAlt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-foreground/60 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <FadeInSection>
          <TranslatedBlock>
            <p className="text-primary-foreground/80 text-sm font-medium tracking-widest uppercase mb-6">
              {t.hero.tagline}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold text-primary-foreground leading-tight text-balance mb-6">
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
              {/* <Button size="lg" asChild className="text-base px-8">
                <Link href={contactHref}>
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button> */}
              <Button size="lg" variant="outline" asChild className="text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground bg-transparent">
                <Link href={servicesHref}>{t.hero.ctaSecondary}</Link>
              </Button>
            </div>
          </TranslatedBlock>
        </FadeInSection>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <Anchor className="h-8 w-8 text-primary-foreground/70 animate-bounce" />
      </div>
    </section>
  )
}
