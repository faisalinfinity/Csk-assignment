"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="font-medium text-gray-900">Unlisted Shares India</span>
            </Link>
          </div>

          {!isMobile && (
            <nav className="flex items-center gap-8">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Unlisted Shares
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Our Blogs
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
            </nav>
          )}

          {isMobile && (
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="container mx-auto px-4 pb-4 bg-white/80 backdrop-blur-md">
          <nav className="flex flex-col gap-4">
            <Link href="#" className="text-gray-600 hover:text-gray-900 py-2">
              Unlisted Shares
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 py-2">
              Our Blogs
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 py-2">
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

