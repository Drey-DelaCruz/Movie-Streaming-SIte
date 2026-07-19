"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function MovieRows({ title, movies, currentIndex = -1, variant = "tall" }) {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [visibleCards, setVisibleCards] = useState(movies.length)
  const containerRef = useRef(null)
  const cardWidth = variant === "tall" ? 208 : 320

  useEffect(() => {
    setMounted(true)
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
              <div key={movie.id} className={`relative shrink-0 transition-all duration-500
                ${currentIndex === index ? "scale-110" : "scale-100"}
                ${variant === "tall" ? "w-48" : "w-72"}`}>

                {/* rank badge — only if rank exists */}
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