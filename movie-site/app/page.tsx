import Image from "next/image"
import MovieRows from "@/components/MovieRows"
import HeroSection from "@/components/HeroSection"

async function getMovies() {
  const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
    }
  })
  const data = await response.json()
  return data.results
}

export default async function Home() {
  const movies = await getMovies()
  console.log(movies)  // check terminal for output

  return (
    <>
      <HeroSection movies={movies} />
    </>
  )
}