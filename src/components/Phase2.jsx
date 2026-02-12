import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Phase2({ nextPhase }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const noBtnRef = useRef(null)
  const cardRef = useRef(null)

  // Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Check proximity and move button if mouse gets too close
  useEffect(() => {
    const btn = noBtnRef.current
    if (!btn) return

    const btnRect = btn.getBoundingClientRect()
    const btnCenterX = btnRect.left + btnRect.width / 2
    const btnCenterY = btnRect.top + btnRect.height / 2

    const distance = Math.sqrt(
      Math.pow(mousePos.x - btnCenterX, 2) +
      Math.pow(mousePos.y - btnCenterY, 2)
    )

    // If mouse is within 150px, teleport button to a safe zone
    if (distance < 150) {
      moveButtonToSafeZone()
    }
  }, [mousePos])

  const moveButtonToSafeZone = () => {
    // Define safe zones (corners and edges of viewport)
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const buttonWidth = 176 // w-44 = 11rem = 176px
    const buttonHeight = 56 // py-4 + text ≈ 56px
    const padding = 40

    const safeZones = [
      // Top corners
      { x: padding, y: padding },
      { x: viewportWidth - buttonWidth - padding, y: padding },
      // Bottom corners
      { x: padding, y: viewportHeight - buttonHeight - padding },
      { x: viewportWidth - buttonWidth - padding, y: viewportHeight - buttonHeight - padding },
      // Mid edges
      { x: padding, y: viewportHeight / 2 - buttonHeight / 2 },
      { x: viewportWidth - buttonWidth - padding, y: viewportHeight / 2 - buttonHeight / 2 },
      { x: viewportWidth / 2 - buttonWidth / 2, y: padding },
      { x: viewportWidth / 2 - buttonWidth / 2, y: viewportHeight - buttonHeight - padding },
    ]

    // Pick a random safe zone
    const randomZone = safeZones[Math.floor(Math.random() * safeZones.length)]
    setNoPosition(randomZone)
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#fef2f4] to-[#fff5f7] flex items-center justify-center sm:justify-end overflow-hidden">
      {/* Background Anime Image */}
      <div
        className="absolute inset-0 bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/proposal.png")',
          backgroundSize: '85%',
          backgroundPosition: 'left center',
          width: '100vw',
          height: '100vh',
          opacity: 0.85
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50/20 to-white/40"></div>
      </div>

      {/* Corner Video */}
      <div className="absolute bottom-6 right-6 w-64 h-auto z-20 rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-200/50 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        >
          <source src="/corner_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Premium Decision Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: 100, scale: 0.95 }}
        animate={{ opacity: 1, x: -40, scale: 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
        className="z-10 relative sm:mr-40 max-w-xl w-[92%] sm:w-[600px]"
      >
        {/* Glow effect behind card */}
        <div className="absolute -inset-4 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 rounded-[5rem] blur-2xl opacity-30"></div>

        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-white via-white to-pink-50/30 backdrop-blur-3xl p-16 sm:p-20 rounded-[5rem] shadow-[0_60px_140px_-20px_rgba(244,63,94,0.25)] border-4 border-transparent bg-clip-padding">
          {/* Gradient border overlay */}
          <div className="absolute inset-0 rounded-[5rem] p-[4px] bg-gradient-to-br from-rose-300 via-pink-400 to-rose-300 -z-10"></div>
          <div className="absolute inset-[4px] rounded-[calc(5rem-4px)] bg-gradient-to-br from-white via-white to-pink-50/30 backdrop-blur-3xl"></div>

          <div className="relative z-10">
            {/* Question */}
            <div className="mb-16 pt-4">
              <p className="text-5xl sm:text-6xl font-black text-slate-900 leading-tight">
                "Will you be my <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 drop-shadow-sm">
                  Valentine?"
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-2">
              {/* YES Button - Enhanced */}
              <motion.button
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 20px 60px rgba(236, 72, 153, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={nextPhase}
                className="w-56 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[2rem] font-black text-base uppercase tracking-[0.15em] shadow-2xl shadow-pink-300/50 transition-all border border-white/30 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 opacity-0"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">YES!</span>
              </motion.button>

              {/* NO Button - Full Screen Evasion */}
              <motion.button
                ref={noBtnRef}
                animate={noPosition}
                className="fixed w-44 py-4 bg-slate-100 text-slate-300 rounded-[1.5rem] font-bold text-sm uppercase tracking-widest cursor-default border border-slate-200 z-50"
                style={{
                  left: noPosition.x || '50%',
                  top: noPosition.y || '50%',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 800,
                  damping: 40,
                  duration: 0.3
                }}
              >
                NO
              </motion.button>
            </div>

            {/* Decorative Hearts */}
            <div className="mt-16 flex justify-center gap-5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.15, 0.3, 0.15] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <Heart size={26} fill="#ec4899" className="text-pink-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
