"use client"

import Link from "next/link"
import { Anchor, Facebook, Instagram, Linkedin } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { TranslatedBlock } from "@/components/translated-text"

const socialIcons: Record<string, typeof Instagram> = {
  Instagram,
  LinkedIn: Linkedin,
  Facebook,
}

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TranslatedBlock className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Anchor className="h-8 w-8" />
              <span className="text-lg font-semibold">World Maritime Services</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.servicesTitle}</h4>
            <ul className="space-y-3">
              {t.footer.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.companyTitle}</h4>
            <ul className="space-y-3">
              {t.footer.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.followTitle}</h4>
            <ul className="space-y-3">
              {t.footer.social.map((link) => {
                const Icon = socialIcons[link.label]
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.label} — ${link.handle}`}
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors inline-flex items-center gap-2"
                    >
                      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                      {link.handle}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

        </TranslatedBlock>

        {/* Bottom */}
        <TranslatedBlock className="pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} World Maritime Services. {t.footer.copyright}
          </p>
        </TranslatedBlock>
      </div>
    </footer>
  )
}
