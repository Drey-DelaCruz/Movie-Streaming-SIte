import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    { headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` } }
  )
  const data = await res.json()
  return NextResponse.json(data.results)
}