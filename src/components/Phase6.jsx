import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, Infinity, Calendar, Music } from 'lucide-react'

export default function Phase6({ data }) {
    const [typedText, setTypedText] = useState("")
    const fullText = "Happy Anniversary Baba" // The text user requested

    // Calculate Days Together
    const startDate = data.startDate ? new Date(data.startDate) : new Date('2022-02-14') // Fallback if empty
    const today = new Date()
    const diffTime = Math.abs(today - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    useEffect(() => {
        // 1. Audio Playback
        const audio = new Audio('/cheers.mp3')
        audio.volume = 0.5
        audio.play().catch(e => console.log("Audio autoplay blocked:", e))

        // 2. Confetti Explosion
        const duration = 5 * 1000;
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
        }, 150) // Speed of typing

        return () => {
            clearInterval(interval)
            clearInterval(typeInterval)
            audio.pause()
        }
    }, [])

    return (
        <div className="min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-pink-200 via-stone-100 to-pink-200 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative font-sans">

            {/* V25.0: Ambient Floating Hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 25 }).map((_, i) => (
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

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full max-w-2xl flex flex-col items-center"
            >
                {/* Title Section */}
                <div className="mb-10">
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-rose-600 mb-4 drop-shadow-sm tracking-tight">
                        It was always you.
                    </h1>
                    {/* Typewriter Text */}
                    <div className="h-8 md:h-12 flex items-center justify-center">
                        <span className="text-xl md:text-3xl font-mono text-gray-700 font-bold tracking-widest uppercase">
                            {typedText}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-1 h-6 md:h-8 bg-rose-500 ml-1 align-middle"
                            />
                        </span>
                    </div>
                </div>

                {/* VISUAL CENTERPIECE: The Polaroid */}
                <motion.div
                    initial={{ rotate: -5, scale: 0.8, opacity: 0 }}
                    animate={{ rotate: 3, scale: 1, opacity: 1 }}
                    transition={{ delay: 1, type: "spring", bounce: 0.4 }}
                    className="relative bg-white p-4 pb-16 md:p-6 md:pb-24 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm"
                >
                    {/* Tape Effect */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/50 rotate-[-2deg] shadow-sm backdrop-blur-sm"></div>

                    {/* The Image */}
                    <div className="aspect-square bg-gray-100 overflow-hidden mb-2 filter sepia-[0.2] contrast-110">
                        {data.images[4] ? (
                            <img
                                src={data.images[4]}
                                alt="Us"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                    </div>

                    {/* Handwritten Note */}
                    <div className="absolute bottom-4 left-0 w-full text-center">
                        <p className="font-cursive text-3xl text-gray-700 opacity-90" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                            Us &lt;3
                        </p>
                    </div>

                    {/* Gloss Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                </motion.div>

                {/* Emotional Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="mt-12 bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-lg flex flex-col items-center gap-2"
                >
                    <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-widest text-xs">
                        <Calendar size={14} />
                        <span>Timeline Established</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-serif text-gray-800">
                        Together for <b className="text-rose-600">{diffDays}</b> Days
                    </p>
                    <p className="text-gray-500 text-sm italic">
                        ...and counting.
                    </p>
                </motion.div>

                {/* Audio Indicator */}
                <div className="absolute bottom-4 right-4 text-xs text-gray-400 flex items-center gap-1 opacity-50">
                    <Music size={12} className="animate-spin-slow" />
                    <span>Sound On</span>
                </div>

            </motion.div>
        </div>
    )
}
