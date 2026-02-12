import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart } from 'lucide-react'

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
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="max-w-xl w-full"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl sm:text-6xl font-black text-pink-600 mb-2 drop-shadow-sm">
                        CONGRATULATIONS!
                    </h1>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">
                        Heart Integrity: 100% Secured
                    </p>
                </motion.div>

                {/* The Final Heart Centerpiece */}
                <div className="relative mb-12 flex justify-center">
                    <motion.div
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="w-64 h-64 sm:w-80 sm:h-80 bg-white p-4 rounded-[4rem] shadow-2xl relative overflow-hidden"
                        style={{ clipPath: 'path("M40 90 C 20 20, 100 20, 100 90 C 100 160, 20 160, 20 90")' }} // Custom heart path (rough)
                    >
                        {/* Better heart clip using SVG mask or just div shape */}
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

                    {/* Floating Hearts Decorations */}
                    <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-4 -left-4 text-pink-400 opacity-50"><Heart size={40} fill="currentColor" /></motion.div>
                    <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute -bottom-4 -right-4 text-pink-400 opacity-50"><Heart size={30} fill="currentColor" /></motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-pink-100 shadow-xl shadow-pink-200/50"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        You've successfully got my heart.
                    </h2>
                    <p className="text-lg text-pink-600 font-medium italic mb-6">
                        "You are the most beautiful variable in my life's code. Happy Valentine's Day, My Love!"
                    </p>

                    <div className="flex justify-center gap-2">
                        {[1, 2, 3].map(i => (
                            <Heart key={i} size={20} fill="#f43f5e" className="text-pink-500 animate-pulse" />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
