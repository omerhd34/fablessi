"use client";

import { useMemo, useState } from "react";
import { ADMIN_TABLE_PAGE_SIZE, paginateItems } from "@/lib/admin/table-pagination";

export function useAdminTablePagination(items, pageSize = ADMIN_TABLE_PAGE_SIZE) {
 const [page, setPage] = useState(1);

 const pagination = useMemo(
  () => paginateItems(items, page, pageSize),
  [items, page, pageSize]
 );

 return {
  pageItems: pagination.items,
  page: pagination.page,
  totalPages: pagination.totalPages,
  totalItems: pagination.totalItems,
  rangeStart: pagination.rangeStart,
  rangeEnd: pagination.rangeEnd,
  setPage,
  resetPage: () => setPage(1),
 };
}
