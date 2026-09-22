import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });

const SITE_URL = 'https://www.wmaritimes.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ship Chandler Venezuela | World Maritime Services',
    template: '%s | World Maritime Services',
  },
  description:
    'Guaranteed ship supply for international fleets in Venezuelan ports. Provisions, technical supplies and MARPOL-compliant port services in Maracaibo. 24/7 coverage.',
  keywords: [
    'ship chandler Venezuela',
    'Venezuela ship supply',
    'Maracaibo port chandler',
    'maritime provisions Venezuela',
    'ship supply Lake Maracaibo',
    'port services Venezuela',
    'MARPOL compliance Venezuela',
  ],
  authors: [{ name: 'World Maritime Services' }],
  creator: 'World Maritime Services',
  publisher: 'World Maritime Services',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': SITE_URL,
      'es': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'World Maritime Services',
    title: 'Ship Chandler Venezuela | World Maritime Services',
    description:
      'Guaranteed ship supply for international fleets in Venezuelan ports. Provisions, technical supplies and port services in Maracaibo. 24/7 coverage.',
    url: SITE_URL,
    locale: 'en_US',
    alternateLocale: ['es_VE'],
    images: [
      {
        url: '/hero/hero-ship-1.jpg',
        width: 1200,
        height: 630,
        alt: 'World Maritime Services — ship supply operations in Venezuelan ports',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ship Chandler Venezuela | World Maritime Services',
    description:
      'Guaranteed ship supply for international fleets in Venezuelan ports. 24/7 coverage in Maracaibo.',
    images: ['/hero/hero-ship-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Maritime Services',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: 'World Maritime Services',
  alternateName: 'WMS',
  description:
    'Ship chandler and maritime services provider operating in Venezuelan ports. Provisions, technical supplies, port services and emergency response for international fleets.',
  url: SITE_URL,
  telephone: ['+58-424-6258080', '+58-424-6424802'],
  email: 'info@wmaritimes.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4th Ave. Bella Vista, 67th Street, General de Seguros Building, 4th Floor',
    addressLocality: 'Maracaibo',
    addressRegion: 'Zulia',
    addressCountry: 'VE',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  areaServed: [
    { '@type': 'Place', name: 'Lake Maracaibo' },
    { '@type': 'Place', name: 'La Salina' },
    { '@type': 'Place', name: 'Bajo Grande' },
    { '@type': 'Country', name: 'Venezuela' },
  ],
  sameAs: [
    'https://www.instagram.com/wmaritimes',
    'https://www.linkedin.com/company/world-maritime-services/',
    'https://www.facebook.com/people/World-Maritime-Services/61590241078295/',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Maritime Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Provisions & General Supplies',
          description:
            'Fresh, frozen and dry provisions, cabin stores, bonded goods and potable water delivered to vessel.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Technical Supplies & Consumables',
          description:
            'Lubricants, filters, spare parts, deck hardware and engine room consumables delivered to berth.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Port Services',
          description:
            'Garbage reception and disposal, fumigation and ship cleaning with full documentation.',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
