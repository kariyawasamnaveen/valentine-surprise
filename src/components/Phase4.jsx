import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, ChevronRight, Clock, Heart, Activity, ShieldCheck, Database } from 'lucide-react'

export default function Phase4({ data, nextPhase }) {
    const [duration, setDuration] = useState({ years: 0, months: 0, days: 0, hours: 0 })
    const [activeNode, setActiveNode] = useState(-1)
    const [lineProgress, setLineProgress] = useState(0)

    // Calculate Duration
    useEffect(() => {
        if (!data.startDate) return
        const calculateTime = () => {
            const start = new Date(data.startDate)
            const end = new Date('2026-02-14')
            const diff = end.getTime() - start.getTime()
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            setDuration({ years, months, days, hours })
        }
        calculateTime()
    }, [data.startDate])

    // Automated Sequence
    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 1000))
            for (let i = 0; i < 5; i++) {
                setLineProgress(i + 0.5)
                await new Promise(r => setTimeout(r, 1000))
                setActiveNode(i)
                setLineProgress(i + 1)
                await new Promise(r => setTimeout(r, 1500))
            }
            setLineProgress(5.5)
            await new Promise(r => setTimeout(r, 1000))
            setActiveNode(5)
            setLineProgress(6)
        }
        sequence()
    }, [])

    return (
        <div className="min-h-screen bg-neutral-950 text-white overflow-hidden flex flex-col items-center justify-center relative font-mono">

            {/* V21.0 -> V22.0: Enhanced Living Data Atmosphere */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* 1. Floating Binary Particles (Increased Opacity & Count) */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-500/20 text-sm font-bold select-none font-mono"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 100,
                            opacity: 0
                        }}
                        animate={{
                            y: -100,
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 8 + Math.random() * 15,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        {Math.random() > 0.5 ? '1' : '0'}
                    </motion.div>
                ))}

                {/* 2. Floating Mini-Hearts (Larger & brighter) */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={`h-${i}`}
                        className="absolute text-rose-500/30"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 50,
                            scale: 0.5
                        }}
                        animate={{
                            y: -50,
                            rotate: 360,
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 12 + Math.random() * 20,
                            repeat: Infinity,
                            delay: Math.random() * 10
                        }}
                    >
                        <Heart size={14 + Math.random() * 12} fill="currentColor" />
                    </motion.div>
                ))}

                {/* 3. Breathing Aurora Glow (Stronger) */}
                <motion.div
                    animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-pink-900/30 to-purple-900/30 blur-[100px] rounded-full mix-blend-screen"
                />
            </div>

            {/* Corner HUD Widgets */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 text-[10px] md:text-sm text-pink-500/70 flex flex-col gap-2 font-mono">
                <div className="flex items-center gap-2">
                    <Database size={14} />
                    <span>MEMORY_STREAM: <span className="text-pink-400 font-bold glow-text">SECURE</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <Activity size={14} />
                    <span>LATENCY: <span className="text-pink-400 font-bold">1ms</span></span>
                </div>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[10px] md:text-sm text-pink-500/70 flex flex-col gap-2 items-end font-mono">
                <div className="flex items-center gap-2">
                    <span>ENCRYPTION: <span className="text-pink-400 font-bold">MAX</span></span>
                    <ShieldCheck size={14} />
                </div>
                <div className="flex items-center gap-2">
                    <span>STATUS: <span className="animate-pulse text-green-400 font-bold">ONLINE</span></span>
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                </div>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-8 text-center z-10"
            >
                <div className="inline-flex items-center gap-2 bg-pink-950/50 text-pink-400 px-6 py-2 rounded-full text-xs font-bold mb-3 border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.15)]">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
                    <span className="tracking-wider">SYSTEM SYNCING...</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 drop-shadow-lg tracking-tight">
                    MEMORY CIRCUIT
                </h2>
            </motion.div>

            {/* Main Circuit Container - Adjusted height for bigger nodes */}
            <div className="w-full max-w-[90rem] px-4 md:px-10 flex items-center justify-center relative h-[500px]">

                {/* Connecting Lines Layer (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#1f1f1f" strokeWidth="3" />
                    <motion.line
                        x1="0%" y1="50%" x2="100%" y2="50%"
                        stroke="#ec4899" strokeWidth="6" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: lineProgress / 6 }}
                        transition={{ duration: 1, ease: "linear" }}
                        style={{ filter: "drop-shadow(0 0 15px #ec4899)" }}
                    />
                </svg>

                {/* Nodes Layer */}
                <div className="flex justify-between items-center w-full z-10 relative px-4 md:px-16">
                    {data.images.map((img, idx) => (
                        <Node
                            key={idx}
                            img={img}
                            index={idx}
                            isActive={activeNode >= idx}
                            isCompleted={activeNode > idx}
                        />
                    ))}

                    <TimeTerminal
                        isActive={activeNode === 5}
                        duration={duration}
                        nextPhase={nextPhase}
                    />
                </div>
            </div>

            {/* High-quality Scanline & Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[5]"></div>
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[5] bg-[length:100%_2px,3px_100%] opacity-20"></div>
        </div>
    )
}

function Node({ img, index, isActive, isCompleted }) {
    return (
        <div className="relative flex flex-col items-center justify-center -ml-6 md:ml-0">
            <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                    scale: isActive ? 1.2 : 1,
                    opacity: isActive ? 1 : 0.3,
                    borderColor: isActive || isCompleted ? '#ec4899' : '#333',
                    backgroundColor: isActive || isCompleted ? '#000' : '#0a0a0a',
                    boxShadow: isActive ? '0 0 50px rgba(236, 72, 153, 0.5)' : 'none'
                }}
                // SIGNIFICANTLY INCREASED SIZE: w-24 h-24 mobile, w-48 h-48 desktop
                className={`w-24 h-24 md:w-48 md:h-48 rounded-full border-[3px] md:border-[5px] flex items-center justify-center transition-all duration-500 relative z-10 overflow-hidden group`}
            >
                <div className="absolute inset-0 w-full h-full bg-neutral-900">
                    <motion.img
                        src={img}
                        alt={`Memory ${index}`}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        initial={{ x: '-100%' }}
                        animate={{ x: isActive || isCompleted ? '0%' : '-100%' }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                    />
                </div>

                {!(isActive || isCompleted) && (
                    <div className="hidden md:flex flex-col items-center text-pink-900/40 text-xs font-mono font-bold">
                        <ShieldCheck size={24} className="mb-1 opacity-50" />
                        LOCKED
                    </div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isActive || isCompleted ? 1 : 0, y: isActive || isCompleted ? 0 : 10 }}
                className="absolute -bottom-12 md:-bottom-20 text-center w-40"
            >
                <div className="text-[10px] md:text-xs font-bold text-pink-500 uppercase tracking-widest bg-pink-500/10 px-3 py-1 rounded border border-pink-500/20 inline-block mb-1 shadow-[0_0_10px_rgba(236,72,153,0.1)]">
                    BLOCK_0{index + 1}
                </div>
                <div className="text-[9px] md:text-[11px] text-gray-500 tracking-wider">verified</div>
            </motion.div>
        </div>
    )
}

function TimeTerminal({ isActive, duration, nextPhase }) {
    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: isActive ? 1 : 0.5, opacity: isActive ? 1 : 0.3 }}
            // Increased padding/size for terminal too
            className={`relative z-20 bg-black/90 backdrop-blur-xl border border-pink-500/30 p-6 md:p-10 rounded-3xl min-w-[220px] md:min-w-[380px] text-center shadow-[0_0_80px_rgba(236,72,153,0.2)]`}
        >
            <div className={`absolute -left-3 top-1/2 w-3 h-0.5 ${isActive ? 'bg-pink-500 shadow-[0_0_10px_#ec4899]' : 'bg-gray-800'}`} />

            <div className="flex items-center justify-center gap-2 mb-6 text-pink-400/80 border-b border-pink-500/10 pb-4">
                <Clock size={14} className={isActive ? "animate-spin-slow" : ""} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{isActive ? 'CONNECTION ESTABLISHED' : 'WAITING...'}</span>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-6">
                <TimeUnit val={duration.years} label="YRS" active={isActive} />
                <TimeUnit val={duration.months} label="MTH" active={isActive} />
                <TimeUnit val={duration.days} label="DAY" active={isActive} />
                <TimeUnit val={duration.hours} label="HRS" active={isActive} />
            </div>

            <AnimatePresence>
                {isActive && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextPhase}
                        className="w-full py-3 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-[length:200%_auto] animate-gradient rounded-lg font-bold text-xs uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(236,72,153,0.4)] border border-white/10"
                    >
                        Initialize Heart
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function TimeUnit({ val, label, active }) {
    return (
        <div className={`flex flex-col items-center p-2 rounded bg-white/5 border border-white/5 ${active ? 'shadow-[inset_0_0_10px_rgba(236,72,153,0.1)]' : ''}`}>
            <span className={`text-xl md:text-2xl font-black font-mono leading-none mb-1 ${active ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-gray-700'}`}>
                {String(val).padStart(2, '0')}
            </span>
            <span className="text-[8px] font-bold text-pink-500/50">{label}</span>
        </div>
    )
}
