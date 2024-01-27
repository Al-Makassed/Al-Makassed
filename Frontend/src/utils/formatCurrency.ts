interface FormatCurrencyOptions
  extends Omit<Intl.NumberFormatOptions, "style"> {}

export const formatCurrency = (
  amount: number,
  options: FormatCurrencyOptions = {},
): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    ...defaultOptions,
    ...options,
  });

  return formatter.format(amount);
};
