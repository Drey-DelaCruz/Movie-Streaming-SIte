"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function MovieRow({ title, movies, currentIndex = -1 }) {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const visibleCards = 5

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollLeft = () => {
    if (carouselIndex > 0) setCarouselIndex(carouselIndex - 1)
  }

  const scrollRight = () => {
    if (carouselIndex < movies.length - visibleCards) setCarouselIndex(carouselIndex + 1)
  }

  return (
    <>
    <div className="mb-8">
      <h1 className="text-white text-4xl font-bold border-l-4 border-red-600 pl-3 mb-4">
        {title}
      </h1>

      <div className="relative px-8">
        <button onClick={scrollLeft} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2">
          <ChevronLeft className="text-white" />
        </button>

        <div className="overflow-x-hidden overflow-y-visible py-6">
          <div className={`flex gap-4 ${mounted ? "transition-transform duration-500" : ""}`}
               style={{ transform: `translateX(-${carouselIndex * 272}px)` }}>
            {movies.map((movie, index) => (
              <div key={movie.id} className={`relative shrink-0 w-72 transition-all duration-500 ${currentIndex === index ? "scale-110" : "scale-100"}`}>
                <div className="absolute top-0 left-0 bg-red-600 text-white text-s p-1 z-5 rounded-xl">
                  TOP {movie.rank}
                </div>
                <Image src={movie.image} alt={movie.title} width={280} height={400} className="rounded-xl"/>
                <p className="text-white">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={scrollRight} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2">
          <ChevronRight className="text-white" />
        </button>
      </div>
    </div>
    </>
  )
}