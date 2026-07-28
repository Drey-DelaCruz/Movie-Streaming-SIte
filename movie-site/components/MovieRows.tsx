"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Play, Bookmark } from "lucide-react"
import { useBookmarks } from "@/hooks/useBookmarks"
import { useHistory } from "@/hooks/useHistory"

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

export default function MovieRows({ title, movies, currentIndex = -1, variant = "tall" }: {
  title: string
  movies: Movie[]
  currentIndex?: number
  variant?: string
}) {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [visibleCards, setVisibleCards] = useState(movies.length)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const cardWidth = variant === "tall" ? 208 : 320
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const { addToHistory } = useHistory()

  useEffect(() => {
    setTimeout(() => setMounted(true), 0)
  }, [])

  useEffect(() => {
    const updateVisible = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const newVisibleCards = Math.floor(width / cardWidth)
        setVisibleCards(newVisibleCards)
        setCarouselIndex(prev => Math.min(prev, movies.length - newVisibleCards))
      }
    }
    updateVisible()
    window.addEventListener("resize", updateVisible)
    return () => window.removeEventListener("resize", updateVisible)
  }, [movies.length])

  const scrollLeft = () => {
    if (carouselIndex > 0) setCarouselIndex(carouselIndex - 1)
  }

  const scrollRight = () => {
    const maxIndex = movies.length - visibleCards
    if (carouselIndex < maxIndex && maxIndex > 0) {
      setCarouselIndex(carouselIndex + 1)
    }
  }

  return (
    <div className="mb-8">
      <h1 className="text-white text-2xl font-bold border-l-4 border-red-600 pl-3 mb-4">
        {title}
      </h1>
      <div className="relative">
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-20
          bg-black/70 hover:bg-black rounded-full p-3 text-white cursor-pointer">
          <ChevronLeft size={32} />
        </button>
        <div ref={containerRef} className="overflow-x-hidden overflow-y-visible py-6 px-12">
          <div className={`flex gap-4 ${mounted ? "transition-transform duration-500" : ""}`}
               style={{ transform: `translateX(-${carouselIndex * cardWidth}px)` }}>
            {movies.map((movie, index) => (
              <div key={movie.id} className={`relative group shrink-0 transition-all duration-500
                ${currentIndex === index ? "scale-110" : "scale-100"}
                ${variant === "tall" ? "w-48" : "w-72"}`}>
                {movie.rank && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white text-s p-1 z-5 rounded-xl">
                    TOP {movie.rank}
                  </div>
                )}
                <Image
                  src={`https://image.tmdb.org/t/p/w500${variant === "wide" ? movie.backdrop_path : movie.poster_path}`}
                  alt={movie.title}
                  width={variant === "tall" ? 192 : 400}
                  height={variant === "tall" ? 288 : 225}
                  className="rounded-xl object-cover w-full"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 
                  transition-all duration-300 rounded-xl z-10" />
                <button
                  onClick={() => {
                    addToHistory(movie)
                    router.push(`/watch/${movie.id}`)
                  }}
                  className="absolute inset-0 flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer">
                  <Play size={48} className="text-white" />
                </button>
                <button onClick={(e) => {
                  e.stopPropagation()
                  isBookmarked(movie.id)
                    ? removeBookmark(movie.id)
                    : addBookmark(movie)
                  }}
                  className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100
                  transition-all duration-300 bg-black/50 rounded-full p-2 cursor-pointer">
                  <Bookmark
                    size={20}
                    className={isBookmarked(movie.id) ? "text-yellow-400 fill-yellow-400" : "text-white"}
                  />
                </button>
                <p className="text-white text-sm mt-1">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-20
          bg-black/70 hover:bg-black rounded-full p-3 text-white cursor-pointer">
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  )
}