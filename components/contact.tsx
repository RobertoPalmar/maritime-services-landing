"use client"

import React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"
import { FadeInSection } from "@/components/fade-in-section"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const contactIcons = [MapPin, Phone, Mail, Clock]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
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

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("https://formspree.io/f/meeljzoq", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setShowSuccessDialog(true)
          ; (e.target as HTMLFormElement).reset()
      } else {
        setShowErrorDialog(true)
      }
    } catch (error) {
      setShowErrorDialog(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id={sectionId} className="py-24 lg:py-32 bg-secondary overflow-hidden">
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
                    <Input id="name" name="name" placeholder={t.contact.form.namePlaceholder} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.contact.form.company}</Label>
                    <Input id="company" name="company" placeholder={t.contact.form.companyPlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.form.email}</Label>
                    <Input id="email" name="email" type="email" placeholder={t.contact.form.emailPlaceholder} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.contact.form.phone}</Label>
                    <Input id="phone" name="phone" type="tel" placeholder={t.contact.form.phonePlaceholder} />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="service">{t.contact.form.service}</Label>
                  <select
                    id="service"
                    name="service"
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
                    name="message"
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

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {t.contact.form.successMessage}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg py-4">
              Su mensaje ha sido enviado satisfactoriamente. Nuestro equipo se pondrá en contacto con usted a la brevedad posible.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowSuccessDialog(false)} size="lg" className="w-full sm:w-auto px-12">
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-md text-center border-destructive/20 shadow-destructive/5">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-destructive" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              ¡Ups! Algo salió mal
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg py-4">
              Hubo un error al intentar enviar su mensaje. Por favor, verifique su conexión e intente nuevamente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowErrorDialog(false)} variant="destructive" size="lg" className="w-full sm:w-auto px-12">
              Reintentar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
