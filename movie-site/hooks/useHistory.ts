import { useState, useEffect } from "react"

export function useHistory() {
  const [history, setHistory] = useState([])
  const [mounted, setMounted] = useState(false)

  // load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("watchHistory")
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  // save to localStorage whenever history changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("watchHistory", JSON.stringify(history))
    }
  }, [history, mounted])

  const addToHistory = (movie) => {
    setHistory(prev => {
      // remove old entry of same movie if it exists
      const filtered = prev.filter(m => m.id !== movie.id)
      // add new entry at the top with timestamp
      return [{
        ...movie,
        watchedAt: new Date().toISOString()
      }, ...filtered]
    })
  }

  const clearHistory = () => {
    setHistory([])
  }

  return { history, addToHistory, clearHistory }
}