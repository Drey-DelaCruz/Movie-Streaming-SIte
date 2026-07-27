"use client"
import { useState, useEffect } from "react"

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([])
  const [mounted, setMounted] = useState(false)

  // wait for component to mount before reading localStorage
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("bookmarks")
    if (saved) setBookmarks(JSON.parse(saved))
  }, [])

  // save to localStorage whenever bookmarks change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }
  }, [bookmarks, mounted])

  const addBookmark = (movie) => {
    setBookmarks(prev => [...prev, movie])
  }

  const removeBookmark = (movieId) => {
    setBookmarks(prev => prev.filter(m => m.id !== movieId))
  }

  const isBookmarked = (movieId) => {
    return bookmarks.some(m => m.id === movieId)
  }

  return { bookmarks, addBookmark, removeBookmark, isBookmarked }
}