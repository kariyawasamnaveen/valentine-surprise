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

        // Padding to keep the button away from the card edges
        const padding = 30

        // Calculate max allowed movement from center
        const maxX = (cardRect.width / 2) - (btnRect.width / 2) - padding
        const maxY = (cardRect.height / 2) - (btnRect.height / 2) - padding

        // Generate random coordinates within the card bounds
        const newX = (Math.random() - 0.5) * maxX * 2
        const newY = (Math.random() - 0.5) * maxY * 2

        setNoPosition({ x: newX, y: newY })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0f172a] overflow-hidden">
            {/* Dynamic Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-110"
                style={{ backgroundImage: 'url("/proposal.png")' }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-[#0f172a]/80"></div>
                <div className="absolute inset-0 backdrop-blur-[4px]"></div>
            </div>

            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 bg-white/10 backdrop-blur-3xl p-10 sm:p-14 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/20 max-w-md w-[85%] sm:w-full text-center relative"
            >
                {/* Subtle Glow Effect */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-[80px]"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-rose-500/20 rounded-full blur-[80px]"></div>

                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            filter: ["drop-shadow(0 0 0px rgba(244,63,94,0))", "drop-shadow(0 0 15px rgba(244,63,94,0.5))", "drop-shadow(0 0 0px rgba(244,63,94,0))"]
                        }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="p-4 bg-white/5 rounded-full border border-white/10"
                    >
                        <Heart size={40} fill="#f43f5e" className="text-rose-500" />
                    </motion.div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                    System Override.
                </h2>
                <p className="text-rose-400/60 font-mono text-[9px] mb-10 uppercase tracking-[0.6em]">
                    Priority_Status: Critical_Action
                </p>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-16 leading-relaxed">
                    Will you be my <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">
                        Valentine?
                    </span>
                </h3>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative h-40 sm:h-20 px-4">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244,63,94,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextPhase}
                        className="w-40 bg-gradient-to-br from-rose-500 to-pink-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest z-30 transition-all border border-white/10"
                    >
                        YES!
                    </motion.button>

                    <motion.button
                        ref={noBtnRef}
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onMouseEnter={moveButton}
                        onClick={moveButton}
                        className="w-40 bg-white/5 hover:bg-white/10 text-white/40 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest cursor-default border border-white/5 z-20 backdrop-blur-sm"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        No
                    </motion.button>
                </div>

                {/* Floating background details */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1 opacity-20">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full"></div>)}
                </div>
            </motion.div>
        </div>
    )
}
