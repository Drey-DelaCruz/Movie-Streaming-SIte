import HeroSection from "@/components/HeroPage"
import MovieRows from "@/components/MovieRows"
import { Movie } from "@/types"

async function getPopular() {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` }
  })
  const data = await res.json()
  return data.results.slice(0, 10).map((movie: Movie, index: number) => ({ ...movie, rank: index + 1 }))
}

async function getTopRated() {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=10000&without_genres=99,10755",
    { headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` } }
  )
  const data = await res.json()
  return data.results.slice(0, 10).map((movie: Movie, index: number) => ({ ...movie, rank: index + 1 }))
}

async function getTrending() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
    headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` }
  })
  const data = await res.json()
  return data.results.slice(0, 20)
}

async function getByGenre(genreId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
    { headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` } }
  )
  const data = await res.json()
  return data.results.slice(0, 20)
}

export default async function Home() {
  const popular = await getPopular()
  const topRated = await getTopRated()
  const nowTrending = await getTrending()
  const action = await getByGenre(28)
  const horror = await getByGenre(27)
  const romance = await getByGenre(10749)
  const scifi = await getByGenre(878)
  const fantasy = await getByGenre(14)

  return (
    <>
      

      <div className="bg-black py-8 px-4">
        <div className="max-w-screen-2xl mx-auto px-4">
          <HeroSection movies={popular} />
        <MovieRows title="Top Rated" movies={topRated} variant="wide"/>
        <MovieRows title="Trending Today" movies={nowTrending} variant="wide"/>
        <MovieRows title="Top Action" movies={action} variant="wide"/>
        <MovieRows title="Top Horror" movies={horror} variant="wide"/>
        <MovieRows title="Top Romance" movies={romance} variant="wide"/>
        <MovieRows title="Top Fantasy" movies={fantasy} variant="wide"/>
        <MovieRows title="Top Sci-Fi" movies={scifi} variant="wide"/>
      </div>
      </div>
    </>
  )
}