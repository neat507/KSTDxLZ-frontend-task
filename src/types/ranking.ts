export interface Artist {
  name: string;
  role: "writer" | "painter" | "scripter" | "original" | "publisher";
  id: string;
}

export interface Schedule {
  periods: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
  anchor: number;
}

export interface ComicRankItem {
  id: number;
  alias: string;
  title: string;
  artists: Artist[];
  schedule: Schedule;
  genres: string[];
  freedEpisodeSize: number;
  contentsState: "scheduled" | "completed";
  isPrint: boolean;
  currentRank: number;
  previousRank: number;
  updatedAt: number;
  thumbnailSrc: string;
}

export interface ComicRankApiResponse {
  hasNext: boolean;
  count: number;
  data: ComicRankItem[];
}
