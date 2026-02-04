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

const provisionImages = [
  { src: "/services/service-1/provisions.jpg", name: "Provisions" },
  { src: "/services/service-1/beef.jpg", name: "Beef" },
  { src: "/services/service-1/processed meat.jpg", name: "Processed Meat" },
  { src: "/services/service-1/cabin stores.jpg", name: "Cabin Stores" },
  { src: "/services/service-1/deck & engine stores.jpg", name: "Deck & Engine Stores" },
  { src: "/services/service-1/bonded & welfare.jpg", name: "Bonded & Welfare" },
]

const technicalImages = [
  { src: "/services/service-3/spare part.jpg", name: "Spare Parts" },
  { src: "/services/service-3/lubricants oils,.jpg", name: "Lubricants & Oils" },
]

const portServicesImages = [
  { src: "/services/service-2/ship cleaning.jpg", name: "Ship Cleaning" },
  { src: "/services/service-2/garbage disposal.jpg", name: "Garbage Disposal" },
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

                {/* Image Column / Grid Column */}
                <FadeInSection
                  className={`lg:col-span-6 h-full ${!isImageRight ? "lg:order-1" : ""}`}
                  direction={isImageRight ? "right" : "left"}
                >
                  {catIndex === 0 ? (
                    /* 3x2 Grid for first category */
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-full min-h-[400px] lg:min-h-[500px]">
                      {provisionImages.map((img, i) => (
                        <div key={i} className="relative group overflow-hidden rounded-2xl shadow-lg border border-border/50 h-full">
                          <Image
                            src={img.src}
                            alt={img.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white text-[10px] sm:text-sm font-bold uppercase tracking-wider line-clamp-2">
                              {img.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* 2x1 Grid for other categories */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full min-h-[200px] lg:min-h-[400px]">
                      {(catIndex === 1 ? technicalImages : portServicesImages).map((img, i) => (
                        <div key={i} className="relative group overflow-hidden rounded-2xl shadow-lg border border-border/50 h-full aspect-[16/7] sm:aspect-auto">
                          <Image
                            src={img.src}
                            alt={img.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white text-sm font-bold uppercase tracking-wider">
                              {img.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FadeInSection>
              </div>
            )
          })}
        </TranslatedBlock>
      </div>
    </section>
  )
}
