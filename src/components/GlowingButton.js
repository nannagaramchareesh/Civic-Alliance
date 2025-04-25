import React from 'react'
import { Link } from 'react-router-dom'
export default function GlowingButton() {
  return (
    <div>
        <div className="w-full flex justify-center mt-10 animate-fade-in mb-16">
  <Link
    to="/overview"
    className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl"
  >
    🚀 Go to Dashboard Analytics
    <span className="absolute -inset-1 rounded-full blur-lg opacity-60 bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 z-[-1]"></span>
  </Link>
</div>
    </div>
  )
}
