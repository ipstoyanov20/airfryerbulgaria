/**
 * Econt config. Env names match the peptides project so its .env values carry over.
 * Without ECONT_PRIVATE_KEY we fall back to Econt's public demo environment
 * (demo creds only work against demo.econt.com, never production).
 */
const DEMO_URL = 'https://demo.econt.com/ee/services/Shipments/LabelService.createLabel.json';
const PROD_URL = 'https://ee.econt.com/services/Shipments/LabelService.createLabel.json';
const DEMO_AUTH = 'Basic ' + Buffer.from('iasp-dev:1Asp-dev').toString('base64');

export const econtConfig = {
  apiUrl: process.env.ECONT_API_URL || (process.env.ECONT_PRIVATE_KEY ? PROD_URL : DEMO_URL),
  auth: process.env.ECONT_PRIVATE_KEY || DEMO_AUTH,
  shopId: process.env.NEXT_PUBLIC_ECONT_SHOP_ID || '',
  currency: process.env.ECONT_CURRENCY || 'EUR',
  sender: {
    name: process.env.ECONT_SENDER_NAME || 'AirFryer Bulgaria',
    phone: process.env.ECONT_SENDER_PHONE || '+359000000000',
    city: process.env.ECONT_SENDER_CITY || 'София',
    postCode: process.env.ECONT_SENDER_POSTCODE || '1000',
    street: process.env.ECONT_SENDER_STREET || '',
    num: process.env.ECONT_SENDER_NUM || '',
  },
};
