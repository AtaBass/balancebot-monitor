import { tr } from './tr';
/** Add an English catalog with this shape, then extend Locale. Identifiers stay language-neutral. */
export type TranslationCatalog = {
  [K in keyof typeof tr]: Widen<(typeof tr)[K]>;
};
type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };
export type Locale = 'tr';
const catalogs: Record<Locale, TranslationCatalog> = { tr };
export const strings = catalogs.tr;
export const formatNumber = (value: number, digits = 1) =>
  new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
