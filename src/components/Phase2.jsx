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

    // Padding inside the card to keep the button fully visible
    const p = 40
    const maxX = (cardRect.width / 2) - (btnRect.width / 2) - p
    const maxY = (cardRect.height / 2) - (btnRect.height / 2) - p

    const newX = (Math.random() - 0.5) * maxX * 2
    const newY = (Math.random() - 0.5) * maxY * 2

    setNoPosition({ x: newX, y: newY })
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center sm:justify-end overflow-hidden">
      {/* Anime Background - Left Weighted */}
      <div
        className="absolute inset-0 bg-no-repeat transition-all duration-700 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/proposal.png")',
          backgroundSize: '85%',
          backgroundPosition: 'left center',
          width: '100vw',
          height: '100vh',
          opacity: 0.7
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80"></div>
      </div>

      {/* Surprise Video - Filling the Right Gap */}
      <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/surprise_video.mp4" type="video/mp4" />
        </video>
        {/* Soft overlay on video */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* The Refined Decision Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: -60 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="z-10 bg-white/90 backdrop-blur-2xl p-10 sm:p-14 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/20 max-w-md w-[90%] sm:w-[28rem] text-center relative ml-auto mr-0 sm:mr-32"
      >
        <div className="mb-14 pt-4">
          <h3 className="text-xl font-medium text-slate-500 mb-6 italic">Critical Request...</h3>
          <p className="text-4xl font-black text-slate-900 leading-tight">
            "Will you be my <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Valentine?"</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center relative h-48 sm:h-24 sm:px-4 leading-none">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 10px 40px rgba(236,72,153,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={nextPhase}
            className="w-44 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl z-30 transition-all"
          >
            YES!
          </motion.button>

          {/* Invisible wrapper for proximity detection */}
          <motion.div
            animate={{ x: noPosition.x, y: noPosition.y }}
            onMouseEnter={moveButton}
            className="z-20 p-8 cursor-default"
            transition={{ type: 'spring', stiffness: 600, damping: 35 }}
          >
            <button
              ref={noBtnRef}
              className="w-44 bg-slate-50 text-slate-300 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest cursor-default border border-slate-100"
            >
              No
            </button>
          </motion.div>
        </div>

        <div className="mt-14 flex justify-center gap-4 opacity-30">
          <Heart size={20} fill="#ec4899" className="text-pink-500" />
          <Heart size={20} fill="#ec4899" className="text-pink-500" />
          <Heart size={20} fill="#ec4899" className="text-pink-500" />
        </div>
      </motion.div>
    </div>
  )
}
