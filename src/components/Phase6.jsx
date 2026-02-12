import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, Infinity, Calendar, Music } from 'lucide-react'

export default function Phase6({ data }) {
    const [typedText, setTypedText] = useState("")
    const fullText = "Happy Anniversary Baba" // The text user requested

    // Calculate Days Together
    const startDate = data?.startDate ? new Date(data.startDate) : new Date('2022-02-14')
    const today = new Date()
    const diffTime = Math.abs(today - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    useEffect(() => {
        // 1. Audio Playback
        const audio = new Audio('/cheers.mp3')
        audio.volume = 0.5
        audio.play().catch(e => console.log("Audio autoplay blocked:", e))

        // 2. Confetti Explosion (Extended to 15 seconds)
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        // 3. Typewriter Effect
        let index = 0
        const typeInterval = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index))
                index++
            } else {
                clearInterval(typeInterval)
            }
        }, 150)

        return () => {
            clearInterval(interval)
            clearInterval(typeInterval)
            audio.pause()
        }
    }, [])

    return (
        // FIXED: Using standard robust classes. Removed "min-h-screen" relative to parent, forced full viewport height.
        // Also added explicit white background fallback.
        <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-rose-100 via-white to-pink-200 flex flex-col items-center justify-center p-4 text-center overflow-hidden z-50">

            {/* V25.0: Ambient Floating Hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-400 opacity-30"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 100,
                            scale: 0.5 + Math.random(),
                            rotate: Math.random() * 360
                        }}
                        animate={{
                            y: -200,
                            rotate: Math.random() * 360
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    >
                        <Heart size={20 + Math.random() * 40} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {/* Content Container - REMOVED initial opacity: 0 to guarantee visibility even if animation fails */}
            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">

                {/* Title Section */}
                <div className="mb-8 md:mb-12">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-6xl font-serif font-black text-rose-600 mb-4 drop-shadow-sm tracking-tight"
                    >
                        It was always you.
                    </motion.h1>

                    {/* Typewriter Text */}
                    <div className="h-8 md:h-12 flex items-center justify-center">
                        <span className="text-lg md:text-3xl font-mono text-gray-800 font-bold tracking-widest uppercase bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm">
                            {typedText}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-1 h-5 md:h-8 bg-rose-500 ml-1 align-middle"
                            />
                        </span>
                    </div>
                </div>

                {/* VISUAL CENTERPIECE: The Polaroid */}
                <motion.div
                    initial={{ rotate: -5, scale: 0.8 }}
                    animate={{ rotate: 3, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                    className="relative bg-white p-3 pb-12 md:p-5 md:pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-[280px] md:max-w-sm"
                >
                    {/* Tape Effect */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/60 rotate-[-2deg] shadow-sm backdrop-blur-sm"></div>

                    {/* The Image */}
                    <div className="aspect-square bg-gray-100 overflow-hidden mb-2 filter sepia-[0.1] contrast-105 border border-gray-100">
                        {data?.images && data.images[4] ? (
                            <img
                                src={data.images[4]}
                                alt="Us"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-pink-50 p-4">
                                <Heart className="text-pink-200 mb-2" size={32} />
                                <span className="text-xs">No Image Available</span>
                            </div>
                        )}
                    </div>

                    {/* Handwritten Note */}
                    <div className="absolute bottom-2 left-0 w-full text-center">
                        <p className="font-cursive text-2xl md:text-3xl text-gray-800 opacity-90" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                            Us &lt;3
                        </p>
                    </div>
                </motion.div>

                {/* Emotional Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-8 md:mt-12 bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-1"
                >
                    <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                        <Calendar size={12} />
                        <span>Timeline Established</span>
                    </div>
                    <p className="text-xl md:text-3xl font-serif text-gray-900">
                        Together for <b className="text-rose-600">{diffDays}</b> Days
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm italic">
                        ...and counting.
                    </p>
                </motion.div>

                {/* Audio Indicator */}
                <div className="absolute bottom-4 right-4 text-[10px] text-gray-400 flex items-center gap-1 opacity-60">
                    <Music size={10} className="animate-spin-slow" />
                    <span>Sound On</span>
                </div>

            </div>
        </div>
    )
}
