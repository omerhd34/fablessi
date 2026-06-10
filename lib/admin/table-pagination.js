export const ADMIN_TABLE_PAGE_SIZE = 10;

export function paginateItems(items, page, pageSize = ADMIN_TABLE_PAGE_SIZE) {
 const totalItems = items.length;
 const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
 const safePage = Math.min(Math.max(page, 1), totalPages);
 const start = (safePage - 1) * pageSize;

 return {
  items: items.slice(start, start + pageSize),
  page: safePage,
  totalPages,
  totalItems,
  pageSize,
  rangeStart: totalItems === 0 ? 0 : start + 1,
  rangeEnd: Math.min(start + pageSize, totalItems),
 };
}
