import { NextRequest, NextResponse } from "next/server";
import { ComicRankApiResponse } from "@/types/ranking";
import { MAX_PAGES } from "@/components/RankingList/types";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ genre: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const { genre } = await params;

    // 유효한 장르인지 확인
    const validGenres = ["romance", "drama"];
    if (!validGenres.includes(genre)) {
      return NextResponse.json(
        { error: "Invalid genre. Supported genres: romance, drama" },
        { status: 400 }
      );
    }

    // 유효한 페이지인지 확인 (1-MAX_PAGES)
    const pageNum = parseInt(page);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > MAX_PAGES) {
      return NextResponse.json(
        { error: `Invalid page. Supported pages: 1-${MAX_PAGES}` },
        { status: 400 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      genre,
      `page_${pageNum}.json`
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data: ComicRankApiResponse = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
