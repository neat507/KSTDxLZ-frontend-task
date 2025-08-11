import { ComicRankItem, Artist } from "@/types/ranking";
import { RankingItem } from "@/components/RankingList/types";

const DAY_MAP: Record<string, string> = {
  MON: "월",
  TUE: "화",
  WED: "수",
  THU: "목",
  FRI: "금",
  SAT: "토",
  SUN: "일",
};

// 작가 정보를 문자열로 변환
export function getAuthorsString(artists: Artist[]): string {
  const relevantRoles = ["writer", "painter", "scripter"];
  const relevantArtists = artists.filter((artist) =>
    relevantRoles.includes(artist.role)
  );

  return relevantArtists.map((artist) => artist.name).join(", ");
}

// 연재 정보를 문자열로 변환
export function getSerialInfo(
  contentsState: string,
  periods: string[]
): string | undefined {
  if (contentsState !== "scheduled") return undefined;

  if (periods.length === 0) return undefined;

  // 여러 요일인 경우
  if (periods.length > 1) {
    const days = periods.map((period) => DAY_MAP[period]).join(", ");
    return `${days} 연재`;
  }

  // 단일 요일인 경우
  const day = DAY_MAP[periods[0]];
  return `매주 ${day}요일 연재`;
}

// 순위 변동 계산
export function getRankChange(
  currentRank: number,
  previousRank: number
): "up" | "down" | "same" | "new" {
  if (previousRank === 0) return "new";
  if (currentRank < previousRank) return "up";
  if (currentRank > previousRank) return "down";
  return "same";
}

// 순위 변동 폭 계산
export function getRankChangeDiff(
  currentRank: number,
  previousRank: number
): number {
  if (previousRank === 0) return 0;
  return Math.abs(currentRank - previousRank);
}

// API 데이터 => 컴포넌트 Props 형식으로 변환
export function transformComicToRankingItem(comic: ComicRankItem): RankingItem {
  const author = getAuthorsString(comic.artists);
  const serialDay = getSerialInfo(comic.contentsState, comic.schedule.periods);
  const rankChange = getRankChange(comic.currentRank, comic.previousRank);
  const rankChangeDiff = getRankChangeDiff(
    comic.currentRank,
    comic.previousRank
  );

  const isCompleted = comic.contentsState === "completed";
  const freeEpisodeText = `${comic.freedEpisodeSize}화 무료`;
  const statusText = isCompleted ? "완결" : "연재 중";
  const description = `${freeEpisodeText}\n${statusText}`;

  return {
    id: comic.id.toString(),
    rank: comic.currentRank,
    title: comic.title,
    author,
    genre: comic.genres[0] || "",
    description,
    imageUrl: comic.thumbnailSrc,
    isOngoing: comic.contentsState === "scheduled",
    serialDay,
    rankChange,
    rankChangeDiff,
    previousRank: comic.previousRank,
    freedEpisodeSize: comic.freedEpisodeSize,
  };
}
