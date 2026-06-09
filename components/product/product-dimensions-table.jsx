"use client";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { getDimensionItems, getPriceItemLabel } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function formatValue(value) {
 if (value == null) return "—";
 return String(value);
}

export function ProductDimensionsTable({ product, t, className }) {
 const items = getDimensionItems(product);

 if (items.length === 0) return null;

 const hasPieceNames = items.some((item) => item.name);

 return (
  <div
   className={cn(
    "overflow-hidden rounded-xl border border-charcoal/10 bg-cream/20",
    className
   )}
  >
  <Table className="text-xs text-charcoal/75">
   <TableHeader>
    <TableRow className="border-charcoal/10 hover:bg-transparent">
     {hasPieceNames ? (
      <TableHead className="h-8 px-2 font-semibold text-charcoal/55">
       {t("product.dimensionPiece")}
      </TableHead>
     ) : null}
     <TableHead className="h-8 px-2 text-center font-semibold text-charcoal/55">
      {t("product.width")}
     </TableHead>
     <TableHead className="h-8 px-2 text-center font-semibold text-charcoal/55">
      {t("product.depth")}
     </TableHead>
     <TableHead className="h-8 px-2 text-center font-semibold text-charcoal/55">
      {t("product.height")}
     </TableHead>
    </TableRow>
   </TableHeader>
   <TableBody>
    {items.map((item, index) => (
     <TableRow
      key={item.name ?? `dimension-${index}`}
      className="border-charcoal/8 hover:bg-charcoal/2"
     >
      {hasPieceNames ? (
       <TableCell className="px-2 py-2 font-medium text-charcoal/80">
        {getPriceItemLabel(item) ?? item.name ?? "—"}
       </TableCell>
      ) : null}
      <TableCell className="px-2 py-2 text-center tabular-nums">
       {formatValue(item.widthCm)}
      </TableCell>
      <TableCell className="px-2 py-2 text-center tabular-nums">
       {formatValue(item.depthCm)}
      </TableCell>
      <TableCell className="px-2 py-2 text-center tabular-nums">
       {formatValue(item.heightCm)}
      </TableCell>
     </TableRow>
    ))}
   </TableBody>
  </Table>
  </div>
 );
}
