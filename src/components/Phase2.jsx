import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

        // We want the button to stay within the white card
        // The button starts at its center (relative to its parent)
        // We calculate the available space inside the card relative to the button's starting position

        const padding = 40
        const maxX = (cardRect.width / 2) - (btnRect.width / 2) - padding
        const maxY = (cardRect.height / 2) - (btnRect.height / 2) - padding

        // Generate random coordinates within the allowed range
        const newX = (Math.random() - 0.5) * maxX * 2
        const newY = (Math.random() - 0.5) * maxY * 2

        setNoPosition({ x: newX, y: newY })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-[#fffafa]">
            {/* Background Anime Image - Softened and integrated */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-40 sm:opacity-50"
                style={{ backgroundImage: 'url("/proposal.png")' }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80"></div>
            </div>

            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 bg-white/90 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 max-w-lg w-full text-center relative overflow-hidden"
            >
                {/* Premium Top Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-300 via-rose-500 to-pink-300"></div>

                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="p-3 bg-rose-50 rounded-2xl"
                    >
                        <Heart size={32} fill="#f43f5e" className="text-rose-500" />
                    </motion.div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
                    System Override.
                </h2>
                <p className="text-gray-400 font-mono text-[10px] mb-8 uppercase tracking-[0.4em]">
                    Priority_Status: High
                </p>

                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-12 italic">
                    "Will you be my Valentine?"
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative h-32 sm:h-16">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextPhase}
                        className="w-36 bg-rose-500 text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-rose-200 z-30 transition-all hover:bg-rose-600 active:bg-rose-700"
                    >
                        YES!
                    </motion.button>

                    <motion.button
                        ref={noBtnRef}
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onMouseEnter={moveButton}
                        onClick={moveButton}
                        className="w-36 bg-gray-50 text-gray-300 py-3 rounded-2xl font-semibold text-sm cursor-default border border-gray-100 z-20"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                        No
                    </motion.button>
                </div>

                {/* Decorative elements */}
                <div className="mt-10 flex justify-center gap-1.5 opacity-10">
                    {[1, 2, 3, 4, 5].map(i => <Heart key={i} size={16} className="text-rose-500 fill-current" />)}
                </div>
            </motion.div>
        </div>
    )
}
