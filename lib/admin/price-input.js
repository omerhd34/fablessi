export const MAX_TURKISH_AMOUNT_INPUT_LENGTH = 15;

function buildFormattedAmount(integerPart, decimalPart, hasDecimalSeparator) {
 if (!integerPart && !decimalPart) return "";

 const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

 if (hasDecimalSeparator) {
  return decimalPart
   ? `${formattedInteger},${decimalPart}`
   : `${formattedInteger},`;
 }

 return formattedInteger;
}

export function parseTurkishAmount(value) {
 if (value == null || value === "") return null;

 const normalized = String(value).trim().replace(/\./g, "").replace(",", ".");
 if (!normalized) return null;

 const amount = Number(normalized);
 return Number.isFinite(amount) ? amount : null;
}

export function formatTurkishAmountInput(
 value,
 maxLength = MAX_TURKISH_AMOUNT_INPUT_LENGTH
) {
 if (value == null || value === "") return "";

 const raw = String(value);
 const hasDecimalSeparator = raw.includes(",");
 const [integerRaw = "", decimalRaw = ""] = raw.replace(/\./g, "").split(",");
 let integerPart = integerRaw.replace(/\D/g, "");
 let decimalPart = decimalRaw.replace(/\D/g, "").slice(0, 2);

 if (!integerPart && !decimalPart) return "";

 let formatted = buildFormattedAmount(integerPart, decimalPart, hasDecimalSeparator);

 while (formatted.length > maxLength) {
  if (decimalPart.length > 0) {
   decimalPart = decimalPart.slice(0, -1);
  } else if (integerPart.length > 0) {
   integerPart = integerPart.slice(0, -1);
  } else {
   return "";
  }

  formatted = buildFormattedAmount(integerPart, decimalPart, hasDecimalSeparator);
 }

 return formatted;
}
