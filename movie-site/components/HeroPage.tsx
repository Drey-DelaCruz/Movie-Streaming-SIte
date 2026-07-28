"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import MovieRows from "@/components/MovieRows"

type Movie = {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  overview: string
  vote_average: number
  release_date: string
  rank?: number
  watchedAt?: string
}

export default function HeroSection({ movies }: { movies: Movie[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < movies.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setCurrentIndex(0)
      }
    }, 10000)
    return () => clearTimeout(timer)
  }, [currentIndex])

  useEffect(() => {
    // eslint-disable-next-line
    setVisible(false)
    const fadeTimer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(fadeTimer)
  }, [currentIndex])

  return (
    <div className="relative w-full h-[100vh] bg-black">
      <Image
        key={currentIndex}
        src={`https://image.tmdb.org/t/p/original${movies[currentIndex].backdrop_path}`}
        alt="movie"
        fill
        className={`object-cover transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}/>
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"/>
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.8) 100%)"
      }} />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      <div className="absolute top-1/4 left-10 z-20 max-w-lg">
        <h1 className="text-white text-6xl font-bold mb-2">
          {movies[currentIndex].title}
        </h1>
        <p className="text-gray-300 text-sm mb-3 line-clamp-3">
          {movies[currentIndex].overview}
        </p>
        <div className="flex items-center gap-2 text-yellow-400">
          <span>★</span>
          <span className="text-white">{movies[currentIndex].vote_average.toFixed(1)}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-5 right-0 w-full z-20">
        <MovieRows title="TOP 10 Today" movies={movies} currentIndex={currentIndex} />
      </div>
    </div>
  )
}