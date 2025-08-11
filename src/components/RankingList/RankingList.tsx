"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { transformComicToRankingItem } from "@/utils/apiUtils";
import {
  RankingItem,
  ComicRankApiResponse,
  MAX_PAGES,
  FilterState,
  RankingListComponentProps,
  FilterChangeHandler,
} from "./types";
import {
  RankingContainer,
  RankingHeader,
  RankingTitle,
  FilterButtons,
  FilterButton,
  RankingList,
  RankingItemContainer,
  RankColumn,
  RankNumber,
  RankChangeIndicator,
  ItemImage,
  ItemContent,
  ItemTitle,
  ItemMeta,
  ItemAuthor,
  ItemGenre,
  SerialInfo,
  LoadingContainer,
  LoadingSpinner,
  EmptyMessage,
  ScrollContainer,
} from "./styles";

export default function RankingListComponent({
  genre,
  initialItems = [],
  onLoadMore,
  title = "로맨스 장르 랭킹",
}: RankingListComponentProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    freeEpisodes: false,
  });

  const handleFilterChange: FilterChangeHandler = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // 필터링된 아이템들
  const getFilteredItems = (items: RankingItem[]): RankingItem[] => {
    return items.filter((item) => {
      // 연재 상태 필터
      if (filters.status === "ongoing" && !item.isOngoing) return false;
      if (filters.status === "completed" && item.isOngoing) return false;

      // 무료회차 3개 이상 필터
      if (filters.freeEpisodes && item.freedEpisodeSize < 3) return false;

      return true;
    });
  };

  const defaultLoadMore = async (page: number): Promise<RankingItem[]> => {
    try {
      if (page > MAX_PAGES) {
        return [];
      }

      const response = await fetch(`/api/comics/${genre}?page=${page}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const comicRankData: ComicRankApiResponse = await response.json();

      return comicRankData.data.map(transformComicToRankingItem);
    } catch (error) {
      console.error("Failed to fetch ranking data:", error);
      return [];
    }
  };

  const { items, loading, hasMore, containerRef } = useInfiniteScroll({
    initialItems,
    loadMore: onLoadMore || defaultLoadMore,
  });

  const filteredItems = getFilteredItems(items);

  const renderRankingItem = (item: RankingItem) => (
    <RankingItemContainer key={item.id}>
      <ItemImage src={item.imageUrl} alt={item.title} />

      <RankColumn>
        <RankNumber $rank={item.rank}>{item.rank}</RankNumber>
        {item.rankChange === "same" ? (
          <RankChangeIndicator $change={item.rankChange}>-</RankChangeIndicator>
        ) : (
          <RankChangeIndicator $change={item.rankChange}>
            {item.rankChange === "up" && (
              <>
                <ChevronUp size={8} />
                {item.rankChangeDiff > 0 && item.rankChangeDiff}
              </>
            )}
            {item.rankChange === "down" && (
              <>
                <ChevronDown size={8} />
                {item.rankChangeDiff > 0 && item.rankChangeDiff}
              </>
            )}
            {item.rankChange === "new" && "NEW"}
          </RankChangeIndicator>
        )}
      </RankColumn>

      <ItemContent>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemMeta>
          <ItemAuthor>{item.author}</ItemAuthor>
          <ItemGenre>{item.genre}</ItemGenre>
          {item.isOngoing && item.serialDay && (
            <SerialInfo>{item.serialDay}</SerialInfo>
          )}
        </ItemMeta>
        <div style={{ fontSize: "12px", color: "#666" }}>
          {item.description}
        </div>
      </ItemContent>
    </RankingItemContainer>
  );

  return (
    <RankingContainer>
      <RankingHeader>
        <RankingTitle>{title}</RankingTitle>
        <FilterButtons>
          <FilterButton
            $active={filters.status === "all"}
            onClick={() => handleFilterChange("status", "all")}
          >
            전체
          </FilterButton>
          <FilterButton
            $active={filters.status === "ongoing"}
            onClick={() => handleFilterChange("status", "ongoing")}
          >
            연재중
          </FilterButton>
          <FilterButton
            $active={filters.status === "completed"}
            onClick={() => handleFilterChange("status", "completed")}
          >
            완결
          </FilterButton>

          <FilterButton
            $active={filters.freeEpisodes}
            onClick={() =>
              handleFilterChange("freeEpisodes", !filters.freeEpisodes)
            }
          >
            무료회차 3개 이상
          </FilterButton>
        </FilterButtons>
      </RankingHeader>

      <ScrollContainer ref={containerRef as React.RefObject<HTMLDivElement>}>
        <RankingList>
          {filteredItems.length > 0 ? (
            filteredItems.map(renderRankingItem)
          ) : items.length > 0 ? (
            <EmptyMessage>
              필터 조건에 맞는 랭킹 데이터가 없습니다.
            </EmptyMessage>
          ) : (
            <EmptyMessage>랭킹 데이터가 없습니다.</EmptyMessage>
          )}
        </RankingList>

        {loading && (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        )}

        {!hasMore && filteredItems.length > 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "16px",
              color: "#666",
              fontSize: "14px",
            }}
          >
            모든 랭킹을 불러왔습니다.
          </div>
        )}
      </ScrollContainer>
    </RankingContainer>
  );
}
