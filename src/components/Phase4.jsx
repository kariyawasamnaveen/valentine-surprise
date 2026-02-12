import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Calendar, Clock, Trophy } from 'lucide-react'

export default function Phase4({ data, nextPhase }) {
    const [duration, setDuration] = useState({ years: 0, months: 0, days: 0 })
    const [counter, setCounter] = useState({ years: 0, months: 0, days: 0 })

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

        // Animation for counter
        const durationTime = 2000 // 2 seconds
        const interval = 20
        const steps = durationTime / interval

        let currentStep = 0
        const timer = setInterval(() => {
            currentStep++
            setCounter({
                years: Math.min(years, Math.floor((years / steps) * currentStep)),
                months: Math.min(months, Math.floor((months / steps) * currentStep)),
                days: Math.min(days, Math.floor((days / steps) * currentStep))
            })
            if (currentStep >= steps) clearInterval(timer)
        }, interval)

        return () => clearInterval(timer)
    }, [data.startDate])

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8 flex flex-col items-center py-20 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full"
            >
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-xs font-bold mb-4">
                        <Trophy size={14} />
                        Memory Stream Validated
                    </div>
                    <h2 className="text-4xl font-black text-gray-800 mb-2">Our Love Journey</h2>
                    <p className="text-gray-500 italic">Processing memories into a permanent digital archive...</p>
                </div>

                {/* Timeline with Hearts */}
                <div className="relative border-l-2 border-pink-200 ml-6 sm:ml-auto mr-auto space-y-24 pb-24">
                    {data.images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative pl-12"
                        >
                            {/* Heart Marker */}
                            <div className="absolute -left-[13px] top-0 bg-white p-1 rounded-full">
                                <Heart size={20} fill="#f472b6" className="text-pink-400" />
                            </div>

                            {/* Heart Shaped Image Container */}
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="w-full max-w-sm bg-white p-4 rounded-3xl shadow-xl shadow-pink-100 relative group"
                            >
                                <div
                                    className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-100"
                                    style={{
                                        clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
                                        transform: 'scale(1.2) translateY(5%)'
                                    }}
                                >
                                    <img src={img} alt={`Memory ${idx}`} className="w-full h-full object-cover" />
                                </div>

                                <div className="mt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    <span>Block_{idx + 1}</span>
                                    <span className="text-pink-500">Decryption Success</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Duration Counter Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border-2 border-pink-100 rounded-[3rem] p-12 text-center shadow-2xl shadow-pink-200"
                >
                    <div className="flex justify-center gap-4 mb-8">
                        <div className="bg-pink-50 p-4 rounded-2xl">
                            <span className="block text-4xl font-black text-pink-600 leading-none">{counter.years}</span>
                            <span className="text-[10px] font-bold uppercase text-pink-400">Years</span>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-2xl">
                            <span className="block text-4xl font-black text-pink-600 leading-none">{counter.months}</span>
                            <span className="text-[10px] font-bold uppercase text-pink-400">Months</span>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-2xl">
                            <span className="block text-4xl font-black text-pink-600 leading-none">{counter.days}</span>
                            <span className="text-[10px] font-bold uppercase text-pink-400">Days</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-700 mb-8 italic">
                        "Everything we've built, atom by atom, leads to this moment."
                    </h3>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextPhase}
                        className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors"
                    >
                        Finalize Connection
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
}
