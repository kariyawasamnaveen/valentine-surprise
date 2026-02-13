import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, Calendar, Music, Stars } from 'lucide-react'

export default function Phase6({ data }) {
    const [typedText, setTypedText] = useState("")
    const fullText = "Happy Anniversary Baba"

    // Calculate Days Together
    const startDate = data?.startDate ? new Date(data.startDate) : new Date('2022-02-14')
    const today = new Date()
    const diffTime = Math.abs(today - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // 3D Tilt Logic
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    useEffect(() => {
        // 1. Audio
        const audio = new Audio('/cheers.mp3')
        if (data?.audio) audio.src = data.audio // Fallback if data provides it
        audio.volume = 0.5
        audio.play().catch(e => console.log("Audio autoplay blocked:", e))

        // 2. MASSIVE Confetti Explosion (40 Seconds)
        const duration = 40 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            // Gold & Rose Particles - Increased Count for "Filling" effect
            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#FFD700', '#FFC0CB', '#FFF', '#E91E63']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#FFD700', '#FFC0CB', '#FFF', '#E91E63']
            });
        }, 250);

        // 3. Typewriter
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
        // COMPACT SINGLE PAGE: Fixed Height, Flex Column, Justify Evenly
        <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-evenly p-4 text-center overflow-hidden z-50 font-sans">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-900 via-pink-900 to-black z-0 animate-gradient-xy"></div>

            {/* Animated Mesh Gradient Overlay */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-transparent z-0"></div>

            {/* LAYER 1: Floating Hearts (Filling the Void) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={`heart-${i}`}
                        className="absolute text-rose-500/40"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 100,
                            scale: Math.random() * 0.8 + 0.3,
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
                        <Heart size={20 + Math.random() * 50} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {/* LAYER 2: Shooting Stars (Gold Dust) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute text-yellow-200/60"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 100,
                            scale: Math.random() * 0.5 + 0.2,
                        }}
                        animate={{
                            y: -100,
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    >
                        <Stars size={10 + Math.random() * 20} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center perspective-1000 h-full justify-evenly">

                {/* Luxury Typography Title - COMPACT */}
                <div className="mb-2">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="text-4xl md:text-6xl font-serif font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200 drop-shadow-[0_2px_10px_rgba(255,105,180,0.5)]"
                    >
                        It was always you.
                    </motion.h1>

                    {/* Rose Gold Typewriter - COMPACT */}
                    <div className="h-6 md:h-10 flex items-center justify-center">
                        <span className="text-lg md:text-2xl font-serif text-rose-200 font-bold tracking-widest uppercase drop-shadow-md">
                            {typedText}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-[2px] h-4 md:h-8 bg-yellow-400 ml-2 align-middle shadow-[0_0_10px_#FFD700]"
                            />
                        </span>
                    </div>
                </div>

                {/* 3D INTERACTIVE POLAROID - REDUCED SIZE */}
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    // REDUCED SIZE: max-w-[220px] on mobile, 300px on md
                    className="relative bg-white p-3 pb-12 md:p-5 md:pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform max-w-[220px] md:max-w-[300px] cursor-grab active:cursor-grabbing"
                >
                    {/* 3D Gloss Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent z-20 pointer-events-none"></div>

                    {/* Gold Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-300/80 rotate-[-2deg] shadow-lg backdrop-blur-md z-30"></div>

                    {/* The Image */}
                    <div className="aspect-square bg-gray-900 overflow-hidden mb-2 border-2 border-gray-100 relative z-10">
                        {data?.images && data.images[4] ? (
                            <img
                                src={data.images[4]}
                                alt="Us"
                                className="w-full h-full object-cover filter contrast-110 saturate-120"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-100">
                                <Heart className="text-gray-300 mb-2" size={30} />
                                <span className="text-xs">No Image</span>
                            </div>
                        )}
                    </div>

                    {/* Handwritten Note - Real Handwriting Font Fallback */}
                    <div className="absolute bottom-3 left-0 w-full text-center z-10 transform translate-z-10">
                        <p className="text-2xl md:text-3xl text-gray-800 opacity-90" style={{ fontFamily: '"Brush Script MT", "Comic Sans MS", cursive' }}>
                            Us &lt;3
                        </p>
                    </div>
                </motion.div>

                {/* Premium Glass HUD Stats - COMPACT */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    // REMOVED 'mt-12', adjusted sizing
                    className="bg-black/30 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl flex flex-col items-center gap-1 group hover:bg-black/40 transition-colors"
                >
                    <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                        <Calendar size={12} />
                        <span>Timeline Established</span>
                    </div>
                    <p className="text-xl md:text-3xl font-serif text-white drop-shadow-lg">
                        Together for <b className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-yellow-400">{diffDays}</b> Days
                    </p>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent mt-1"></div>
                </motion.div>

                {/* Audio Indicator */}
                <div className="absolute bottom-4 right-4 text-[10px] text-yellow-100/50 flex items-center gap-2">
                    <Music size={10} className="animate-pulse" />
                    <span>Sound On</span>
                </div>

            </div>
        </div>
    )
}
