// Formateur d'euros selon la langue : "9 €" en français, "€9" en anglais.
// options permet d'ajuster les décimales, par exemple { maximumFractionDigits: 0 }.
export const euros = (locale: string, options: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", ...options });

// Un prix rond s'affiche sans centimes ("9 €"), un prix avec centimes en garde deux ("7,20 €").
export const centimesSiBesoin = (v: number) => ({ minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });
