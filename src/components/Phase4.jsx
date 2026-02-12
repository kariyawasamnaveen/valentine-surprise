import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, ChevronRight, Clock } from 'lucide-react'

export default function Phase4({ data, nextPhase }) {
    const [duration, setDuration] = useState({ years: 0, months: 0, days: 0, hours: 0 })
    const [activeNode, setActiveNode] = useState(-1) // -1 = start, 0-4 = nodes, 5 = terminal
    const [lineProgress, setLineProgress] = useState(0) // 0 to 6 (segments)

    // Calculate Duration including Hours
    useEffect(() => {
        if (!data.startDate) return

        const calculateTime = () => {
            const start = new Date(data.startDate)
            const now = new Date() // Use current time for "Live" feeling or fixed date if preferred
            const end = new Date('2026-02-14') // Or stick to the prank date? Let's use NOW for realism in counter

            // User requested "Time Terminal" so let's calc diff to 2026-02-14 or LIVE? 
            // Based on "Journey", usually it's "Time Together". I will use 2026-02-14 as the "Target" per original brief.

            const diff = end.getTime() - start.getTime()

            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

            setDuration({ years, months, days, hours })
        }

        calculateTime()
    }, [data.startDate])

    // Automated Sequence Controller
    useEffect(() => {
        const sequence = async () => {
            // Initial Delay
            await new Promise(r => setTimeout(r, 1000))

            // Loop through 5 nodes
            for (let i = 0; i < 5; i++) {
                // Animate Line to Node i
                setLineProgress(i + 0.5) // Halfway to node (visual logic handled in render)
                await new Promise(r => setTimeout(r, 1000)) // Line travel time

                // Activate Node
                setActiveNode(i)
                setLineProgress(i + 1) // Line fully arrived at node center
                await new Promise(r => setTimeout(r, 1500)) // Time to view photo
            }

            // Final Line to Terminal
            setLineProgress(5.5)
            await new Promise(r => setTimeout(r, 1000))

            // Activate Terminal
            setActiveNode(5)
            setLineProgress(6)
        }

        sequence()
    }, [])

    return (
        <div className="min-h-screen bg-neutral-900 text-white overflow-hidden flex flex-col items-center justify-center relative">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-8 text-center z-10"
            >
                <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-500 px-4 py-1 rounded-full text-xs font-bold mb-2 border border-pink-500/20">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                    <span>System Syncing...</span>
                </div>
                <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-600">
                    Memory Circuit
                </h2>
            </motion.div>

            {/* Main Circuit Container (Horizontal Scroll aware for mobile, but centered desktop) */}
            <div className="w-full max-w-7xl px-4 md:px-10 flex items-center justify-center relative h-[400px]">

                {/* Connecting Lines Layer (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {/* Base White Line (Faint) */}
                    <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#333" strokeWidth="2" />

                    {/* Active Red Line (Animated) */}
                    <motion.line
                        x1="0%"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        stroke="#ec4899"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: lineProgress / 6 }}
                        transition={{ duration: 1, ease: "linear" }} // Controlled by state updates
                        style={{ filter: "drop-shadow(0 0 8px #ec4899)" }}
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

                    {/* Time Terminal Node */}
                    <TimeTerminal
                        isActive={activeNode === 5}
                        duration={duration}
                        nextPhase={nextPhase}
                    />
                </div>
            </div>

            {/* Scanline Overlay for Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[url('/scanline.png')] opacity-5 mix-blend-overlay"></div>
        </div>
    )
}

function Node({ img, index, isActive, isCompleted }) {
    return (
        <div className="relative flex flex-col items-center justify-center -ml-4 md:ml-0">
            {/* The Circle */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                    scale: isActive ? 1.1 : 1,
                    opacity: isActive ? 1 : 0.5,
                    borderColor: isActive || isCompleted ? '#ec4899' : '#333',
                    backgroundColor: isActive || isCompleted ? '#000' : '#111'
                }}
                className={`w-16 h-16 md:w-32 md:h-32 rounded-full border-4 flex items-center justify-center bg-neutral-900 transition-all duration-500 relative z-10 overflow-hidden ${isActive ? 'shadow-[0_0_30px_#ec4899]' : ''}`}
            >
                {/* Image Reveal (Wipe Effect) */}
                <div className="absolute inset-0 w-full h-full">
                    <motion.img
                        src={img}
                        alt={`Memory ${index}`}
                        className="w-full h-full object-cover"
                        initial={{ x: '-100%' }}
                        animate={{ x: isActive || isCompleted ? '0%' : '-100%' }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    />
                </div>

                {/* Locked Icon (Before Active) */}
                {!(isActive || isCompleted) && (
                    <div className="text-gray-700 text-xs font-mono">LOCK</div>
                )}
            </motion.div>

            {/* Label */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isActive || isCompleted ? 1 : 0, y: isActive || isCompleted ? 0 : 10 }}
                className="absolute -bottom-10 md:-bottom-12 text-center w-32"
            >
                <div className="text-[10px] md:text-xs font-bold text-pink-500 uppercase tracking-widest">
                    Block_0{index + 1}
                </div>
                <div className="text-[8px] md:text-[10px] text-gray-500">Synced</div>
            </motion.div>
        </div>
    )
}

function TimeTerminal({ isActive, duration, nextPhase }) {
    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: isActive ? 1 : 0.5, opacity: isActive ? 1 : 0.5 }} // Dim if not active
            transition={{ type: "spring", bounce: 0.5 }}
            className={`relative z-20 bg-neutral-900 border-2 ${isActive ? 'border-pink-500 shadow-[0_0_50px_rgba(236,72,153,0.3)]' : 'border-gray-800'} p-6 md:p-8 rounded-2xl min-w-[200px] md:min-w-[300px] text-center`}
        >
            <div className={`absolute -left-3 top-1/2 w-3 h-1 ${isActive ? 'bg-pink-500' : 'bg-gray-800'}`} />

            <div className="flex items-center justify-center gap-2 mb-4 text-gray-400">
                <Clock size={16} className={isActive ? "text-pink-500 animate-spin-slow" : ""} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Time Terminal</span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
                <TimeUnit val={duration.years} label="YRS" active={isActive} />
                <TimeUnit val={duration.months} label="MTH" active={isActive} />
                <TimeUnit val={duration.days} label="DAY" active={isActive} />
                <TimeUnit val={duration.hours} label="HRS" active={isActive} />
            </div>

            {isActive && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={nextPhase}
                    className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg font-bold text-xs uppercase tracking-widest text-white shadow-lg shadow-pink-600/20 hover:scale-105 active:scale-95 transition-transform"
                >
                    Initialize Heart
                </motion.button>
            )}
        </motion.div>
    )
}

function TimeUnit({ val, label, active }) {
    return (
        <div className={`flex flex-col items-center p-2 rounded bg-neutral-800 ${active ? 'border border-pink-500/30' : ''}`}>
            <span className={`text-xl md:text-2xl font-black font-mono ${active ? 'text-white' : 'text-gray-600'}`}>
                {String(val).padStart(2, '0')}
            </span>
            <span className="text-[8px] font-bold text-gray-500">{label}</span>
        </div>
    )
}
