import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Phase2({ nextPhase }) {
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
    const noBtnRef = useRef(null)
    const containerRef = useRef(null)

    const moveButton = () => {
        if (!containerRef.current) return
        const container = containerRef.current.getBoundingClientRect()

        // Generate random position within container bounds, keeping padding
        const padding = 100
        const x = Math.random() * (container.width - padding * 2) - (container.width / 2 - padding)
        const y = Math.random() * (container.height - padding * 2) - (container.height / 2 - padding)

        setNoPosition({ x, y })

        // Play a subtle sound if we had audio assets, or trigger a haptic/visual feedback
    }

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center justify-center min-h-screen p-6 relative bg-gray-50 text-gray-900"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 bg-white p-12 rounded-3xl shadow-xl border border-pink-100 max-w-xl w-full text-center relative overflow-hidden"
            >
                {/* Subtle Decorative Hearts */}
                <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                    <Heart size={80} fill="#ec4899" className="text-pink-500" />
                </div>
                <div className="absolute bottom-0 left-0 p-4 opacity-10 -rotate-12">
                    <Heart size={60} fill="#ec4899" className="text-pink-500" />
                </div>

                <div className="bg-green-50 text-green-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-6 border border-green-100">
                    Authorization Successful
                </div>

                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Wait! One more thing...
                </h2>

                <p className="text-lg text-gray-600 mb-12">
                    All system protocols are green, but a pending personal request remains:
                    <span className="block mt-4 text-2xl font-black text-pink-600 underline decoration-pink-200">
                        Will you be my Valentine?
                    </span>
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center h-20">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextPhase}
                        className="w-40 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-bold shadow-lg shadow-pink-600/30 transition-shadow"
                    >
                        YES! ❤️
                    </motion.button>

                    <motion.button
                        ref={noBtnRef}
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onMouseEnter={moveButton}
                        onClick={moveButton} // Just in case they somehow tap it on mobile
                        className="w-40 bg-gray-200 text-gray-400 py-3 rounded-full font-bold cursor-default pointer-events-auto sm:absolute sm:z-20"
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        No
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}
