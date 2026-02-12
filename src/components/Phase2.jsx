import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Phase2({ nextPhase }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isButtonMoving, setIsButtonMoving] = useState(false)
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
    if (!btn || isButtonMoving) return

    const btnRect = btn.getBoundingClientRect()
    const btnCenterX = btnRect.left + btnRect.width / 2
    const btnCenterY = btnRect.top + btnRect.height / 2

    const distance = Math.sqrt(
      Math.pow(mousePos.x - btnCenterX, 2) +
      Math.pow(mousePos.y - btnCenterY, 2)
    )

    // If mouse is within 180px, teleport button to a safe zone
    if (distance < 180) {
      setIsButtonMoving(true)
      moveButtonToSafeZone()
      // Reset moving state after animation completes
      setTimeout(() => setIsButtonMoving(false), 700)
    }
  }, [mousePos, isButtonMoving])

  const moveButtonToSafeZone = () => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const buttonWidth = 176
    const buttonHeight = 56
    const padding = 40

    // ALL 8 SAFE ZONES ENABLED
    const safeZones = [
      { x: padding, y: padding },
      { x: viewportWidth - buttonWidth - padding, y: padding },
      { x: padding, y: viewportHeight - buttonHeight - padding },
      { x: viewportWidth - buttonWidth - padding, y: viewportHeight - buttonHeight - padding },
      { x: padding, y: viewportHeight / 2 - buttonHeight / 2 },
      { x: viewportWidth - buttonWidth - padding, y: viewportHeight / 2 - buttonHeight / 2 },
      { x: viewportWidth / 2 - buttonWidth / 2, y: padding },
      { x: viewportWidth / 2 - buttonWidth / 2, y: viewportHeight - buttonHeight - padding },
    ]

    const randomZone = safeZones[Math.floor(Math.random() * safeZones.length)]
    setNoPosition(randomZone)
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#fef2f4] via-[#fff5f7] to-white flex items-start justify-center sm:justify-end pt-20 overflow-hidden">
      {/* Background Anime Image */}
      <div
        className="absolute inset-0 bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/proposal.png")',
          backgroundSize: '85%',
          backgroundPosition: 'calc(0% - 120px) center',
          width: '100vw',
          height: '100vh',
          opacity: 0.85
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50/10 to-white/50"></div>
      </div>

      {/* Premium Decision Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: 100, scale: 0.95 }}
        animate={{ opacity: 1, x: -40, scale: 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
        className="z-10 relative sm:mr-20 max-w-2xl w-[92%] sm:w-[750px]"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-rose-200/15 via-pink-200/15 to-rose-200/15 rounded-[5rem] blur-3xl"></div>

        <div
          className="relative p-16 sm:p-20 rounded-[5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)]"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            className="absolute inset-0 rounded-[5rem] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(254,242,244,0.4) 100%)',
            }}
          ></div>

          <div className="relative z-10">
            <div className="mb-16 pt-4">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                "Will you be my <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 drop-shadow-sm">Valentine?"</span>
              </p>
            </div>

            <div className="flex flex-row gap-6 justify-center items-center mb-2">
              <motion.button
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 20px 60px rgba(236, 72, 153, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={nextPhase}
                className="w-36 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-pink-300/50 transition-all border border-white/30 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 opacity-0"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">YES!</span>
              </motion.button>

              {/* NO Button - Always Visible with AnimatePresence */}
              <AnimatePresence>
                <motion.button
                  ref={noBtnRef}
                  key="no-button"
                  animate={{ ...noPosition, opacity: 1 }}
                  className="fixed w-36 py-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest cursor-default border-2 border-rose-500 shadow-2xl shadow-pink-400/60 z-[150]"
                  style={{
                    left: noPosition.x || 'calc(50% + 170px)',
                    top: noPosition.y || 'calc(20vh + 80px)', // Align with card at top
                  }}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: 0.7,
                    opacity: { duration: 0 }
                  }}
                >
                  NO
                </motion.button>
              </AnimatePresence>
            </div>

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
