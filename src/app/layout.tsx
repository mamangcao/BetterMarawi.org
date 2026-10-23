import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header, Footer, InstallPrompt } from '@/components/layout';
import { LanguageProvider } from '@/i18n';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildGovernmentOrganizationSchema } from '@/lib/jsonld';
import { SITE_CONFIG } from '@/config/site';

export const viewport: Viewport = {
  themeColor: '#1B4D3E',
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
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
  // No canonical, og:url, or robots here: they would be inherited by pages without their own
  // metadata (the 404 page), pointing them at the home page. Each page sets them via buildMetadata.
  // Installed app on iPhone/iPad (Add to Home Screen)
  appleWebApp: {
    capable: true,
    title: 'BetterMarawi',
    statusBarStyle: 'default',
  },
  openGraph: {
    title: 'BetterMarawi.org — Islamic City of Marawi Citizen Services & Transparency Portal',
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    locale: 'en_PH',
    type: 'website',
    // Share image: src/app/opengraph-image.png, picked up by Next.js here; pages set it via buildMetadata
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BetterMarawi.org — Islamic City of Marawi Citizen Services & Transparency Portal',
    description: SITE_CONFIG.description,
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
          <InstallPrompt />
          <JsonLd data={buildGovernmentOrganizationSchema()} />
        </LanguageProvider>
      </body>
    </html>
  );
}

