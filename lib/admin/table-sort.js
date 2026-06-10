export function compareValues(a, b) {
 if (typeof a === "number" && typeof b === "number") {
  return a - b;
 }

 if (typeof a === "boolean" && typeof b === "boolean") {
  return Number(a) - Number(b);
 }

 return String(a ?? "").localeCompare(String(b ?? ""), "tr", {
  sensitivity: "base",
  numeric: true,
 });
}

export function sortRows(rows, getValue, direction = "asc") {
 const list = [...rows];
 const factor = direction === "desc" ? -1 : 1;

 list.sort((a, b) => factor * compareValues(getValue(a), getValue(b)));
 return list;
}
