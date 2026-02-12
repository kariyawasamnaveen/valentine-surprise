import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShieldCheck } from 'lucide-react'

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
        const p = 30
        const maxX = (cardRect.width / 2) - (btnRect.width / 2) - p
        const maxY = (cardRect.height / 2) - (btnRect.height / 2) - p

        const newX = (Math.random() - 0.5) * maxX * 2
        const newY = (Math.random() - 0.5) * maxY * 2

        setNoPosition({ x: newX, y: newY })
    }

    return (
        <div className="fixed inset-0 bg-[#f8fafc] flex items-center justify-center sm:justify-end overflow-hidden">
            {/* Background Image - Zoomed out and Left Aligned */}
            <div
                className="absolute inset-0 bg-no-repeat transition-all duration-700 pointer-events-none"
                style={{
                    backgroundImage: 'url("/proposal.png")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'left center',
                    width: '100vw',
                    height: '100vh'
                }}
            >
                {/* Softening overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-[#f8fafc] hidden sm:block"></div>
                <div className="absolute inset-0 bg-white/40 sm:hidden"></div>
            </div>

            {/* The Decision Card - Moved to the Right */}
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="z-10 bg-white/95 backdrop-blur-md p-10 sm:p-14 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white sm:mr-16 max-w-md w-[90%] sm:w-[28rem] text-center relative"
            >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400"></div>

                <div className="flex justify-center mb-8">
                    <div className="p-3 bg-rose-50 rounded-2xl">
                        <ShieldCheck size={32} className="text-rose-500" />
                    </div>
                </div>

                <h2 className="text-2xl font-black text-slate-800 mb-2">Auth_Success</h2>
                <p className="text-slate-400 font-mono text-[10px] mb-10 uppercase tracking-[0.4em]">
                    Session Integrity: Verified
                </p>

                <div className="mb-14">
                    <h3 className="text-xl font-medium text-slate-600 mb-4 italic">One final request...</h3>
                    <p className="text-3xl font-black text-rose-600 leading-tight">
                        "Will you be my <br /> Valentine?"
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative h-40 sm:h-20">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextPhase}
                        className="w-40 bg-rose-600 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-rose-200 z-30 transition-all"
                    >
                        YES!
                    </motion.button>

                    <motion.button
                        ref={noBtnRef}
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onMouseEnter={moveButton}
                        onClick={moveButton}
                        className="w-40 bg-slate-50 text-slate-300 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest cursor-default border border-slate-100 z-20"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        No
                    </motion.button>
                </div>

                {/* Small decorative hearts at the bottom */}
                <div className="mt-12 flex justify-center gap-2 opacity-20">
                    <Heart size={14} fill="#f43f5e" className="text-rose-500" />
                    <Heart size={14} fill="#f43f5e" className="text-rose-500" />
                    <Heart size={14} fill="#f43f5e" className="text-rose-500" />
                </div>
            </motion.div>
        </div>
    )
}
