"use client"

import React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"

const contactIcons = [MapPin, Phone, Mail, Clock]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t, locale } = useI18n()
  const sectionId = locale === "es" ? "contacto" : "contact"

  const contactInfo = [
    { icon: MapPin, ...t.contact.info.address },
    { icon: Phone, ...t.contact.info.phone },
    { icon: Mail, ...t.contact.info.email },
    { icon: Clock, ...t.contact.info.hours },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert(t.contact.form.successMessage)
  }

  return (
    <section id={sectionId} className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <TranslatedBlock className="text-center mb-16">
          <p className="text-primary text-base font-semibold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" />
            {t.contact.tagline}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground text-balance mb-6">
            {t.contact.title}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            {t.contact.description}
          </p>
        </TranslatedBlock>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <FadeInSection direction="left" delay={200} className="lg:col-span-2">
            <TranslatedBlock className="lg:col-span-2 space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.content}</p>
                  </div>
                </div>
              ))}
            </TranslatedBlock>
          </FadeInSection>

          {/* Contact Form */}
          <FadeInSection direction="right" delay={200} className="lg:col-span-3">
            <TranslatedBlock className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.contact.form.name}</Label>
                    <Input id="name" placeholder={t.contact.form.namePlaceholder} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.contact.form.company}</Label>
                    <Input id="company" placeholder={t.contact.form.companyPlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.form.email}</Label>
                    <Input id="email" type="email" placeholder={t.contact.form.emailPlaceholder} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.contact.form.phone}</Label>
                    <Input id="phone" type="tel" placeholder={t.contact.form.phonePlaceholder} />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="service">{t.contact.form.service}</Label>
                  <select
                    id="service"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">{t.contact.form.servicePlaceholder}</option>
                    {t.contact.form.serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">{t.contact.form.message}</Label>
                  <Textarea
                    id="message"
                    placeholder={t.contact.form.messagePlaceholder}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
                </Button>
              </form>
            </TranslatedBlock>
          </FadeInSection>
        </div>
      </div>
    </section>
  )

  return (
    <section id={sectionId} className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInSection>
          <TranslatedBlock className="text-center mb-16">
            <p className="text-primary text-base font-semibold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              {t.contact.tagline}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground text-balance mb-6">
              {t.contact.title}
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              {t.contact.description}
            </p>
          </TranslatedBlock>
        </FadeInSection>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <FadeInSection direction="left" delay={100}>
            <TranslatedBlock className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.content}</p>
                  </div>
                </div>
              ))}
            </TranslatedBlock>
          </FadeInSection>

          {/* Contact Form */}
          <FadeInSection direction="right" delay={200} className="lg:col-span-3">
            <TranslatedBlock>
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.contact.form.name}</Label>
                    <Input id="name" placeholder={t.contact.form.namePlaceholder} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.contact.form.company}</Label>
                    <Input id="company" placeholder={t.contact.form.companyPlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.form.email}</Label>
                    <Input id="email" type="email" placeholder={t.contact.form.emailPlaceholder} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.contact.form.phone}</Label>
                    <Input id="phone" type="tel" placeholder={t.contact.form.phonePlaceholder} />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="service">{t.contact.form.service}</Label>
                  <select
                    id="service"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">{t.contact.form.servicePlaceholder}</option>
                    {t.contact.form.serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">{t.contact.form.message}</Label>
                  <Textarea
                    id="message"
                    placeholder={t.contact.form.messagePlaceholder}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
                </Button>
              </form>
            </TranslatedBlock>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
