"use client"

import * as React from "react"
import { Quote, UserCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import Image from "next/image"

const clients = [
  { name: "SCF Group", logo: "/clients/SCF GROUP.png" },
  { name: "NYNAS AB", logo: "/clients/Nynas AB.png" },
  { name: "Nordic American Tankers", logo: "/clients/Nordic American Tankers.svg" },
  { name: "SFL Corporation Ltd.", logo: "/clients/SFL Corporation Ltd.png" },
  { name: "The Great Eastern Shipping Co.", logo: "/clients/The Great Eastern Shipping Co.png" },
  { name: "Minerva Marine Inc", logo: "/clients/Minerva Marine.png" },
  { name: "Hellenic Tankers Ltd", logo: "/clients/Hellenic Tankers Ltd.jpg" },
  { name: "Teekay Shipping Corp.", logo: "/clients/Teekay.png" },
  { name: "Maran Tankers", logo: "/clients/Maran Tanker.png" },
  { name: "Euronav Ship Management", logo: "/clients/EuroNav.png" },
  { name: "Swiss Carriers SA", logo: "/clients/Swiss Carriers.png" },
  { name: "Wah Kwong Maritime", logo: "/clients/Wah Kwong Maritime.jpg" },
  { name: "OSMThome Tankers", logo: "/clients/OSMThome Tankers.jpg" },
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

        {/* Client Logos Marquee */}
        <FadeInSection delay={300}>
          <div>
            <div className="relative">
              <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                <div className="flex">
                  {clients.map((client, index) => (
                    <div
                      key={`${client.name}-${index}`}
                      className="flex-[0_0_auto] min-w-0"
                    >
                      <div className="flex flex-col items-center justify-center gap-3 h-36 px-8 mx-4 bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-xl transition-all duration-300 hover:bg-secondary/50 hover:border-primary/20 hover:shadow-lg group">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={client.logo}
                            alt={client.name}
                            fill
                            className="object-contain grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          />
                        </div>
                        <span className="text-muted-foreground group-hover:text-foreground text-xs font-semibold tracking-tight whitespace-nowrap select-none transition-colors text-center max-w-[150px] truncate">
                          {client.name}
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
