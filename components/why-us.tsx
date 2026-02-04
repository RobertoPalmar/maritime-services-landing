"use client"

import { Settings, ShieldCheck, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"

const featureIcons = [Settings, ShieldCheck, Clock]

export function WhyUs() {
  const { t, locale } = useI18n()
  const sectionId = locale === "es" ? "por-que-elegirnos" : "why-us"

  return (
    <section id={sectionId} className="py-24 lg:py-32 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <TranslatedBlock className="text-center mb-16">
            <p className="text-primary text-base font-semibold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              {t.whyUs.tagline}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground text-balance mb-6">
              {t.whyUs.title}
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              {t.whyUs.description}
            </p>
          </TranslatedBlock>
        </FadeInSection>

        <TranslatedBlock className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.whyUs.features.map((feature, index) => {
            const IconComponent = featureIcons[index]
            return (
              <FadeInSection key={index} delay={index * 100}>
                <Card className="bg-card border-border shadow-sm h-full hover:shadow-md transition-shadow">
                  <CardContent className="py-3 px-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeInSection>
            )
          })}
        </TranslatedBlock>
      </div>
    </section>
  )
}
