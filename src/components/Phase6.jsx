import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Calendar, Music, Stars } from 'lucide-react'

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

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

    const handleMouseMove = (e) => {
        if (!ref.current) return
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

        // 2. Cohesive Confetti System
        const duration = 25 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 30 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#f43f5e', '#FFC0CB', '#FFF', '#eab308']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#f43f5e', '#FFC0CB', '#FFF', '#eab308']
            });
        }, 350);

        // 3. Typewriter
        let index = 0
        const typeInterval = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index))
                index++
            } else {
                clearInterval(typeInterval)
            }
        }, 120)

        return () => {
            clearInterval(interval)
            clearInterval(typeInterval)
            audio.pause()
        }
    }, [])

    return (
        <div className="fixed inset-0 w-full h-screen bg-[#070205] text-zinc-300 overflow-hidden flex flex-col justify-between py-6 px-4 text-center font-mono z-50">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                <div className="w-full h-full bg-[linear-gradient(rgba(244,63,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#070205_100%)]" />
            </div>

            {/* Glowing Mesh Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-rose-950/20 to-purple-950/20 blur-[130px] rounded-full mix-blend-screen" />
                
                {/* Floating Stars */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute text-rose-500/10 pointer-events-none"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: "110%",
                            scale: Math.random() * 0.4 + 0.2
                        }}
                        animate={{
                            y: "-10%",
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 8 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Stars size={40} />
                    </motion.div>
                ))}
            </div>

            {/* TOP HEADER */}
            <div className="w-full flex flex-col items-center z-10 pt-2">
                <motion.h1
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 drop-shadow-[0_2px_15px_rgba(244,63,94,0.3)]"
                >
                    It was always you.
                </motion.h1>

                {/* Cyber Typewriter */}
                <div className="h-6 flex items-center justify-center mt-1">
                    <span className="text-xs sm:text-sm font-bold text-rose-300 uppercase tracking-widest drop-shadow-md">
                        {typedText}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-[2px] h-3.5 bg-rose-500 ml-1.5 align-middle shadow-[0_0_8px_#f43f5e]"
                        />
                    </span>
                </div>
            </div>

            {/* MIDDLE 3D INTERACTIVE POLAROID */}
            <div className="w-full flex-1 flex items-center justify-center relative z-10 py-2">
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative bg-[#0d0408]/90 border border-rose-500/25 p-3 pb-8 shadow-[0_15px_45px_rgba(244,63,94,0.15)] rounded-2xl w-full max-w-[180px] sm:max-w-[240px] cursor-grab active:cursor-grabbing backdrop-blur-md"
                >
                    {/* Gloss sheen overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20 pointer-events-none rounded-2xl" />

                    {/* Cyber Neon Tape */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-rose-500/20 border border-rose-500/40 rotate-[-1.5deg] shadow-md backdrop-blur-sm z-30 flex items-center justify-center">
                        <span className="text-[6px] text-rose-400 font-bold uppercase tracking-widest">OK_SYNC</span>
                    </div>

                    {/* Image viewport */}
                    <div className="aspect-square bg-zinc-950 overflow-hidden mb-2.5 border border-rose-950/60 rounded-lg relative z-10">
                        {data?.images && data.images[4] ? (
                            <img
                                src={data.images[4]}
                                alt="Us"
                                className="w-full h-full object-cover filter contrast-[1.05] saturate-[1.1]"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-rose-500 bg-[#12060c]">
                                <Heart className="text-rose-500/30 mb-2" size={24} />
                                <span className="text-[9px] uppercase">Image Empty</span>
                            </div>
                        )}
                    </div>

                    {/* Handwritten signature */}
                    <div className="text-center transform translate-z-10 mt-1">
                        <p className="text-xl sm:text-2xl text-rose-300 opacity-90" style={{ fontFamily: '"Brush Script MT", "Comic Sans MS", cursive' }}>
                            Us &lt;3
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* BOTTOM HUD TIMELINE STATISTICS */}
            <div className="w-full flex flex-col items-center z-10 pb-2">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="bg-[#0d0408]/85 border border-rose-500/20 p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col items-center gap-1.5 backdrop-blur-md max-w-sm w-full"
                >
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">
                        <Calendar size={12} className="text-rose-500" />
                        <span>Timeline Established</span>
                    </div>
                    <p className="text-base sm:text-lg text-white font-sans">
                        Together for <b className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">{diffDays}</b> Days
                    </p>
                    <div className="h-[1px] w-12 bg-rose-950 mt-0.5" />
                </motion.div>

                {/* Subtle Audio Status indicator */}
                <div className="text-[8px] text-zinc-600 flex items-center gap-1.5 mt-3 uppercase tracking-wider">
                    <Music size={8} className="animate-pulse text-rose-500" />
                    <span>Background Sound Active</span>
                </div>
            </div>
        </div>
    )
}
