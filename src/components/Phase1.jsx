import { motion } from 'framer-motion'
import { ShieldAlert, Fingerprint, Terminal, Server, Cpu, Heart } from 'lucide-react'

export default function Phase1({ nextPhase }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative bg-[#060204] overflow-hidden font-mono text-zinc-300">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(rgba(244,63,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.1)_1px,transparent_1px)] [background-size:32px_32px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#060204_100%)]" />
            </div>

            {/* Neon Scanning Line Effect */}
            <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden opacity-30">
                <motion.div 
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-full h-[3px] bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_20px_#f43f5e]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="z-10 bg-[#0d0408]/90 border border-rose-500/25 p-8 sm:p-10 rounded-3xl shadow-[0_0_80px_rgba(244,63,94,0.15)] max-w-xl w-full relative backdrop-blur-md"
            >
                {/* Decorative Tech Corners */}
                <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-rose-500 rounded-tl-xl"></div>
                <div className="absolute -top-px -right-px w-6 h-6 border-t-2 border-r-2 border-rose-500 rounded-tr-xl"></div>
                <div className="absolute -bottom-px -left-px w-6 h-6 border-b-2 border-l-2 border-rose-500 rounded-bl-xl"></div>
                <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-rose-500 rounded-br-xl"></div>

                {/* Main Hologram Shield Graphic */}
                <div className="flex flex-col items-center mb-8 relative">
                    <motion.div
                        animate={{ 
                            filter: ['drop-shadow(0 0 10px rgba(244,63,94,0.2))', 'drop-shadow(0 0 25px rgba(244,63,94,0.4))', 'drop-shadow(0 0 10px rgba(244,63,94,0.2))'],
                            scale: [1, 1.02, 1] 
                        }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-44 h-44 rounded-full overflow-hidden flex items-center justify-center border border-rose-500/20 bg-[#12060c] p-2"
                    >
                        <img 
                            src="/cyber-shield.png" 
                            alt="Cyber Security Shield" 
                            className="w-full h-full object-contain opacity-90"
                        />
                    </motion.div>

                    {/* Status Beacon */}
                    <div className="absolute bottom-1 right-[38%] flex items-center gap-1.5 bg-[#12060c] border border-rose-500/30 px-3 py-1 rounded-full text-[10px] tracking-widest text-rose-500 font-bold uppercase shadow-lg shadow-rose-900/30">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                        <span>Secured</span>
                    </div>
                </div>

                <div className="flex items-center justify-between border-b border-rose-900/30 pb-4 mb-6">
                    <div className="flex items-center gap-3 text-rose-500">
                        <ShieldAlert size={24} className="animate-pulse" />
                        <h1 className="text-sm sm:text-base font-extrabold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
                            Security Lockdown
                        </h1>
                    </div>
                    <span className="text-[10px] text-rose-500/70 border border-rose-500/20 px-2 py-0.5 rounded font-mono">
                        ERR_AUTH_REQ
                    </span>
                </div>

                {/* System lockdown details */}
                <div className="space-y-4 mb-8">
                    <div className="bg-[#12060c]/60 p-5 border border-rose-950 rounded-2xl font-mono text-xs text-rose-400/90 leading-relaxed shadow-inner">
                        <div className="flex items-center gap-2 mb-3 text-rose-500 font-bold text-xs border-b border-rose-950/60 pb-2">
                            <Server size={12} />
                            <span>[ SYSTEM STATUS: ENCRYPTED ]</span>
                        </div>
                        <p>&gt; HOSTNAME: Root@girlfriend-verification-core</p>
                        <p className="text-pink-400/80">&gt; DETECTED: UNAUTHORIZED MEMORY VALIDATION ATTEMPT</p>
                        <p className="text-pink-400/80">&gt; LOCKDOWN: SENSITIVE MEMORIES TEMPORARILY SEALED</p>
                        <p>&gt; PROTOCOL: CRYPTO-HEART HANDSHAKE MANUAL OVERRIDE REQUIRED</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-500 italic px-1 font-mono">
                        <span className="flex items-center gap-1.5"><Cpu size={12} /> Core Temp: 37°C</span>
                        <span className="text-rose-500/70 flex items-center gap-1">
                            <Heart size={10} fill="#f43f5e" className="animate-pulse" />
                            Love-Decryption Mode
                        </span>
                    </div>
                </div>

                {/* Trigger Button with animated tap */}
                <motion.button
                    whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 0 35px rgba(244,63,94,0.45)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextPhase}
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-2xl transition-all border border-rose-400/25 relative overflow-hidden"
                >
                    <Fingerprint size={20} className="text-rose-100 animate-pulse" />
                    Authorize Session
                </motion.button>
            </motion.div>

            {/* Footer Terminal Node Indicator */}
            <div className="absolute bottom-8 left-8 hidden sm:flex items-center gap-2.5 text-zinc-600 font-mono text-xs uppercase tracking-wider bg-[#0d0408]/40 border border-zinc-900/60 px-4 py-2 rounded-full">
                <Terminal size={14} className="text-rose-500/70" />
                <span>DevCore@v7.3.1:~/love-override</span>
            </div>
        </div>
    )
}
