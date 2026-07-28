import { useState, useEffect } from "react"

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

export function useHistory() {
  const [history, setHistory] = useState<Movie[]>([])
  const [loaded, setLoaded] = useState(false)  // ← add this

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("watchHistory")
    if (saved) setHistory(JSON.parse(saved))
    setLoaded(true)  // ← mark as loaded
  }, [])

  // only save AFTER initial load
  useEffect(() => {
    if (!loaded) return  // ← don't save until loaded
    localStorage.setItem("watchHistory", JSON.stringify(history))
  }, [history, loaded])

  const addToHistory = (movie: Movie) => {
    setHistory(prev => {
      const filtered = prev.filter(m => m.id !== movie.id)
      const newHistory = [{
        ...movie,
        watchedAt: new Date().toISOString()
      }, ...filtered]
      localStorage.setItem("watchHistory", JSON.stringify(newHistory))
      return newHistory
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