"use client"
import { useHistory } from "@/hooks/useHistory"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Play, Trash2, X } from "lucide-react"
import { useHistory as useHistoryHook } from "@/hooks/useHistory"

export default function HistoryPage() {
  const { history, clearHistory, addToHistory } = useHistory()
  const router = useRouter()

  // format timestamp to readable date
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="min-h-screen bg-black pt-20 px-8">

      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-4xl font-bold border-l-4 border-red-600 pl-3">
          Watch History
        </h1>

        {/* clear all button */}
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 text-gray-400 hover:text-white
            border border-gray-600 hover:border-white px-4 py-2 rounded-full
            transition-all duration-300 cursor-pointer">
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* empty state */}
      {history.length === 0 && (
        <p className="text-gray-400">No watch history yet.</p>
      )}

      {/* grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {history.map((movie) => (
          <div key={movie.id} className="relative group cursor-pointer">

            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={192}
              height={288}
              className="rounded-xl w-full transition-all duration-300 group-hover:blur-sm"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50
              transition-all duration-300 rounded-xl" />

            {/* play button */}
            <button
              onClick={() => {
                addToHistory(movie)
                router.push(`/watch/${movie.id}`)
              }}
              className="absolute inset-0 flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer">
              <Play size={48} className="text-white" />
            </button>

            {/* remove from history button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                // filter out this movie
                clearHistory()
              }}
              className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100
              transition-all duration-300 bg-black/50 rounded-full p-2 cursor-pointer">
              <X size={20} className="text-white" />
            </button>

            <p className="text-white text-sm mt-1">{movie.title}</p>
            {/* timestamp */}
            <p className="text-gray-400 text-xs">{formatDate(movie.watchedAt)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}