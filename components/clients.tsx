"use client"

import * as React from "react"
import { Quote, UserCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"

const clients = [
  "SCF Group",
  "NYNAS AB",
  "Nordic American Tankers",
  "SFL Corporation Ltd.",
  "The Great Eastern Shipping Company Limited",
  "Minerva Marine Inc",
  "Hellenic Tankers Ltd",
  "Teekay Shipping Corporation",
  "Maran Tankers Management Inc",
  "Euronav Ship Management (HELLAS) Ltd",
  "Swiss Carriers SA",
  "Wah Kwong Maritime Transport Holdings Limited",
]

export function Clients() {
  const { t, locale } = useI18n()
  const sectionId = locale === "es" ? "clientes" : "clients"

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
      containScroll: false
    },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true
      })
    ]
  )

  return (
    <section id={sectionId} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInSection>
          <TranslatedBlock className="text-center mb-16">
            <p className="text-primary text-base font-semibold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <UserCheck className="h-5 w-5" />
              {t.clients.tagline}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground text-balance mb-6">
              {t.clients.title}
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              {t.clients.description}
            </p>
          </TranslatedBlock>
        </FadeInSection>

        {/* Testimonials */}
        <TranslatedBlock className="grid md:grid-cols-3 gap-6 mb-20">
          {t.clients.testimonials.map((testimonial, index) => (
            <FadeInSection key={index} delay={index * 100}>
              <Card className="border-border h-full">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-foreground mb-6 leading-relaxed">
                    {'"'}{testimonial.quote}{'"'}
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </TranslatedBlock>

        {/* Client Logos Marquee */}
        <FadeInSection delay={300}>
          <div className="border-t border-border pt-16">
            <p className="text-center text-muted-foreground text-sm mb-12 uppercase tracking-widest font-medium">
              {t.clients.trustText}
            </p>

            <div className="relative">
              <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                <div className="flex">
                  {clients.map((client, index) => (
                    <div
                      key={`${client}-${index}`}
                      className="flex-[0_0_auto] min-w-0"
                    >
                      <div className="flex items-center justify-center h-20 px-8 mx-4 bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl transition-all duration-300 hover:bg-secondary hover:border-primary/20 hover:shadow-lg">
                        <span className="text-foreground text-base tracking-tight whitespace-nowrap select-none">
                          {client}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gradient masks for smooth fade edges */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
