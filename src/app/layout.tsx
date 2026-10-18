import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components/layout';
import { LanguageProvider } from '@/i18n';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildGovernmentOrganizationSchema } from '@/lib/jsonld';
import { SITE_CONFIG } from '@/config/site';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    template: '%s | BetterMarawi.org',
    default: 'BetterMarawi.org — Islamic City of Marawi Citizen Services & Transparency Portal',
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: 'BetterMarawi.org — Islamic City of Marawi Citizen Services & Transparency Portal',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'en_PH',
    type: 'website',
    images: [
      {
        url: '/branding/logo.png',
        width: 1200,
        height: 630,
        alt: 'BetterMarawi.org',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BetterMarawi.org — Islamic City of Marawi Citizen Services & Transparency Portal',
    description: SITE_CONFIG.description,
    images: ['/branding/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/branding/logo.svg',
    shortcut: '/branding/logo.svg',
    apple: '/branding/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <JsonLd data={buildGovernmentOrganizationSchema()} />
        </LanguageProvider>
      </body>
    </html>
  );
}

