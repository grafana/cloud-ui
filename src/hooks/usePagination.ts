import { useMemo, useState } from 'react';

export function usePagination<T>(
  data: T[],
  pageSize: number
): {
  setPage: (page: number) => void;
  currentPage: number;
  pageData: T[];
  numberOfPages: number;
} {
  const [page, setPage] = useState(1);
  const numberOfPages = Math.ceil(data.length / pageSize);
  // if the page is higher than the number of pages, we set the current page to the last page
  // this happens when deleting a last item in the last page
  const currentPage = numberOfPages < page ? numberOfPages : page;
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;
  const pageData = useMemo(() => data.slice(start, end), [data, start, end]);

  return {
    setPage,
    currentPage,
    pageData,
    numberOfPages,
  };
}
