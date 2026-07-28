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

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Movie[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks")
    if (saved) setBookmarks(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (movie: Movie) => {
    setBookmarks(prev => [...prev, movie])
  }

  const removeBookmark = (movieId: number) => {
    setBookmarks(prev => prev.filter(m => m.id !== movieId))
  }

  const isBookmarked = (movieId: number) => {
    return bookmarks.some(m => m.id === movieId)
  }

  return { bookmarks, addBookmark, removeBookmark, isBookmarked }
}