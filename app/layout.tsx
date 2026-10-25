import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const plex = IBM_Plex_Sans({
  variable: '--font-plex',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
});

const description =
  'Фритюрници с горещ въздух с доставка до всеки офис на Еконт. Хрупкаво, без олио, с 2 години гаранция.';

export const metadata: Metadata = {
  metadataBase: new URL('https://airfryer.eu'),
  title: {
    default: 'AirFryer.eu — Фритюрници с горещ въздух',
    template: '%s · AirFryer.eu',
  },
  description,
  applicationName: 'AirFryer.eu',
  openGraph: {
    type: 'website',
    siteName: 'AirFryer.eu',
    locale: 'bg_BG',
    title: 'AirFryer.eu — Фритюрници с горещ въздух',
    description,
    images: [{ url: '/images/aira-classic.jpg', width: 1024, height: 1008, alt: 'Фритюрник с горещ въздух' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${plex.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
