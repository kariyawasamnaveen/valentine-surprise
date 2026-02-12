import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Phase2({ nextPhase }) {
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
    const noBtnRef = useRef(null)
    const boxRef = useRef(null)

    const moveButton = () => {
        const box = boxRef.current
        const btn = noBtnRef.current
        if (!box || !btn) return

        const boxRect = box.getBoundingClientRect()
        const btnRect = btn.getBoundingClientRect()

        // Padding to keep the button away from the edges
        const padding = 20

        // The problem with relative positioning (transform) is that x=0 and y=0 
        // is where the button is naturally rendered by the layout.
        // We want the button to stay within the boxRect.

        // Let's calculate the range relative to the current center
        const maxX = (boxRect.width - btnRect.width) / 2 - padding
        const maxY = (boxRect.height - btnRect.height) / 2 - padding

        // New position within the bounds
        const newX = (Math.random() - 0.5) * maxX * 2
        const newY = (Math.random() - 0.5) * maxY * 2

        setNoPosition({ x: newX, y: newY })
    }

    return (
        <div className="fixed inset-0 bg-[#fff5f7] flex items-center justify-center sm:justify-end overflow-hidden">
            {/* Background Image - Aligned to the left for desktop, full for mobile */}
            <div
                className="absolute inset-0 sm:right-1/2 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: 'url("/proposal.png")' }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#fff5f7] hidden sm:block"></div>
                <div className="absolute inset-0 bg-black/20 sm:hidden"></div>
            </div>

            <motion.div
                ref={boxRef}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                className="z-10 bg-white/95 backdrop-blur-xl p-8 sm:p-20 rounded-none sm:rounded-l-[4rem] shadow-2xl border-l border-white/50 w-full sm:w-1/2 min-h-screen sm:min-h-0 flex flex-col justify-center text-center relative"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400"></div>

                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="p-4 bg-rose-50 rounded-full"
                    >
                        <Heart size={64} fill="#f43f5e" className="text-rose-500" />
                    </motion.div>
                </div>

                <h2 className="text-3xl sm:text-6xl font-black text-gray-800 mb-4 leading-tight">
                    System Override.
                </h2>
                <p className="text-gray-500 font-mono text-sm mb-12 uppercase tracking-[0.4em]">
                    Final_Choice: Required
                </p>

                <h3 className="text-2xl sm:text-4xl font-bold text-pink-600 mb-16 italic leading-relaxed px-4">
                    "Will you be my Valentine?"
                </h3>

                <div className="flex flex-col sm:flex-row gap-10 justify-center items-center relative h-40 sm:h-24 px-4 overflow-visible">
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextPhase}
                        className="w-56 bg-rose-500 text-white py-5 rounded-full font-black text-xl shadow-2xl shadow-rose-200 z-30 transition-all hover:bg-rose-600 active:bg-rose-700"
                    >
                        YES!
                    </motion.button>

                    <motion.button
                        ref={noBtnRef}
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onMouseEnter={moveButton}
                        onClick={moveButton}
                        className="w-56 bg-gray-50 text-gray-300 py-5 rounded-full font-bold text-xl cursor-default border border-gray-100 z-20"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        No
                    </motion.button>
                </div>

                {/* Decorative elements */}
                <div className="mt-20 flex justify-center gap-4 opacity-20">
                    {[1, 2, 3, 4, 5].map(i => <Heart key={i} size={28} className="text-rose-400" />)}
                </div>
            </motion.div>
        </div>
    )
}
