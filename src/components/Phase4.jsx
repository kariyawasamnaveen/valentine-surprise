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

            {/* V21.0: Living Data Atmosphere Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* 1. Floating Binary Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-500/10 text-xs font-bold select-none"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 100,
                            opacity: 0
                        }}
                        animate={{
                            y: -100,
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
                        }}
                    >
                        {Math.random() > 0.5 ? '1' : '0'}
                    </motion.div>
                ))}

                {/* 2. Floating Mini-Hearts */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={`h-${i}`}
                        className="absolute text-rose-500/20"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 50,
                            scale: 0.5
                        }}
                        animate={{
                            y: -50,
                            rotate: 360,
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 25,
                            repeat: Infinity,
                            delay: Math.random() * 15
                        }}
                    >
                        <Heart size={10 + Math.random() * 10} fill="currentColor" />
                    </motion.div>
                ))}

                {/* 3. Breathing Aurora Glow */}
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-900/20 blur-[120px] rounded-full"
                />
            </div>

            {/* Corner HUD Widgets */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 text-[10px] md:text-xs text-pink-500/60 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Database size={12} />
                    <span>MEMORY_STREAM: <span className="text-pink-400 font-bold">SECURE</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <Activity size={12} />
                    <span>LATENCY: <span className="text-pink-400 font-bold">12ms</span></span>
                </div>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[10px] md:text-xs text-pink-500/60 flex flex-col gap-2 items-end">
                <div className="flex items-center gap-2">
                    <span>ENCRYPTION: <span className="text-pink-400 font-bold">Level 7</span></span>
                    <ShieldCheck size={12} />
                </div>
                <div className="flex items-center gap-2">
                    <span>STATUS: <span className="animate-pulse text-green-400 font-bold">ONLINE</span></span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-8 text-center z-10"
            >
                <div className="inline-flex items-center gap-2 bg-pink-900/30 text-pink-400 px-4 py-1 rounded-full text-xs font-bold mb-2 border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping" />
                    <span>System Syncing...</span>
                </div>
                <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 drop-shadow-sm tracking-tight">
                    MEMORY CIRCUIT
                </h2>
            </motion.div>

            {/* Main Circuit Container */}
            <div className="w-full max-w-7xl px-4 md:px-10 flex items-center justify-center relative h-[400px]">

                {/* Connecting Lines Layer (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#1f1f1f" strokeWidth="2" />
                    <motion.line
                        x1="0%" y1="50%" x2="100%" y2="50%"
                        stroke="#ec4899" strokeWidth="4" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: lineProgress / 6 }}
                        transition={{ duration: 1, ease: "linear" }}
                        style={{ filter: "drop-shadow(0 0 10px #ec4899)" }}
                    />
                </svg>

                {/* Nodes Layer */}
                <div className="flex justify-between items-center w-full z-10 relative px-4 md:px-12">
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

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[5] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
        </div>
    )
}

function Node({ img, index, isActive, isCompleted }) {
    return (
        <div className="relative flex flex-col items-center justify-center -ml-4 md:ml-0">
            <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                    scale: isActive ? 1.15 : 1,
                    opacity: isActive ? 1 : 0.3,
                    borderColor: isActive || isCompleted ? '#ec4899' : '#333',
                    backgroundColor: isActive || isCompleted ? '#000' : '#0a0a0a',
                    boxShadow: isActive ? '0 0 40px rgba(236, 72, 153, 0.4)' : 'none'
                }}
                className={`w-16 h-16 md:w-32 md:h-32 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 relative z-10 overflow-hidden`}
            >
                <div className="absolute inset-0 w-full h-full">
                    <motion.img
                        src={img}
                        alt={`Memory ${index}`}
                        className="w-full h-full object-cover"
                        initial={{ x: '-100%' }}
                        animate={{ x: isActive || isCompleted ? '0%' : '-100%' }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                    />
                </div>

                {!(isActive || isCompleted) && (
                    <div className="hidden md:block text-pink-900/40 text-xs font-mono">LOCKED</div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isActive || isCompleted ? 1 : 0, y: isActive || isCompleted ? 0 : 10 }}
                className="absolute -bottom-10 md:-bottom-14 text-center w-32"
            >
                <div className="text-[9px] md:text-[10px] font-bold text-pink-500 uppercase tracking-widest bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 inline-block mb-1">
                    BLOCK_0{index + 1}
                </div>
                <div className="text-[8px] md:text-[9px] text-gray-500 tracking-wider">verified</div>
            </motion.div>
        </div>
    )
}

function TimeTerminal({ isActive, duration, nextPhase }) {
    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: isActive ? 1 : 0.5, opacity: isActive ? 1 : 0.3 }}
            className={`relative z-20 bg-black/80 backdrop-blur-md border border-pink-500/30 p-6 md:p-8 rounded-2xl min-w-[200px] md:min-w-[320px] text-center shadow-[0_0_60px_rgba(236,72,153,0.15)]`}
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
