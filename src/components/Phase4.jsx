import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Heart, Trophy, ChevronRight } from 'lucide-react'

export default function Phase4({ data, nextPhase }) {
    const [duration, setDuration] = useState({ years: 0, months: 0, days: 0 })
    const containerRef = useRef(null)
    const { scrollXProgress } = useScroll({ container: containerRef })
    const scaleX = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    useEffect(() => {
        if (!data.startDate) return

        const start = new Date(data.startDate)
        const end = new Date('2026-02-14')

        let years = end.getFullYear() - start.getFullYear()
        let months = end.getMonth() - start.getMonth()
        let days = end.getDate() - start.getDate()

        if (days < 0) {
            months -= 1
            days += new Date(end.getFullYear(), end.getMonth(), 0).getDate()
        }
        if (months < 0) {
            years -= 1
            months += 12
        }

        setDuration({ years, months, days })
    }, [data.startDate])

    return (
        <div className="h-screen bg-neutral-900 text-white overflow-hidden flex flex-col">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 z-10 bg-neutral-900/80 backdrop-blur-md"
            >
                <div className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-400 px-4 py-1 rounded-full text-xs font-bold mb-2 border border-pink-500/30">
                    <Trophy size={14} />
                    <span>Memory Stream Validated</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-600">
                    Our Love Journey
                </h2>
                <p className="text-gray-400 text-sm mt-1">Scroll to explore the timeline...</p>
            </motion.div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-x-auto overflow-y-hidden flex items-center px-10 md:px-20 gap-40 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollBehavior: 'smooth' }}
            >
                {/* Progress Line Background */}
                <div className="fixed top-1/2 left-0 right-0 h-1 bg-gray-800 -z-10" />

                {/* Active Progress Line */}
                <motion.div
                    className="fixed top-1/2 left-0 h-1 bg-gradient-to-r from-pink-500 to-rose-600 origin-left -z-10"
                    style={{ scaleX, right: 0 }}
                />

                {/* Timeline Nodes */}
                {data.images.map((img, idx) => (
                    <div key={idx} className="snap-center shrink-0 relative flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ type: "spring", bounce: 0.4 }}
                            className="relative"
                        >
                            {/* Glowing Circle Container */}
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-gray-800 bg-neutral-800 overflow-hidden relative group shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                                <motion.img
                                    src={img}
                                    alt={`Memory ${idx}`}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                    <span className="text-pink-300 font-bold uppercase tracking-widest text-sm">Memory 0{idx + 1}</span>
                                </div>
                            </div>

                            {/* Node Marker on Line */}
                            <div className="absolute top-1/2 -left-20 w-full flex items-center -z-10">
                                <div className="w-4 h-4 rounded-full bg-pink-500 shadow-[0_0_15px_#ec4899]" />
                            </div>
                        </motion.div>
                    </div>
                ))}

                {/* Final Destination: Duration Counter */}
                <div className="snap-center shrink-0 flex items-center px-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-neutral-800/80 backdrop-blur border border-pink-500/30 p-10 rounded-[3rem] text-center shadow-[0_0_60px_rgba(236,72,153,0.15)]"
                    >
                        <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-6">Total Time Together</h3>

                        <div className="flex gap-6 mb-8">
                            <CounterItem value={duration.years} label="Years" />
                            <CounterItem value={duration.months} label="Months" />
                            <CounterItem value={duration.days} label="Days" />
                        </div>

                        <button
                            onClick={nextPhase}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full font-bold text-white shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 transition-all hover:scale-105 active:scale-95"
                        >
                            <span>Connect Hearts</span>
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <div className="h-1 bg-gray-800 w-full fixed bottom-0 left-0">
                <motion.div
                    className="h-full bg-pink-500"
                    style={{ scaleX }}
                />
            </div>
        </div>
    )
}

function CounterItem({ value, label }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl font-black text-white mb-2 font-mono">
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">{label}</span>
        </div>
    )
}
