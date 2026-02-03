import { Check, Users, MapPin, Settings, ShieldCheck, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"
import Image from "next/image"

export function About() {
  const { t, locale } = useI18n()
  const sectionId = locale === "es" ? "nosotros" : "about"

  return (
    <section id={sectionId} className="py-24 lg:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content & Stats */}
          <FadeInSection direction="left">
            <TranslatedBlock>
              <p className="text-primary-foreground/90 text-base font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t.about.tagline}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-primary-foreground text-balance mb-6">
                {t.about.title}
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
                {t.about.description}
              </p>

              {/* Key Stats Cards - Brighter/Clearer */}
              <div className="grid sm:grid-cols-2 gap-6">
                {t.about.stats.map((stat, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/30 group hover:bg-white/25 transition-all duration-300">
                    <div className="text-4xl lg:text-5xl font-sans font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-white/90 font-semibold text-sm uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </TranslatedBlock>
          </FadeInSection>

          {/* Image & Featured Tips */}
          <FadeInSection direction="right" delay={200}>
            <div className="relative">
              {/* Image - More solid/vibrant */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-8 group ring-1 ring-white/20">
                <Image
                  src="/hero/hero-ship-5.jpg"
                  alt="Maritime Operations"
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* 4 Key Tips Section */}
              <div className="grid sm:grid-cols-2 gap-6">
                {t.whyUs.features.map((feature, index) => {
                  const icons = [MapPin, Settings, ShieldCheck, Clock]
                  const Icon = icons[index]
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 border border-white/10 shadow-sm">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white leading-tight text-sm sm:text-base">
                          {feature.title}
                        </h4>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
