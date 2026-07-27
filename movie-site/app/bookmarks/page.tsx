"use client"
import { useBookmarks } from "@/hooks/useBookmarks"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Play, Bookmark } from "lucide-react"
import { useHistory } from "@/hooks/useHistory"

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, isBookmarked } = useBookmarks()
  const router = useRouter()
  const { addToHistory } = useHistory()

  return (
    <div className="min-h-screen bg-black pt-20 px-8">
      <h1 className="text-white text-4xl font-bold border-l-4 border-red-600 pl-3 mb-8">
        My Bookmarks
      </h1>

      {bookmarks.length === 0 && (
        <p className="text-gray-400">No bookmarks yet.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {bookmarks.map((movie) => (
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

            {/* unbookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeBookmark(movie.id)
              }}
              className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100
              transition-all duration-300 bg-black/50 rounded-full p-2 cursor-pointer">
              <Bookmark size={20} className="text-yellow-400 fill-yellow-400" />
            </button>

            <p className="text-white text-sm mt-1">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}