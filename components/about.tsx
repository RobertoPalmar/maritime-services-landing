"use client"

import Image from "next/image"
import { Check, Users } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"
import { StatsBanner } from "./stats-banner"

export function About() {
  const { t, locale } = useI18n()
  const sectionId = locale === "es" ? "nosotros" : "about"

  return (
    <section id={sectionId} className="relative text-primary-foreground overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about-us/about-2.jpg"
          alt="Technical operation background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/20" />
      </div>

      <div className="relative z-10">
        {/* Top Content: Title & Description */}
        <div className="pt-24 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInSection direction="up">
              <TranslatedBlock>
                <p className="text-primary-foreground/90 text-sm font-semibold tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  {t.about.tagline}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-sans font-bold text-primary-foreground text-balance mb-6">
                  {t.about.title}
                </h2>
                <p className="text-primary-foreground/80 text-lg leading-relaxed mx-auto max-w-3xl">
                  {t.about.description}
                </p>
              </TranslatedBlock>
            </FadeInSection>
          </div>
        </div>

        {/* Bottom Content: Tips */}
        <div className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <FadeInSection direction="up" delay={200}>
              <TranslatedBlock>
                <ul className="flex flex-wrap justify-center gap-4 mx-auto">
                  {t.about.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span className="text-primary-foreground/90 text-sm font-medium leading-snug text-left text-balance">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </TranslatedBlock>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  )
}

