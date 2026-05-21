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

    const distance = Math.floor(Math.sqrt(
      Math.pow(mousePos.x - btnCenterX, 2) +
      Math.pow(mousePos.y - btnCenterY, 2)
    ))

    // 100% Accurate Debug Logging
    console.log(`[DEBUG] Distance: ${distance}px | Mouse: (${Math.floor(mousePos.x)}, ${Math.floor(mousePos.y)}) | Button: (${Math.floor(btnCenterX)}, ${Math.floor(btnCenterY)}) | Status: ${distance < 220 ? '🔴 TRIGGERING ESCAPE' : '🟢 SAFE'}`);

    // Highly Responsive Proximity Detection (220px) - escapes even before user can approach
    if (distance < 220) {
      setIsButtonMoving(true)
      moveButtonToSafeZone()
      setTimeout(() => setIsButtonMoving(false), 150) // Ultra fast cooldown for persistent dodging
    }
  }, [mousePos, isButtonMoving])

  // Reset button if mouse leaves window
  useEffect(() => {
    const handleMouseLeave = () => {
      console.log("[DEBUG] Mouse left window - Resetting NO button position");
      setNoPosition({ x: 0, y: 0 }); // 0 triggers the fallback calculation in style
    };
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => window.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const moveButtonToSafeZone = () => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const buttonWidth = 144 // w-36
    const buttonHeight = 48
    const SCREEN_PADDING = 50 // Safe room to move

    // Calculate the boundaries carefully
    const minX = SCREEN_PADDING
    const maxX = Math.max(minX, viewportWidth - buttonWidth - SCREEN_PADDING)
    const minY = SCREEN_PADDING
    const maxY = Math.max(minY, viewportHeight - buttonHeight - SCREEN_PADDING)

    let newX, newY, distFromMouse
    let attempts = 0

    // Smarter random placement to make sure it teleports away from the mouse
    do {
      newX = Math.random() * (maxX - minX) + minX
      newY = Math.random() * (maxY - minY) + minY

      distFromMouse = Math.sqrt(
        Math.pow(newX + buttonWidth / 2 - mousePos.x, 2) +
        Math.pow(newY + buttonHeight / 2 - mousePos.y, 2)
      )
      attempts++
    } while (distFromMouse < 350 && attempts < 30) // Ensure it is far away from the mouse cursor

    setNoPosition({ x: newX, y: newY })
  }

  return (
    <div className="fixed inset-0 bg-[#0d0408] flex items-center justify-center lg:justify-end lg:pr-24 overflow-hidden font-sans">
      {/* Background Anime Image with Dark Romantic Theme Overlay */}
      <div
        className="absolute inset-0 bg-no-repeat pointer-events-none z-0 transition-all duration-700"
        style={{
          backgroundImage: 'url("/proposal.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
          opacity: 0.85
        }}
      >
        {/* Breathtaking Romantic Lighting Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#0d0408]/65 to-[#0d0408]/95"></div>
      </div>

      {/* Floating Sparkles & Hearts (Ambient Animation) */}
      <div className="absolute inset-0 pointer-events-none z-1">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-pink-400 rounded-full opacity-40 blur-[1px]"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -120],
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7
            }}
          />
        ))}
      </div>

      {/* Premium Decision Card */}
      <div
        ref={cardRef}
        className="z-10 relative max-w-lg w-[90%] md:w-[500px]"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-rose-500/25 to-purple-500/25 rounded-[3rem] blur-3xl"></div>

        <div
          className="relative p-10 sm:p-14 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(244,63,94,0.3)] border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(29, 9, 20, 0.85) 0%, rgba(13, 4, 8, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Soft pulsing heart logo */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="mb-8 p-4 bg-pink-500/10 rounded-full border border-pink-500/20"
            >
              <Heart size={36} fill="#ec4899" className="text-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.5)]" />
            </motion.div>

            <div className="mb-12">
              <p className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-wide font-serif">
                Will you be my <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 drop-shadow-[0_2px_10px_rgba(244,63,94,0.35)]">Valentine?</span>
              </p>
            </div>

            <div className="flex flex-row gap-6 justify-center items-center w-full">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={nextPhase}
                className="w-36 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full font-black text-sm uppercase tracking-widest transition-all border border-pink-400/30 relative overflow-hidden"
              >
                <span className="relative z-10">YES!</span>
              </motion.button>
            </div>

            <div className="mt-12 flex justify-center gap-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                >
                  <Heart size={18} fill="#f43f5e" className="text-rose-500 opacity-60" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NO Button - Dynamic fleeing with spring dynamics */}
      <AnimatePresence>
        <motion.button
          ref={noBtnRef}
          key="no-button"
          animate={{
            x: noPosition.x || 0,
            y: noPosition.y || 0,
            opacity: 1
          }}
          className="fixed w-36 py-3.5 bg-gradient-to-r from-zinc-800 to-zinc-900 text-zinc-400 rounded-full font-black text-sm uppercase tracking-widest cursor-default border border-zinc-700/50 shadow-2xl z-[150] select-none pointer-events-auto"
          style={{
            left: noPosition.x ? 0 : 'calc(50% + 40px)',
            top: noPosition.y ? 0 : 'calc(50% + 56px)',
            position: 'fixed'
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 25,
            duration: 0.4
          }}
        >
          NO
        </motion.button>
      </AnimatePresence>
    </div>
  )
}
