import { motion } from 'framer-motion'
import { Heart, Link as LinkIcon, ShieldCheck, Terminal } from 'lucide-react'

export default function Phase5({ data, nextPhase }) {
    return (
        <div className="fixed inset-0 w-full h-screen bg-[#070205] text-zinc-300 overflow-hidden flex flex-col justify-between py-8 px-6 font-mono z-50">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                <div className="w-full h-full bg-[linear-gradient(rgba(244,63,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#070205_100%)]" />
            </div>

            {/* Glowing Mesh Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-950/20 to-rose-950/20 blur-[130px] rounded-full mix-blend-screen" />
                
                {/* Subtle Floating Hearts */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-500/10 pointer-events-none"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: "110%",
                            scale: Math.random() * 0.5 + 0.3
                        }}
                        animate={{
                            y: "-10%",
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Heart size={60} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {/* TOP TELEMETRY STATUS */}
            <div className="w-full flex items-center justify-between border-b border-rose-950/60 pb-4 z-10">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                    <Terminal size={14} className="text-emerald-500" />
                    <span>AUTH_NODE: <span className="text-emerald-400 font-bold">SECURE_SYNC_OK</span></span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-emerald-400">ENCRYPTION: VERIFIED</span>
                    <ShieldCheck size={14} className="text-emerald-500 animate-pulse" />
                </div>
            </div>

            {/* MAIN CENTRAL LINKAGE CONTAINER */}
            <div className="w-full flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto z-10 py-4">
                
                {/* Header Title */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 drop-shadow-md">
                        Authentication Successful
                    </h2>
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-zinc-500 font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                        Status: Permanently Connected
                    </div>
                </div>

                {/* Connection Bridge Widget */}
                <div className="relative w-full flex justify-between items-center h-[200px] sm:h-[240px] px-6 sm:px-16 mb-6">
                    
                    {/* Glowing Connection Fiber Line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full px-12 sm:px-28 z-0">
                        <div className="h-[2px] bg-zinc-900 w-full overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="h-full bg-gradient-to-r from-emerald-500 via-rose-500 to-emerald-500 w-full relative"
                            >
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 right-0 w-16 h-16 bg-rose-500/40 blur-xl rounded-full"
                                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                />
                            </motion.div>
                        </div>

                        {/* Central pulsing love engine node */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#070205] p-3 rounded-full border-2 border-rose-500/30 shadow-[0_0_25px_rgba(244,63,94,0.4)]"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 0.7, repeat: Infinity }}
                                className="text-rose-500"
                            >
                                <Heart size={28} fill="currentColor" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Left Node: SOURCE (YOU) */}
                    <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border-[3px] border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative z-10 bg-zinc-950 flex-shrink-0 overflow-hidden"
                    >
                        <img
                            src={data.images[2]}
                            alt="You"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500/10 backdrop-blur-md px-2.5 py-0.5 rounded border border-emerald-500/30 text-[8px] font-bold text-emerald-400 uppercase tracking-widest">
                            Source
                        </div>
                    </motion.div>

                    {/* Right Node: DESTINATION (HER) */}
                    <motion.div
                        initial={{ x: 60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border-[3px] border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.2)] relative z-10 bg-zinc-950 flex-shrink-0 overflow-hidden"
                    >
                        <img
                            src={data.images[3]}
                            alt="Her"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-rose-500/10 backdrop-blur-md px-2.5 py-0.5 rounded border border-rose-500/30 text-[8px] font-bold text-rose-400 uppercase tracking-widest">
                            Destination
                        </div>
                    </motion.div>
                </div>

                {/* Cohesive Tagline */}
                <div className="text-center mt-2 max-w-lg">
                    <p className="text-sm sm:text-lg text-rose-400/90 font-serif italic leading-relaxed">
                        "Two different worlds, one active connection."
                    </p>
                </div>
            </div>

            {/* BOTTOM NAVIGATION ACTION BAR */}
            <div className="w-full flex justify-center z-10">
                <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(244,63,94,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={nextPhase}
                    className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-12 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-widest shadow-lg flex items-center gap-2.5 border border-rose-400/20"
                >
                    <LinkIcon size={16} />
                    Complete Linkage
                </motion.button>
            </div>
        </div>
    )
}
