"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollProps<T extends { id: string }> {
  initialItems: T[];
  loadMore: (page: number) => Promise<T[]>;
}

interface UseInfiniteScrollReturn<T extends { id: string }> {
  items: T[];
  loading: boolean;
  hasMore: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useInfiniteScroll<T extends { id: string }>({
  initialItems,
  loadMore,
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadMoreItems = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const nextPage = page + 1;
      const newItems = await loadMore(nextPage);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more items:", error);
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore, page, loadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && !loadingRef.current && hasMore) {
        loadMoreItems();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loadMoreItems, hasMore]);

  // reset
  useEffect(() => {
    setItems(initialItems);
    setPage(1);
    setHasMore(true);
    loadingRef.current = false;
  }, [initialItems]);

  return {
    items,
    loading,
    hasMore,
    containerRef,
  };
}
