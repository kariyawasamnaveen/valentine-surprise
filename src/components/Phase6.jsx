import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, Infinity } from 'lucide-react'

export default function Phase6({ data }) {
    useEffect(() => {
        // Initial celebration
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval)
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-100 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">

            {/* V24.0: Floating Environmental Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-200"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0.5 + Math.random()
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Heart size={20 + Math.random() * 40} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="max-w-xl w-full z-10"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="mb-10"
                >
                    <div className="inline-flex items-center justify-center p-4 bg-rose-100 rounded-full mb-6 shadow-lg">
                        <Sparkles className="text-rose-500" size={32} />
                    </div>
                    <h1 className="text-4xl sm:text-7xl font-black text-rose-600 mb-4 drop-shadow-md tracking-tighter">
                        FOREVER.
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">
                        Timeline Generated & Secured
                    </p>
                </motion.div>

                {/* The Final Heart Centerpiece */}
                <div className="relative mb-16 flex justify-center">
                    <motion.div
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="w-64 h-64 sm:w-80 sm:h-80 bg-white p-4 rounded-[4rem] shadow-[0_20px_60px_-10px_rgba(244,63,94,0.4)] relative overflow-hidden"
                        style={{ clipPath: 'path("M40 90 C 20 20, 100 20, 100 90 C 100 160, 20 160, 20 90")' }}
                    >
                        <div
                            className="w-full h-full bg-pink-100 relative overflow-hidden"
                            style={{
                                clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
                                transform: 'scale(1.1)'
                            }}
                        >
                            <img
                                src={data.images[4]}
                                alt="Us"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Floating Hearts Decorations around Photo */}
                    <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-6 -left-6 text-rose-400 opacity-80 filter drop-shadow-lg"><Heart size={50} fill="currentColor" /></motion.div>
                    <motion.div animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute -bottom-6 -right-6 text-rose-400 opacity-80 filter drop-shadow-lg"><Heart size={40} fill="currentColor" /></motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 font-serif">
                        You've successfully got my heart.
                    </h2>
                    <p className="text-lg md:text-xl text-rose-600 font-medium italic mb-8 leading-relaxed">
                        "You are the most beautiful bug in my life's code that I never want to fix. Happy Valentine's Day, My Love!"
                    </p>

                    <div className="flex justify-center items-center gap-4 text-rose-500 opacity-80">
                        <div className="h-px w-12 bg-rose-300"></div>
                        <Infinity size={32} />
                        <div className="h-px w-12 bg-rose-300"></div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
