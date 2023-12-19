import { act, renderHook } from '@testing-library/react-hooks';

import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('should paginate data correctly', () => {
    const data = Array.from({ length: 101 }, (_, i) => i + 1); // [1, 2, ..., 101]
    const pageSize = 10;

    const { result } = renderHook(() => usePagination(data, pageSize));

    // Initial state
    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageData).toEqual(Array.from({ length: 10 }, (_, i) => i + 1)); // [1, 2, ..., 10]
    expect(result.current.numberOfPages).toBe(11);

    // Go to page 2
    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.pageData).toEqual(Array.from({ length: 10 }, (_, i) => i + 11)); // [11, 12, ..., 20]

    // Go to page 11
    act(() => {
      result.current.setPage(11);
    });

    expect(result.current.currentPage).toBe(11);
    expect(result.current.pageData).toEqual([101]); // 101
  });

  it('should handle empty data', () => {
    const data: any[] = [];
    const pageSize = 10;

    const { result } = renderHook(() => usePagination(data, pageSize));

    expect(result.current.currentPage).toBe(0);
    expect(result.current.pageData).toEqual([]);
    expect(result.current.numberOfPages).toBe(0);
  });
});
