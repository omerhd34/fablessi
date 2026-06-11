"use client";

import { useMemo, useState } from "react";
import { AdminTablePagination } from "@/components/admin/admin-table-pagination";
import { DeleteButton } from "@/components/admin/delete-button";
import { EditButton } from "@/components/admin/edit-button";
import { SortableTableHead } from "@/components/admin/sortable-table-head";
import { sortRows } from "@/lib/admin/table-sort";
import { useAdminTablePagination } from "@/lib/admin/use-admin-table-pagination";
import { Badge } from "@/components/ui/badge";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";

const SORT_COLUMNS = {
 name: {
  label: "Ad",
  getValue: (collection) => collection.name,
 },
 products: {
  label: "Ürün",
  getValue: (collection) => collection._count.products,
 },
 status: {
  label: "Durum",
  getValue: (collection) => collection.isPublished,
 },
};

export function CollectionsTable({ collections }) {
 const [sort, setSort] = useState({ key: null, dir: "asc" });

 const sortedCollections = useMemo(() => {
  const column = SORT_COLUMNS[sort.key];
  if (!column) return collections;

  return sortRows(collections, column.getValue, sort.dir);
 }, [collections, sort]);

 const {
  pageItems,
  page,
  totalPages,
  totalItems,
  rangeStart,
  rangeEnd,
  setPage,
  resetPage,
 } = useAdminTablePagination(sortedCollections);

 function handleSort(key) {
  resetPage();
  setSort((current) =>
   current.key === key
    ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
    : { key, dir: "asc" }
  );
 }

 return (
  <div>
   <Table>
    <TableHeader>
     <TableRow>
      {Object.entries(SORT_COLUMNS).map(([key, column]) => (
       <TableHead key={key}>
        <SortableTableHead
         label={column.label}
         columnKey={key}
         sortKey={sort.key}
         sortDir={sort.dir}
         onSort={handleSort}
        />
       </TableHead>
      ))}
      <TableHead className="text-right">İşlem</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {pageItems.map((collection) => (
      <TableRow key={collection.id}>
       <TableCell className="font-medium">{collection.name}</TableCell>
       <TableCell>{collection._count.products}</TableCell>
       <TableCell>
        <Badge variant={collection.isPublished ? "default" : "secondary"}>
         {collection.isPublished ? "Yayında" : "Taslak"}
        </Badge>
       </TableCell>
       <TableCell className="text-right">
        <div className="inline-flex items-center justify-end gap-2">
         <DeleteButton
          href={`/api/admin/collections/${collection.id}`}
          confirmTitle="Koleksiyonu sil?"
          confirmDescription="Koleksiyona bağlı tüm ürünler de silinir."
          size="icon-sm"
         />
         <EditButton href={`/admin/collections/${collection.id}`} />
        </div>
       </TableCell>
      </TableRow>
     ))}
    </TableBody>
   </Table>

   <AdminTablePagination
    page={page}
    totalPages={totalPages}
    totalItems={totalItems}
    rangeStart={rangeStart}
    rangeEnd={rangeEnd}
    onPageChange={setPage}
   />
  </div>
 );
}
