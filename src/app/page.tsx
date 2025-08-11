"use client";

import { RankingList, GenreTabs } from "@/components";
import { ComicRankApiResponse } from "@/types/ranking";
import { RankingItem, MAX_PAGES } from "@/components/RankingList/types";
import { transformComicToRankingItem } from "@/utils/apiUtils";
import { useEffect, useState } from "react";

type GenreTab = "all" | "drama" | "romance";

export default function Home() {
  const [romanceData, setRomanceData] = useState<RankingItem[]>([]);
  const [dramaData, setDramaData] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState<GenreTab>("all");

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        const [romanceResponse, dramaResponse] = await Promise.all([
          fetch("/api/comics/romance?page=1"),
          fetch("/api/comics/drama?page=1"),
        ]);

        if (romanceResponse.ok) {
          const romanceApiData: ComicRankApiResponse =
            await romanceResponse.json();
          const transformedData = romanceApiData.data.map(
            transformComicToRankingItem
          );
          setRomanceData(transformedData);
        }

        if (dramaResponse.ok) {
          const dramaApiData: ComicRankApiResponse = await dramaResponse.json();
          const transformedData = dramaApiData.data.map(
            transformComicToRankingItem
          );
          setDramaData(transformedData);
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleLoadMore =
    (genre: string) =>
    async (page: number): Promise<RankingItem[]> => {
      try {
        if (page > MAX_PAGES) {
          return [];
        }

        const response = await fetch(`/api/comics/${genre}?page=${page}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ComicRankApiResponse = await response.json();
        return data.data.map(transformComicToRankingItem);
      } catch (error) {
        console.error("Failed to fetch ranking data:", error);
        return [];
      }
    };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>데이터를 불러오는 중...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeGenre) {
      case "romance":
        return (
          <RankingList
            genre="romance"
            title="로맨스 장르 랭킹"
            initialItems={romanceData}
            onLoadMore={handleLoadMore("romance")}
          />
        );
      case "drama":
        return (
          <RankingList
            genre="drama"
            title="드라마 장르 랭킹"
            initialItems={dramaData}
            onLoadMore={handleLoadMore("drama")}
          />
        );
      case "all":
      default:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            <RankingList
              genre="romance"
              title="로맨스 장르 랭킹"
              initialItems={romanceData}
              onLoadMore={handleLoadMore("romance")}
            />
            <RankingList
              genre="drama"
              title="드라마 장르 랭킹"
              initialItems={dramaData}
              onLoadMore={handleLoadMore("drama")}
            />
          </div>
        );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "20px 0",
      }}
    >
      <GenreTabs activeGenre={activeGenre} onGenreChange={setActiveGenre} />
      <div style={{ padding: "0 20px" }}>{renderContent()}</div>
    </div>
  );
}
