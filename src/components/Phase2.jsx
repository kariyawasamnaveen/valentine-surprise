import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

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

        // Space for movement inside the card
        const padding = 40
        const maxX = (cardRect.width / 2) - (btnRect.width / 2) - padding
        const maxY = (cardRect.height / 2) - (btnRect.height / 2) - padding

        const newX = (Math.random() - 0.5) * maxX * 2
        const newY = (Math.random() - 0.5) * maxY * 2

        setNoPosition({ x: newX, y: newY })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center sm:justify-end bg-[#0f172a] overflow-hidden sm:px-16">
            {/* Background Anime Image - Zoomed out and integrated */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-100"
                style={{ backgroundImage: 'url("/proposal.png")' }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-transparent to-[#0f172a]/60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/40 via-transparent to-transparent hidden sm:block"></div>
                <div className="absolute inset-0 backdrop-blur-[2px]"></div>
            </div>

            {/* Main Glass Card */}
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="z-10 bg-white/10 backdrop-blur-3xl p-10 sm:p-16 rounded-[4rem] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.5)] border border-white/20 max-w-xl w-[90%] sm:w-[35rem] text-center relative overflow-hidden"
            >
                {/* Animated Color Glows */}
                <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-pink-500/30 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-64 h-64 bg-rose-600/30 rounded-full blur-[100px] animate-pulse delay-700"></div>

                <div className="flex justify-center mb-10">
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="p-5 bg-gradient-to-br from-pink-500/20 to-rose-600/20 rounded-[2rem] border border-white/20 shadow-inner"
                    >
                        <Heart size={48} fill="#f43f5e" className="text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                    </motion.div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 group transition-all hover:bg-white/10">
                    <Sparkles size={14} className="text-pink-400" />
                    <span className="text-[10px] font-black text-rose-300 uppercase tracking-[0.4em]">Resource Priority: Critical</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tighter">
                    System Override.
                </h2>

                <h3 className="text-2xl sm:text-3xl font-medium text-white/90 mb-16 leading-relaxed italic">
                    "Will you be my <br />
                    <span className="relative inline-block mt-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-500 to-rose-700 font-black not-italic text-4xl sm:text-5xl">
                            Valentine?
                        </span>
                        <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-pink-500/30 blur-sm rounded-full"></div>
                    </span>
                    "
                </h3>

                <div className="flex flex-col sm:flex-row gap-10 justify-center items-center relative h-48 sm:h-20 sm:px-8">
                    <motion.button
                        whileHover={{
                            scale: 1.08,
                            boxShadow: "0 0 40px rgba(244,63,94,0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextPhase}
                        className="w-full sm:w-44 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] z-30 transition-all border border-white/20 shadow-xl"
                    >
                        Yes!
                    </motion.button>

                    <motion.button
                        ref={noBtnRef}
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onMouseEnter={moveButton}
                        onClick={moveButton}
                        className="w-full sm:w-44 bg-white/5 hover:bg-white/10 text-white/30 py-4 rounded-[1.5rem] font-bold text-sm uppercase tracking-[0.2em] cursor-default border border-white/10 z-20 backdrop-blur-md"
                        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    >
                        No
                    </motion.button>
                </div>

                {/* Footer decorations */}
                <div className="mt-16 flex justify-center items-center gap-6">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20"></div>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-rose-500/40 rounded-full animate-pulse shadow-[0_0_5px_rgba(244,63,94,0.5)]"></div>)}
                    </div>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20"></div>
                </div>
            </motion.div>
        </div>
    )
}
