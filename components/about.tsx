"use client"

import { Check, Users } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"

export function About() {
  const { t, locale } = useI18n()
  const sectionId = locale === "es" ? "nosotros" : "about"

  return (
    <section id={sectionId} className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <FadeInSection direction="left">
            <TranslatedBlock>
              <p className="text-primary text-base font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t.about.tagline}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground text-balance mb-6">
                {t.about.title}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t.about.description}
              </p>

              <ul className="grid sm:grid-cols-2 gap-4">
                {t.about.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </TranslatedBlock>
          </FadeInSection>

          {/* Stats */}
          <FadeInSection direction="right" delay={200}>
            <TranslatedBlock className="grid grid-cols-2 gap-6">
              {t.about.stats.map((stat, index) => (
                <div key={index} className="bg-card rounded-2xl p-8 text-center shadow-sm border border-border">
                  <div className="text-4xl lg:text-5xl font-sans font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </TranslatedBlock>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
