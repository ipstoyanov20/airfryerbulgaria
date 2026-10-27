export const SITE_URL = 'https://airfryer.eu';
/** Brand name used in search titles and social previews. */
export const SITE_NAME = 'AirFryer';

/** Serialises JSON-LD for a <script> tag, escaping `<` so content can't break out of it. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
