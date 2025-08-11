export type {
  Artist,
  Schedule,
  ComicRankItem,
  ComicRankApiResponse,
} from "@/types/ranking";

export const MAX_PAGES = 5;

export type RankChange = "up" | "down" | "same" | "new";

export interface FilterState {
  status: "all" | "ongoing" | "completed";
  freeEpisodes: boolean;
}

export type FilterType = "status" | "freeEpisodes";

export interface RankingItem {
  id: string;
  rank: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  imageUrl: string;
  views?: number;
  likes?: number;
  isOngoing: boolean;
  serialDay?: string;
  rankChange: RankChange;
  rankChangeDiff: number;
  previousRank?: number;
  freedEpisodeSize: number;
}

export interface RankingListProps {
  genre: string;
  initialItems?: RankingItem[];
  onLoadMore?: (page: number) => Promise<RankingItem[]>;
}

// 컴포넌트 Props 확장
export interface RankingListComponentProps extends RankingListProps {
  title?: string;
}

// 필터 변경 함수의 타입
export type FilterChangeHandler = (
  type: FilterType,
  value: "all" | "ongoing" | "completed" | boolean
) => void;
