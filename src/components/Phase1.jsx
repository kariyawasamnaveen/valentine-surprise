import { motion } from 'framer-motion'
import { ShieldAlert, Lock, Terminal } from 'lucide-react'

export default function Phase1({ nextPhase }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 relative bg-[#0a0a0a]">
            {/* Matrix-like background effect (simple) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 bg-black border border-red-900/50 p-8 rounded-lg shadow-2xl shadow-red-900/20 max-w-lg w-full"
            >
                <div className="flex items-center gap-3 mb-6 text-red-500">
                    <ShieldAlert size={32} />
                    <h1 className="text-xl font-bold tracking-widest uppercase terminal-text">Security Lockdown</h1>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="bg-red-950/30 p-4 border border-red-900/30 rounded font-mono text-sm text-red-400">
                        <p className="mb-2 uppercase font-bold text-xs">[ SYSTEM STATUS: CRITICAL ]</p>
                        <p>&gt; UNAUTHORIZED DATA ACCESS DETECTED</p>
                        <p>&gt; RESOURCE LOCKDOWN INITIATED</p>
                        <p>&gt; ACTION REQUIRED: MANUAL AUTHENTICATION</p>
                    </div>

                    <p className="text-gray-400 text-sm italic font-mono">
                        System: Permanent data purge scheduled in 54:12 minutes.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextPhase}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-colors"
                >
                    <Lock size={18} />
                    Authorize Session
                </motion.button>
            </motion.div>

            <div className="absolute bottom-8 left-8 flex items-center gap-2 text-gray-600 font-mono text-xs uppercase tracking-tighter">
                <Terminal size={14} />
                <span>Root@System:~/auth-portal-v2</span>
            </div>
        </div>
    )
}
