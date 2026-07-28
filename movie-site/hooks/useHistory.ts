import { useState, useEffect } from "react"
import { Movie } from "@/types/movie"

export function useHistory() {
  const [history, setHistory] = useState<Movie[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("watchHistory")
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("watchHistory", JSON.stringify(history))
  }, [history])

  const addToHistory = (movie: Movie) => {
    setHistory(prev => {
      const filtered = prev.filter(m => m.id !== movie.id)
      return [{
        ...movie,
        watchedAt: new Date().toISOString()
      }, ...filtered]
    })
  }

  const removeFromHistory = (movieId: number) => {
    setHistory(prev => prev.filter(m => m.id !== movieId))
  }

  const clearHistory = () => {
    setHistory([])
  }

  return { history, addToHistory, removeFromHistory, clearHistory }
}