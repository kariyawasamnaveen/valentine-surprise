import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Heart, Activity, ShieldCheck, Database, Server, Cpu, Lock } from 'lucide-react'

export default function Phase4({ data, nextPhase }) {
    const [duration, setDuration] = useState({ years: 0, months: 0, days: 0, hours: 0 })
    const [activeNode, setActiveNode] = useState(-1)
    const [lineProgress, setLineProgress] = useState(0)

    // Calculate Duration
    useEffect(() => {
        if (!data.startDate) return
        const calculateTime = () => {
            const start = new Date(data.startDate)
            const end = new Date() // Use current date dynamically to prevent negative overflow
            const diff = Math.abs(end.getTime() - start.getTime())
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
            await new Promise(r => setTimeout(r, 800))
            for (let i = 0; i < 5; i++) {
                setLineProgress(i + 0.5)
                await new Promise(r => setTimeout(r, 600))
                setActiveNode(i)
                setLineProgress(i + 1)
                await new Promise(r => setTimeout(r, 800))
            }
            setLineProgress(5.5)
            await new Promise(r => setTimeout(r, 600))
            setActiveNode(5)
            setLineProgress(6)
        }
        sequence()
    }, [])

    return (
        <div className="fixed inset-0 w-full h-screen bg-[#070205] text-zinc-300 overflow-hidden flex flex-col justify-between p-6 font-mono z-50">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                <div className="w-full h-full bg-[linear-gradient(rgba(244,63,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#070205_100%)]" />
            </div>

            {/* Aurora Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-rose-950/20 to-purple-950/20 blur-[120px] rounded-full pointer-events-none z-0" />

            {/* HEADER HUB */}
            <div className="w-full flex items-center justify-between border-b border-rose-950/60 pb-4 z-10">
                <div className="flex flex-col">
                    <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-400 px-3.5 py-1 rounded-full text-[10px] font-bold border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)] mb-1">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                        <span className="tracking-wider">SYSTEM SYNCING...</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide font-sans">
                        MEMORY CIRCUIT
                    </h2>
                </div>

                {/* Cyber HUD Specs */}
                <div className="hidden md:flex items-center gap-6 text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1.5"><Database size={12} className="text-rose-500" /> Memory Stream: Secure</span>
                    <span className="flex items-center gap-1.5"><Cpu size={12} className="text-rose-500" /> Latency: 1ms</span>
                    <span className="flex items-center gap-1.5 animate-pulse text-emerald-500"><Server size={12} /> Status: Decrypting</span>
                </div>
            </div>

            {/* MIDDLE TIMELINE PIPELINE */}
            <div className="w-full flex-1 flex flex-col justify-center items-center relative py-4 z-10">
                
                {/* Fiber Optic Neon Path */}
                <svg className="absolute inset-x-0 w-full h-[6px] pointer-events-none z-0 opacity-40">
                    <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#1f0f18" strokeWidth="6" />
                    <motion.line
                        x1="0%" y1="50%" x2="100%" y2="50%"
                        stroke="#f43f5e" strokeWidth="6" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: lineProgress / 6 }}
                        transition={{ duration: 0.5, ease: "linear" }}
                        style={{ filter: "drop-shadow(0 0 10px #f43f5e)" }}
                    />
                </svg>

                {/* Nodes Array Container */}
                <div className="w-full max-w-[85rem] flex flex-row items-center justify-between px-4 sm:px-12 relative z-10 gap-4">
                    {data.images.map((img, idx) => (
                        <Node
                            key={idx}
                            img={img}
                            index={idx}
                            isActive={activeNode >= idx}
                            isCompleted={activeNode > idx}
                        />
                    ))}
                </div>
            </div>

            {/* BOTTOM INSTRUMENTATION DASHBOARD */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-t border-rose-950/60 pt-4 z-10">
                
                {/* Left Telemetry Widgets */}
                <div className="lg:col-span-4 hidden lg:flex items-center gap-6 text-[10px] uppercase text-zinc-500">
                    <div className="flex items-center gap-2 bg-[#0d0408]/60 p-2.5 rounded-xl border border-rose-950/40">
                        <Activity size={14} className="text-rose-500" />
                        <span>Signal Lock: STABLE</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#0d0408]/60 p-2.5 rounded-xl border border-rose-950/40">
                        <ShieldCheck size={14} className="text-rose-500" />
                        <span>Core Integrity: 100%</span>
                    </div>
                </div>

                {/* Center Time Terminal (Beautiful bottom center card instead of huge sidebar overlay) */}
                <div className="lg:col-span-8 w-full flex justify-end">
                    <TimeTerminal
                        isActive={activeNode === 5}
                        duration={duration}
                        nextPhase={nextPhase}
                    />
                </div>
            </div>
        </div>
    )
}

