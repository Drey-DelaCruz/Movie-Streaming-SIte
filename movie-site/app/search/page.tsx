"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Search, Play } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get("q")  // reads ?q= from URL
  const [results, setResults] = useState([])

    useEffect(() => {
    if (!currentQuery) return

    const fetchResults = async () => {
        const res = await fetch(`/api/search?q=${currentQuery}`)
        const data = await res.json()
        setResults(data)
    }

    fetchResults()
    }, [currentQuery])

  const handleSearch = () => {
    if (query.trim()) router.push(`/search?q=${query}`)
  }

  


  return (
  <div className={`min-h-screen bg-black transition-all duration-500
    ${currentQuery ? "pt-24" : "flex flex-col items-center justify-center"}`}>

    {/* search bar */}
    <div className="w-full max-w-2xl px-4 mx-auto">
      <div className="flex items-center gap-3 bg-white/10 rounded-full px-6 py-3 
        border border-white/20 focus-within:border-white transition-all duration-300">
        <Search size={20} className="text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search movies..."
          className="bg-transparent text-white outline-none w-full placeholder-gray-400"
        />
      </div>
    </div>
    {currentQuery && (
  <div className="w-full max-w-7xl mx-auto px-8 mt-8">
    <h2 className="text-white text-2xl font-bold border-l-4 border-red-600 pl-3 mb-6">
      Results for {`"${currentQuery}"`}
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {results.map((movie) => (
  <div key={movie['id']} className="relative group cursor-pointer"
    onClick={() => router.push(`/watch/${movie['id']}`)}>
    
    <Image
      src={`https://image.tmdb.org/t/p/w500${movie['poster_path']}`}
      alt={movie['title']}
      width={192}
      height={288}
      className="rounded-xl w-full transition-all duration-300 group-hover:blur-sm"
    />

    {/* overlay */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50
      transition-all duration-300 rounded-xl" />

    {/* play button */}
    <div className="absolute inset-0 flex items-center justify-center
      opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
      <Play size={48} className="text-white" />
    </div>

    <p className="text-white text-sm mt-1">{movie['title']}</p>
  </div>
))}
    </div>
  </div>
)}

  </div>
)
}