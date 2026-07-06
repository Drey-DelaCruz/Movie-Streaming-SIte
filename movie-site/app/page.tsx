"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import MovieRows from "@/components/MovieRows"

const movies = [
  {id: 1, title: "Sinners", image:"/images/Sinners.jpg", rank: 1 },
  {id: 2, title: "Jurassic Park", image:"/images/jurassicpark.jpg", rank: 2 },
  {id: 3, title: "Shrek", image:"/images/shrek.jpg", rank: 3 },
  {id: 4, title: "Kung Fu", image:"/images/KungFu.jpg", rank: 4 },
  {id: 5, title: "Tangled", image:"/images/tangled.jpg", rank: 5 },
  {id: 6, title: "Obsession", image:"/images/Obsession.jpg", rank: 6 },
  {id: 7, title: "Project Hail Mary", image:"/images/projectHailMary.jpg", rank: 7 },
  {id: 8, title: "Goat", image:"/images/goat.jpg", rank: 8 },
  {id: 9, title: "Minions (2015)", image:"/images/minions.jpg", rank: 9 },
  {id: 10, title: "Tinker Bell", image:"/images/tinkerbell.jpg", rank: 10 },
]

export default function Home() {
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
    <>
      {/* Hero — stays here */}
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
      
    </>
  )
}