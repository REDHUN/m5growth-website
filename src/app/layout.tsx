import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://m5digitalgrowth.com';

export const viewport: Viewport = {
  themeColor: '#00C16A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'M5 Digital Growth — Digital Marketing & Performance Agency in Kerala',
    template: '%s | M5 Digital Growth',
  },
  description:
    'M5 Digital Growth is a full-stack digital marketing agency in Kerala, India. We engineer compounding growth with Performance Marketing, SEO, Google & Meta Ads, Web Development, and Social Strategy.',
  keywords: [
    'Digital Marketing Agency in Kerala',
    'Digital Marketing Agency Kochi',
    'Digital Marketing Agency Calicut',
    'SEO Agency Kerala',
    'Performance Marketing Agency India',
    'Social Media Marketing Kerala',
    'Google Ads Agency Kerala',
    'Website Development Kerala',
    'E-commerce Growth Agency Kerala',
    'Local SEO Kerala',
    'Meta Ads Specialist India',
    'M5 Digital Growth',
  ],
  authors: [{ name: 'M5 Digital Growth', url: siteUrl }],
  creator: 'M5 Digital Growth',
  publisher: 'M5 Digital Growth',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'M5 Digital Growth — Digital Marketing Agency in Kerala',
    description:
      'Performance marketing, search authority, conversion websites, and social branding engineered for ambitious businesses in Kerala, India & worldwide.',
    siteName: 'M5 Digital Growth',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'M5 Digital Growth — Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M5 Digital Growth — Digital Marketing Agency in Kerala',
    description:
      'We engineer growth that refuses to plateau. Performance marketing, SEO, and web craft from Kerala, India.',
    images: ['/logo.png'],
    creator: '@m5digitalgrowth',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: ReadEventProps<{ children: React.ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${siteUrl}/#organization`,
        name: 'M5 Digital Growth',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/logo.png`,
        description:
          'Full-stack digital marketing and performance agency in Kerala, India engineering compounding growth for businesses and startups.',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '9.9312',
          longitude: '76.2673',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Kerala' },
          { '@type': 'Country', name: 'India' },
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'Global' },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@m5digitalgrowth.com',
          contactType: 'customer inquiry',
        },
        sameAs: [
          'https://linkedin.com/company/m5digitalgrowth',
          'https://www.instagram.com/m5_growth',
          'https://x.com/m5digitalgrowth',
          'https://dribbble.com/m5digitalgrowth',
        ],
        knowsAbout: [
          'Digital Marketing Strategy',
          'Performance Marketing & Paid Ads',
          'Search Engine Optimization (SEO)',
          'Local Business Marketing',
          'Social Media & Creator Marketing',
          'Conversion Rate Optimization (CRO)',
          'Web Design and Next.js Development',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'M5 Digital Growth',
        description: 'Engineering growth that refuses to plateau.',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#services`,
        name: 'M5 Digital Growth Core Services',
        itemListElement: [
          {
            '@type': 'Service',
            position: 1,
            name: 'Brand Strategy',
            description:
              'Positioning, architecture and voice that give every downstream click a reason to convert.',
            provider: { '@id': `${siteUrl}/#organization` },
          },
          {
            '@type': 'Service',
            position: 2,
            name: 'Performance Marketing',
            description:
              'Full-funnel paid media across Meta, Google, and TikTok with weekly creative testing and daily budget optimization.',
            provider: { '@id': `${siteUrl}/#organization` },
          },
          {
            '@type': 'Service',
            position: 3,
            name: 'SEO & Content',
            description:
              'Technical foundations, editorial that earns links, and compounding organic search engines.',
            provider: { '@id': `${siteUrl}/#organization` },
          },
          {
            '@type': 'Service',
            position: 4,
            name: 'Social & Creators',
            description:
              'Always-on social programs and creator campaigns that feel native to the feed while driving performance.',
            provider: { '@id': `${siteUrl}/#organization` },
          },
          {
            '@type': 'Service',
            position: 5,
            name: 'Web & Motion',
            description:
              'High-converting, accessible web experiences and motion design engineered in-house.',
            provider: { '@id': `${siteUrl}/#organization` },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

type ReadEventProps<T> = T;
