import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const plex = IBM_Plex_Sans({
  variable: '--font-plex',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
});

const title = `Air Fryer (еърфрайър) — фритюрници с горещ въздух | ${SITE_NAME}`;
const description =
  'Air fryer фритюрници с горещ въздух от 3.5 до 12 л. Хрупкаво с до 80% по-малко мазнина. Доставка с Еконт за 1–2 дни, 2 години гаранция, 30 дни връщане.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  keywords: ['air fryer', 'airfryer', 'еърфрайър', 'ейр фрайър', 'фритюрник с горещ въздух', 'фритюрник без олио', 'air fryer цена'],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'bg_BG',
    title,
    description,
    images: [{ url: '/images/aira-classic.jpg', width: 1024, height: 1008, alt: 'Air fryer — фритюрник с горещ въздух' }],
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
