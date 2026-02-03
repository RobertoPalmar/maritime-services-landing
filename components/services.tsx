"use client"

import {
  UtensilsCrossed,
  Bed,
  Droplets,
  Wrench,
  Cog,
  Truck,
  Sparkles,
  Trash2,
  Headphones,
  Ship
} from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"

const categoryIcons = [
  [UtensilsCrossed, Bed, Droplets],
  [Wrench, Cog, Truck],
  [Sparkles, Trash2, Headphones],
]

const categoryColors = [
  "bg-blue-500/10 text-blue-600",
  "bg-amber-500/10 text-amber-600",
  "bg-emerald-500/10 text-emerald-600",
]

export function Services() {
  const { t, locale } = useI18n()
  const sectionId = locale === "es" ? "servicios" : "services"

  return (
    <section id={sectionId} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInSection>
          <TranslatedBlock className="text-center mb-8">
            <p className="text-primary text-base font-semibold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <Ship className="h-5 w-5" />
              {t.services.tagline}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground text-balance mb-6">
              {t.services.title1}
              <br />
              {t.services.title2}
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              {t.services.description}
            </p>
          </TranslatedBlock>
        </FadeInSection>

        {/* Alternating Service Blocks */}
        <TranslatedBlock className="space-y-12 lg:space-y-16">
          {t.services.categories.map((category, catIndex) => {
            const isImageRight = catIndex % 2 === 0
            const accentColor = catIndex === 0 ? 'text-blue-500' : catIndex === 1 ? 'text-amber-500' : 'text-emerald-500'
            const bgAccent = catIndex === 0 ? 'bg-blue-500/10' : catIndex === 1 ? 'bg-amber-500/10' : 'bg-emerald-500/10'
            const shipImage = catIndex === 0 ? "/services/service-supplies-4.jpg" : catIndex === 1 ? "/services/service-supplies-6.jpg" : "/services/service-supplies-5.jpg"

            return (
              <div key={catIndex} className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center py-4">
                {/* Content Column */}
                <FadeInSection
                  className={`lg:col-span-6 ${!isImageRight ? "lg:order-2" : ""}`}
                  direction={isImageRight ? "left" : "right"}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${bgAccent} flex items-center justify-center`}>
                        <Ship className={`h-7 w-7 ${accentColor}`} />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                        {category.title}
                      </h3>
                    </div>

                    <div className="grid gap-4">
                      {category.items.map((item, itemIndex) => {
                        const IconItem = categoryIcons[catIndex][itemIndex]
                        return (
                          <Card key={itemIndex} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-shadow">
                            <CardContent className="px-3.5 flex gap-4">
                              <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${bgAccent} flex items-center justify-center`}>
                                <IconItem className={`h-5 w-5 ${accentColor}`} />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-foreground mb-1">{item.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                </FadeInSection>

                {/* Image Column */}
                <FadeInSection
                  className={`lg:col-span-6 h-full ${!isImageRight ? "lg:order-1" : ""}`}
                  direction={isImageRight ? "right" : "left"}
                >
                  <div className="relative h-full aspect-video lg:aspect-auto rounded-3xl overflow-hidden shadow-2xl group lg:min-h-[300px]">
                    <Image
                      src={shipImage}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />

                    {/* Decorative Elements */}
                    <div className="absolute top-6 left-6">
                      <div className="px-4 py-2 rounded-full bg-background/90 backdrop-blur-md text-foreground text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${catIndex === 0 ? 'bg-blue-500' : catIndex === 1 ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
                        {(category as any).imageLabel}
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            )
          })}
        </TranslatedBlock>
      </div>
    </section>
  )
}