function Node({ img, index, isActive, isCompleted }) {
    return (
        <div className="flex flex-col items-center justify-center relative flex-1">
            <motion.div
                initial={{ scale: 0.85, opacity: 0.4 }}
                animate={{
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive || isCompleted ? 1 : 0.4,
                    borderColor: isActive || isCompleted ? '#f43f5e' : '#32101e',
                    backgroundColor: isActive || isCompleted ? '#0f0409' : '#070205',
                    boxShadow: isActive ? '0 0 30px rgba(244,63,94,0.4)' : 'none'
                }}
                className="w-16 h-16 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full border-[3px] sm:border-[4px] flex items-center justify-center transition-all duration-300 relative z-10 overflow-hidden group"
            >
                <div className="absolute inset-0 w-full h-full bg-zinc-950">
                    <motion.img
                        src={img}
                        alt={`Memory ${index}`}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        initial={{ x: '-100%' }}
                        animate={{ x: isActive || isCompleted ? '0%' : '-100%' }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                </div>

                {!(isActive || isCompleted) && (
                    <div className="flex flex-col items-center text-rose-500/20 text-[9px] sm:text-xs font-bold">
                        <Lock size={16} className="mb-0.5 opacity-30" />
                        SEALED
                    </div>
                )}
            </motion.div>

            {/* Validation Badge */}
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: isActive || isCompleted ? 1 : 0, y: isActive || isCompleted ? 0 : 5 }}
                className="absolute -bottom-8 text-center"
            >
                <div className="text-[8px] sm:text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20">
                    BLOCK_0{index + 1}
                </div>
            </motion.div>
        </div>
    )
}

function TimeTerminal({ isActive, duration, nextPhase }) {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.6 }}
            className="bg-[#0d0408]/85 border border-rose-500/20 p-4 sm:p-5 rounded-2xl w-full max-w-lg lg:max-w-xl flex items-center justify-between gap-4 backdrop-blur-md relative"
        >
            <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1.5 text-rose-400/80 text-[9px] font-bold uppercase tracking-wider">
                    <Clock size={12} className={isActive ? "animate-spin-slow" : ""} />
                    <span>{isActive ? 'SYNC COMPLETION established' : 'COMPILING DATA...'}</span>
                </div>
                
                {/* Flat duration grid */}
                <div className="flex gap-2.5 mt-2">
                    <TimeUnit val={duration.years} label="YRS" active={isActive} />
                    <TimeUnit val={duration.months} label="MTH" active={isActive} />
                    <TimeUnit val={duration.days} label="DAY" active={isActive} />
                    <TimeUnit val={duration.hours} label="HRS" active={isActive} />
                </div>
            </div>

            <AnimatePresence>
                {isActive && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(244,63,94,0.5)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={nextPhase}
                        className="py-3 px-6 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg border border-rose-400/20"
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
        <div className={`flex flex-col items-center px-2 py-1 rounded bg-[#12060c] border border-rose-950/40 min-w-[44px] ${active ? 'shadow-[inset_0_0_10px_rgba(244,63,94,0.1)]' : ''}`}>
            <span className={`text-sm sm:text-base font-extrabold leading-none ${active ? 'text-white' : 'text-zinc-700'}`}>
                {String(val).padStart(2, '0')}
            </span>
            <span className="text-[8px] font-bold text-rose-500/50 mt-0.5">{label}</span>
        </div>
    )
}
