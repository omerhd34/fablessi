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
  getValue: (group) => group.name,
 },
 products: {
  label: "Ürün",
  getValue: (group) => group._count.products,
 },
 status: {
  label: "Durum",
  getValue: (group) => group.isPublished,
 },
};

export function CategoryGroupsTable({ groups }) {
 const [sort, setSort] = useState({ key: null, dir: "asc" });

 const sortedGroups = useMemo(() => {
  const column = SORT_COLUMNS[sort.key];
  if (!column) return groups;

  return sortRows(groups, column.getValue, sort.dir);
 }, [groups, sort]);

 const {
  pageItems,
  page,
  totalPages,
  totalItems,
  rangeStart,
  rangeEnd,
  setPage,
  resetPage,
 } = useAdminTablePagination(sortedGroups);

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
     {pageItems.map((group) => (
      <TableRow key={group.id}>
       <TableCell className="font-medium">{group.name}</TableCell>
       <TableCell>{group._count.products}</TableCell>
       <TableCell>
        <Badge variant={group.isPublished ? "default" : "secondary"}>
         {group.isPublished ? "Yayında" : "Taslak"}
        </Badge>
       </TableCell>
       <TableCell className="text-right">
        <div className="inline-flex items-center justify-end gap-2">
         <DeleteButton
          href={`/api/admin/category-groups/${group.id}`}
          confirmTitle="Kategori grubunu sil?"
          confirmDescription="Bu gruba bağlı ürünlerin kategori bilgisi kaldırılır."
          size="icon-sm"
         />
         <EditButton href={`/admin/categories/${group.id}`} />
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
