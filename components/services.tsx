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
  Headphones 
} from "lucide-react"
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
    <section id={sectionId} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInSection>
          <TranslatedBlock className="text-center mb-16">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {t.services.tagline}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground text-balance mb-6">
              {t.services.title1}
              <br />
              {t.services.title2}
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              {t.services.description}
            </p>
          </TranslatedBlock>
        </FadeInSection>

        {/* Service Categories */}
        <TranslatedBlock className="space-y-12">
          {t.services.categories.map((category, catIndex) => (
            <FadeInSection key={catIndex} delay={catIndex * 150}>
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className={`w-2 h-8 rounded-full ${catIndex === 0 ? 'bg-blue-500' : catIndex === 1 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                {category.title}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => {
                  const IconComponent = categoryIcons[catIndex][itemIndex]
                  return (
                    <Card key={itemIndex} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-lg ${categoryColors[catIndex]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </FadeInSection>
          ))}
        </TranslatedBlock>
      </div>
    </section>
  )
}
