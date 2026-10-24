import type { Metadata } from 'next';
import { Onest, Unbounded } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: {
    default: 'AirFryer.bg — Фритюрници с горещ въздух',
    template: '%s · AirFryer.bg',
  },
  description:
    'Фритюрници с горещ въздух с доставка до всеки офис на Еконт. Хрупкаво, без олио, с 2 години гаранция.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${unbounded.variable} ${onest.variable} antialiased`}>
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
