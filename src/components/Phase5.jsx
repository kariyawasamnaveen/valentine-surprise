import { motion } from 'framer-motion'
import { Heart, Link as LinkIcon, Sparkles } from 'lucide-react'

export default function Phase5({ data, nextPhase }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 text-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono">
            {/* V23.0: Brighter Rosy Background Particles */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.1),transparent_70%)]"></div>
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-500"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0.5 + Math.random()
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Heart size={50 + Math.random() * 100} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 w-full max-w-6xl text-center flex flex-col items-center"
            >
                {/* Header Section */}
                <div className="mb-16 md:mb-20">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="inline-flex items-center justify-center p-5 bg-green-100 text-green-600 rounded-full mb-6 shadow-xl shadow-green-200"
                    >
                        <Sparkles size={40} />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 drop-shadow-sm">
                        Authentication Successful!
                    </h2>
                    <div className="mt-3 flex items-center justify-center gap-2 text-gray-500 font-bold tracking-widest text-sm md:text-base">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                        Status: Permanently Connected
                    </div>
                </div>

                {/* V23.0: Main Linkage Display (Wider & Larger) */}
                <div className="relative w-full flex justify-between items-center h-[300px] mb-20 px-4 md:px-20">

                    {/* Connecting Line Layer */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full px-10 md:px-32 z-0">
                        {/* Base Line */}
                        <div className="h-1 bg-gray-200 w-full rounded-full overflow-hidden relative">
                            {/* Animated Gradient Line */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400 w-full relative"
                            >
                                {/* Moving Sparkle on Line */}
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 right-0 w-20 h-20 bg-rose-500/30 blur-xl rounded-full"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                            </motion.div>
                        </div>

                        {/* Central Heart Node (New V23.0 Feature) */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.5, type: "spring" }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-[0_0_40px_rgba(244,63,94,0.4)] border-4 border-rose-100"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="text-rose-500"
                            >
                                <Heart size={48} fill="currentColor" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Left Image: YOU (Significantly Larger x2) */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="w-40 h-40 md:w-64 md:h-64 rounded-full border-[6px] md:border-[8px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative z-10 bg-gray-100 flex-shrink-0"
                    >
                        <img
                            src={data.images[2]}
                            alt="You"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md text-xs font-bold text-gray-400 uppercase tracking-widest border border-gray-100">
                            Source
                        </div>
                    </motion.div>

                    {/* Right Image: HER (Significantly Larger x2) */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="w-40 h-40 md:w-64 md:h-64 rounded-full border-[6px] md:border-[8px] border-white shadow-[0_20px_50px_rgba(244,63,94,0.25)] relative z-10 bg-gray-100 flex-shrink-0"
                    >
                        <img
                            src={data.images[3]}
                            alt="Her"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-rose-50 px-4 py-1 rounded-full shadow-md text-xs font-bold text-rose-500 uppercase tracking-widest border border-rose-100">
                            Destination
                        </div>
                    </motion.div>
                </div>

                <div className="max-w-xl mx-auto mb-12">
                    <p className="text-xl md:text-2xl text-rose-600 font-bold italic font-serif leading-relaxed">
                        "Two different worlds, one active connection."
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244,63,94,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextPhase}
                    className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-16 py-5 rounded-full font-black text-lg md:text-xl uppercase tracking-[0.2em] shadow-2xl shadow-rose-200 flex items-center gap-4 transition-all"
                >
                    <LinkIcon size={24} />
                    Complete Linkage
                </motion.button>
            </motion.div>
        </div>
    )
}
