import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShieldCheck, Bug } from 'lucide-react'

const Butterfly = ({ id }) => {
    const [position, setPosition] = useState({
        x: Math.random() * 40 + 60, // Start in the right half
        y: Math.random() * 100
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition({
                x: Math.random() * 40 + 60,
                y: Math.random() * 100
            })
        }, 5000 + Math.random() * 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={false}
            animate={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 10, ease: "easeInOut" }}
            className="absolute z-0 pointer-events-none opacity-40"
        >
            <motion.div
                animate={{ rotateY: [0, 60, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
            >
                <Bug size={24} className="text-cyan-400 -rotate-45" />
            </motion.div>
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

        const p = 40
        const maxX = (cardRect.width / 2) - (btnRect.width / 2) - p
        const maxY = (cardRect.height / 2) - (btnRect.height / 2) - p

        const newX = (Math.random() - 0.5) * maxX * 2
        const newY = (Math.random() - 0.5) * maxY * 2

        setNoPosition({ x: newX, y: newY })
    }

    return (
        <div className="fixed inset-0 bg-[#020617] flex items-center justify-center overflow-hidden">
            {/* Background Anime Image - Exact position as before */}
            <div
                className="absolute inset-0 bg-no-repeat transition-all duration-700 pointer-events-none"
                style={{
                    backgroundImage: 'url("/proposal.png")',
                    backgroundSize: '85%',
                    backgroundPosition: 'left center',
                    width: '100vw',
                    height: '100vh',
                    opacity: 0.8
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#020617]"></div>
            </div>

            {/* Midnight Blue Area with Butterflies */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-[#1e40af]/30 to-black/80 pointer-events-none">
                {[...Array(6)].map((_, i) => <Butterfly key={i} id={i} />)}
            </div>

            {/* The Overlapping Decision Card */}
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: -80 }} // Shifted left to overlap the image
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="z-10 bg-white/95 backdrop-blur-xl p-10 sm:p-14 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-4 border-cyan-400/20 max-w-md w-[90%] sm:w-[30rem] text-center relative ml-auto mr-0 sm:mr-32"
            >
                {/* Glow Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-cyan-500/20 blur-xl rounded-[4rem] -z-10"></div>

                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="p-4 bg-cyan-50 rounded-[2rem] shadow-inner"
                    >
                        <ShieldCheck size={40} className="text-cyan-600" />
                    </motion.div>
                </div>

                <h2 className="text-2xl font-black text-slate-800 mb-2">AUTH_OVERRIDE</h2>
                <p className="text-cyan-600 font-mono text-[10px] mb-10 uppercase tracking-[0.5em] font-bold">
                    Heart_Protocols: Active
                </p>

                <div className="mb-14">
                    <h3 className="text-xl font-medium text-slate-500 mb-4 italic">Critical Pending Request...</h3>
                    <p className="text-4xl font-black leading-tight">
                        <span className="text-slate-800">"Will you be my"</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 drop-shadow-sm">
                            Valentine?
                        </span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center relative h-48 sm:h-20 px-8">
                    <motion.button
                        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(236,72,153,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextPhase}
                        className="w-full sm:w-44 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all border border-white/20"
                    >
                        YES!
                    </motion.button>

                    <motion.button
                        ref={noBtnRef}
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onMouseEnter={moveButton}
                        onClick={moveButton}
                        className="w-full sm:w-44 bg-slate-50 text-slate-300 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest cursor-default border border-slate-100 z-20"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        No
                    </motion.button>
                </div>

                {/* Small decorative hearts at the bottom */}
                <div className="mt-14 flex justify-center gap-3 opacity-30">
                    <Heart size={18} fill="#06b6d4" className="text-cyan-500" />
                    <Heart size={18} fill="#ec4899" className="text-pink-500" />
                    <Heart size={18} fill="#06b6d4" className="text-cyan-500" />
                </div>
            </motion.div>

            {/* Floating particles for the blue area */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-300 rounded-full"
                        initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                        animate={{ y: [null, "-20%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                    />
                ))}
            </div>
        </div>
    )
}
