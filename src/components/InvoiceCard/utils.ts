export function formatCurrency(amount: number, currency: string = 'GBP', locale: string = 'en-GB'): string {
  const currencySymbols: Record<string, string> = {
    EUR: '€',
    GBP: '£',
    USD: '$',
    JPY: '¥',
  };

  const symbol = currencySymbols[currency] || currency;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  }).format(amount).replace(symbol, `${symbol} `); 
}

