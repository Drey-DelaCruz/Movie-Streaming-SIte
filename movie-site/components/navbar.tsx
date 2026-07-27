"use client"

import Link from "next/link"
import { useState } from "react"
import { CirclePlay, Film, Bookmark, History, Search } from "lucide-react"
import { usePathname } from "next/navigation"

const listItems = [
  { label: "Movies",    icon: <Film />,   href:"/ " },
  { label: "Bookmarks", icon: <Bookmark />,   href:"/bookmarks" },
  { label: "History",   icon: <History />,  href: "/history" },
  { label: "Search",    icon: <Search />,   href: "/search" },
]
export default function Navbar() {
    const pathname = usePathname()
    if (pathname.startsWith("/watch")) return null
    const [isOpen, setIsOpen] = useState(true)

  return (
    <nav className={`fixed flex 
      left-1/2 -translate-x-1/2 top-5
      text-white shadow-lg z-10 
      rounded-full
      transition-all duration-800 ease-in-out z-50
      ${isOpen 
        ? "bg-black bg-opacity-60 justify-between items-center gap-6 py-3 px-10 w-auto" 
        : "bg-transparent w-12 h-12 p-0 items-center justify-center"}`}>

        <div className={`flex items-center transition-all duration-800 ease-in-out
        ${isOpen 
          ? "opacity-100 scale-100 w-auto" 
          : "opacity-0 scale-0 w-0 overflow-hidden"}`}>

        <ul className="flex gap-8 text-xl">
          {listItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <li className="flex relative text-sm items-center group cursor-pointer font-bold gap-2">
                {item.icon}
                {item.label}
                <span className="absolute left-0 -bottom-1.25 w-0 h-1 rounded-xl bg-linear-to-r 
                  from-blue-500 to-green-500 transition-all duration-300 group-hover:w-full"/>
              </li>
            </Link>
          ))}
        </ul>

      </div>

         <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-linear-to-r from-blue-500 to-green-500 
        w-10 h-10 rounded-full shadow-lg shrink-0
        text-white font-semibold 
        hover:from-blue-600 hover:to-green-500
        hover:shadow-green-500 shadow-blue-500 
        flex items-center justify-center
        transition-all duration-800">
        <CirclePlay />
      </button>
    </nav>
  )
}