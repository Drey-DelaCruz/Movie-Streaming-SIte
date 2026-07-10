"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import MovieRows from "@/components/MovieRows"

export default function HeroSection({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)

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
    setVisible(false)
    const fadeTimer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(fadeTimer)
  }, [currentIndex])

  return (
    <div className="relative w-full h-screen bg-black">
      <Image
        key={currentIndex}
        src={movies[currentIndex].image}
        alt="movie"
        fill
        className={`object-cover transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}/>
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"/>
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.8) 100%)"
      }} />
      <div className="absolute bottom-10 left-0 right-0 w-full overflow-hidden z-20">
        <MovieRows title="TOP 10 Today" movies={movies} currentIndex={currentIndex} />
      </div>
    </div>
  )
}