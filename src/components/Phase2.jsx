import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Phase2({ nextPhase }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const noBtnRef = useRef(null)
  const cardRef = useRef(null)

  const moveButton = () => {
    const card = cardRef.current
    const btn = noBtnRef.current
    if (!card || !btn) return

    const cardRect = card.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()

    const p = 40
    const maxX = (cardRect.width / 2) - (btnRect.width / 2) - p
    const maxY = (cardRect.height / 2) - (btnRect.height / 2) - p

    const newX = (Math.random() - 0.5) * maxX * 2
    const newY = (Math.random() - 0.5) * maxY * 2

    setNoPosition({ x: newX, y: newY })
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center sm:justify-end overflow-hidden">
      {/* Background Anime Image */}
      <div
        className="absolute inset-0 bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/proposal.png")',
          backgroundSize: '85%',
          backgroundPosition: 'left center',
          width: '100vw',
          height: '100vh',
          opacity: 0.6
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black"></div>
      </div>

      {/* Video Background (Right Side) */}
      <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full z-0 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/surprise_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Decision Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: -60 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="z-10 bg-white/95 p-12 sm:p-16 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] max-w-md w-[90%] sm:w-[30rem] text-center relative ml-auto mr-0 sm:mr-32 border-none"
      >
        {/* All Top Bars and Logos Removed as requested */}

        <div className="mb-14">
          <h3 className="text-xl font-medium text-slate-400 mb-6 italic">Critical Pending Request...</h3>
          <p className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            "Will you be my <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Valentine?"</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 justify-center items-center relative h-48 sm:h-24 px-4">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextPhase}
            className="w-48 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl z-30 transition-all"
          >
            YES!
          </motion.button>

          {/* Evasive No Button Wrapper */}
          <motion.div
            animate={{ x: noPosition.x, y: noPosition.y }}
            onMouseEnter={moveButton}
            className="z-20 p-10 cursor-default"
            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          >
            <button
              ref={noBtnRef}
              className="w-48 bg-slate-100 text-slate-300 py-4 rounded-[2rem] font-bold text-sm uppercase tracking-widest cursor-default border border-slate-200"
            >
              No
            </button>
          </motion.div>
        </div>

        <div className="mt-16 flex justify-center gap-6 opacity-20">
          <Heart size={24} fill="#ec4899" className="text-pink-500" />
          <Heart size={24} fill="#ec4899" className="text-pink-500" />
          <Heart size={24} fill="#ec4899" className="text-pink-500" />
        </div>
      </motion.div>
    </div>
  )
}
