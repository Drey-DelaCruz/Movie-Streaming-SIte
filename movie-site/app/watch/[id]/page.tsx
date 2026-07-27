"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { use } from "react"

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  return (
    <div className="w-screen h-screen bg-black relative">
      
      {/* back button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-10 flex items-center gap-2 
        text-white bg-black/50 hover:bg-black px-4 py-2 rounded-full 
        transition-all duration-300 cursor-pointer">
        <ArrowLeft size={20} />
        Back
      </button>

      {/* player */}
      <iframe
        src={`https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true`}
        width="100%"
        height="100%"
        allowFullScreen
        className="w-full h-full"
        title="none"
        frameBorder="0"
      />

    </div>
  )
}