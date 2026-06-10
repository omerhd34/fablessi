export const catalogColorSwatches = {
 Antrasit: "#4a4f54",
 Cappuccino: "#c8a882",
 Gri: "#9aa0a6",
 Beyaz: "#f5f5f3",
 Kum: "#d4c4a8",
 Mavi: "#5a7d9a",
 Kahverengi: "#8b6f47",
};

export const catalogColorOrder = [
 "Antrasit",
 "Cappuccino",
 "Gri",
 "Beyaz",
 "Kum",
 "Mavi",
 "Kahverengi",
];

import { isCssColorValue } from "@/lib/color-value";

export function getColorLabel(color, t) {
 if (!color) return "";
 if (isCssColorValue(color)) return "";

 const translated = t(`colors.${color}`);
 return translated === `colors.${color}` ? color : translated;
}
