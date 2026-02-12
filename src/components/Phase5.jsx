import { motion } from 'framer-motion'
import { Heart, Link as LinkIcon, Sparkles } from 'lucide-react'

export default function Phase5({ data, nextPhase }) {
    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 opacity-5">
                <div className="absolute top-20 left-10"><Heart size={120} fill="red" /></div>
                <div className="absolute bottom-20 right-10"><Heart size={150} fill="red" /></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 max-w-2xl w-full text-center"
            >
                <div className="mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="inline-block p-4 bg-green-100 text-green-600 rounded-full mb-4"
                    >
                        <Sparkles size={32} />
                    </motion.div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-800">Authentication Successful!</h2>
                    <p className="text-gray-500 font-mono mt-2">Status: Permanently Connected</p>
                    <p className="mt-4 text-pink-600 font-bold italic">"Thank you for being the heart of my life."</p>
                </div>

                <div className="relative flex justify-between items-center h-64 mb-12">
                    {/* Her favorite photo of YOU */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg relative z-10"
                    >
                        <img src={data.images[2]} alt="You" title="Her favorite photo of you" className="w-full h-full object-cover" />
                    </motion.div>

                    {/* Connection Line */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-20">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                            className="h-1 bg-gradient-to-r from-pink-300 via-red-400 to-pink-300 relative"
                        >
                            <motion.div
                                animate={{ x: ['0%', '400%', '0%'] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="absolute top-1/2 -translate-y-1/2 left-0"
                            >
                                <Heart size={16} fill="#f43f5e" className="text-rose-500" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Her favorite photo of HERSELF */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg relative z-10"
                    >
                        <img src={data.images[3]} alt="Her" title="Her favorite photo of herself" className="w-full h-full object-cover" />
                    </motion.div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextPhase}
                    className="bg-pink-600 text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl shadow-pink-200 flex items-center gap-3 mx-auto"
                >
                    <LinkIcon size={18} />
                    Complete Linkage
                </motion.button>
            </motion.div>
        </div>
    )
}
