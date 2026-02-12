import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShieldCheck } from 'lucide-react'

// Butterfly component with a proper butterfly SVG
const Butterfly = ({ id }) => {
    const [position, setPosition] = useState({
        x: Math.random() * 30 + 65, // Position in the right gap
        y: Math.random() * 100
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition({
                x: Math.random() * 30 + 65,
                y: Math.random() * 100
            })
        }, 6000 + Math.random() * 6000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={false}
            animate={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                rotate: [0, 15, -15, 0]
            }}
            transition={{ duration: 12, ease: "easeInOut" }}
            className="absolute z-0 pointer-events-none opacity-50"
        >
            <motion.svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ scaleX: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
            >
                {/* Butterfly SVG Path */}
                <path
                    d="M12 20C12 20 12 18 11 17C10 16 8 16 6 17C4 18 3 17 3 15C3 13 4 11 6 10C8 9 10 9 11 10C12 11 12 13 12 13M12 20C12 20 12 18 13 17C14 16 16 16 18 17C20 18 21 17 21 15C21 13 20 11 18 10C16 9 14 9 13 10C12 11 12 13 12 13M12 13V7M12 7C12 7 11 6 11 5C11 4 12 3 12 3M12 7C12 7 13 6 13 5C13 4 12 3 12 3"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 13C12 13 11 15 9 16C7 17 6 16 6 14C6 12 7 11 9 10M12 13C12 13 13 15 15 16C17 17 18 16 18 14C18 12 17 11 15 10"
                    fill="#22d3ee"
                    fillOpacity="0.2"
                />
            </motion.svg>
        </motion.div>
    )
}

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

        // Padding inside the card
        const p = 40
        const maxX = (cardRect.width / 2) - (btnRect.width / 2) - p
        const maxY = (cardRect.height / 2) - (btnRect.height / 2) - p

        const newX = (Math.random() - 0.5) * maxX * 2
        const newY = (Math.random() - 0.5) * maxY * 2

        setNoPosition({ x: newX, y: newY })
    }

    return (
        <div className="fixed inset-0 bg-[#0f172a] flex items-center justify-center sm:justify-end overflow-hidden">
            {/* Background Anime Image - Zoomed out and Left Aligned */}
            <div
                className="absolute inset-0 bg-no-repeat transition-all duration-700 pointer-events-none"
                style={{
                    backgroundImage: 'url("/proposal.png")',
                    backgroundSize: '85%',
                    backgroundPosition: 'left center',
                    width: '100vw',
                    height: '100vh',
                    opacity: 0.9
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0f172a]"></div>
            </div>

            {/* Midnight Blue Area with Butterflies */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-900/40 to-slate-950/90 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => <Butterfly key={i} id={i} />)}
            </div>

            {/* The Decision Card - Overlapping slightly */}
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: -60 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="z-10 bg-white/95 backdrop-blur-md p-10 sm:p-14 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-cyan-100 sm:mr-24 max-w-md w-[90%] sm:w-[30rem] text-center relative"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400"></div>

                <div className="flex justify-center mb-8">
                    <div className="p-3 bg-cyan-50 rounded-2xl">
                        <ShieldCheck size={36} className="text-cyan-600" />
                    </div>
                </div>

                <h2 className="text-2xl font-black text-slate-800 mb-2">AUTH_OVERRIDE</h2>
                <p className="text-cyan-600 font-mono text-[10px] mb-10 uppercase tracking-[0.5em] font-bold">
                    Heart_Protocols: Ready
                </p>

                <div className="mb-14">
                    <h3 className="text-xl font-medium text-slate-500 mb-4 italic">Final Request...</h3>
                    <p className="text-4xl font-black text-slate-900 leading-tight">
                        "Will you be my <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Valentine?"</span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative h-40 sm:h-20 sm:px-4">
                    <motion.button
                        whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(236,72,153,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextPhase}
                        className="w-44 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl z-30 transition-all"
                    >
                        YES!
                    </motion.button>

                    <motion.button
                        ref={noBtnRef}
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onMouseEnter={moveButton}
                        onClick={moveButton}
                        className="w-44 bg-slate-50 text-slate-300 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest cursor-default border border-slate-100 z-20"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        No
                    </motion.button>
                </div>

                <div className="mt-12 flex justify-center gap-3 opacity-20">
                    <Heart size={16} fill="#ec4899" className="text-pink-500" />
                    <Heart size={16} fill="#22d3ee" className="text-cyan-400" />
                    <Heart size={16} fill="#ec4899" className="text-pink-500" />
                </div>
            </motion.div>
        </div>
    )
}
