"use client"

import { I18nProvider } from "@/lib/i18n-context"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ImageCarousel } from "@/components/image-carousel"
import { Services } from "@/components/services"
import { WhyUs } from "@/components/why-us"
import { About } from "@/components/about"
import { Clients } from "@/components/clients"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <I18nProvider>
      <Header />
      <main>
        <Hero />
        <ImageCarousel />
        <Services />
        <WhyUs />
        <About />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  )
}
