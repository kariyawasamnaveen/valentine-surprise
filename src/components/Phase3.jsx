import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Calendar, CheckCircle2, Loader2, Sparkles, Terminal, Activity, Heart, ShieldCheck, Lock } from 'lucide-react'

const QUESTIONS = [
    { id: 1, label: "Block 01: The Spark", text: "When did this all begin?", subtext: "Select the date and upload the photo from that special day.", type: "date-image" },
    { id: 2, label: "Block 02: The First Seal", text: "Upload a memory from our very first kiss.", subtext: "This node is essential for heart-rate synchronization.", type: "image" },
    { id: 3, label: "Block 03: The Subject", text: "Upload your absolute favorite photo of ME.", subtext: "The system needs to verify the developer's primary identity.", type: "image" },
    { id: 4, label: "Block 04: The Muse", text: "Upload your absolute favorite photo of YOURSELF.", subtext: "Establishing the primary inspiration module...", type: "image" },
    { id: 5, label: "Block 05: The Core", text: "Upload the photo that best represents US together.", subtext: "Finalizing love encryption protocols...", type: "image" },
]

export default function Phase3({ setData, nextPhase }) {
    const [currentStep, setCurrentStep] = useState(0)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [tempDate, setTempDate] = useState('')
    const [images, setImages] = useState([])
    const [analyzingText, setAnalyzingText] = useState('')
    const [heartRate, setHeartRate] = useState(72)

    // Dynamic heart rate simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setHeartRate(prev => {
                const change = Math.floor(Math.random() * 5) - 2
                return Math.max(68, Math.min(85, prev + change))
            })
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setIsAnalyzing(true)
        const texts = ["Extracting Metadata...", "Verifying Emotional Signature...", "Syncing Pixels...", "Analyzing Heart-Rate Modules..."]
        let i = 0
        const interval = setInterval(() => {
            setAnalyzingText(texts[i % texts.length])
            i++
        }, 800)

        // Simulate analysis time
        setTimeout(() => {
            clearInterval(interval)
            const reader = new FileReader()
            reader.onload = (event) => {
                const newImages = [...images, event.target.result]
                setImages(newImages)

                if (currentStep === 0) {
                    setData(prev => ({ ...prev, startDate: tempDate }))
                }

                if (currentStep < QUESTIONS.length - 1) {
                    setCurrentStep(currentStep + 1)
                    setIsAnalyzing(false)
                } else {
                    setData(prev => ({ ...prev, images: newImages }))
                    setIsAnalyzing(false)
                    nextPhase()
                }
            }
            reader.readAsDataURL(file)
        }, 3000)
    }

    const progress = ((currentStep) / QUESTIONS.length) * 100

    return (
        <div className="min-h-screen bg-[#070205] text-zinc-300 p-4 md:p-8 flex flex-col items-center justify-center font-mono relative overflow-hidden">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                <div className="w-full h-full bg-[linear-gradient(rgba(244,63,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#070205_100%)]" />
            </div>

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 z-10">
                
                {/* LEFT SIDEBAR: Developer / System Status Hub */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* System specs widget */}
                    <div className="bg-[#0d0408]/80 border border-rose-500/20 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rose-500/40"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-rose-500/40"></div>
                        
                        <div className="flex items-center gap-2.5 text-rose-500 mb-4 border-b border-rose-950 pb-3">
                            <Activity size={18} className="animate-pulse" />
                            <h2 className="text-xs font-bold uppercase tracking-widest">Love Core Telemetry</h2>
                        </div>
                        
                        <div className="space-y-3.5 text-xs">
                            <div className="flex justify-between items-center bg-[#12060c]/40 p-2.5 rounded border border-rose-950/40">
                                <span className="text-zinc-500">DEVELOPER_ID</span>
                                <span className="text-rose-400 font-bold">Naveen</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#12060c]/40 p-2.5 rounded border border-rose-950/40">
                                <span className="text-zinc-500">TARGET_MUSE</span>
                                <span className="text-pink-400 font-bold">Hansi</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#12060c]/40 p-2.5 rounded border border-rose-950/40">
                                <span className="text-zinc-500">HEART_RATE</span>
                                <span className="text-rose-500 font-bold flex items-center gap-1">
                                    <Heart size={12} fill="#f43f5e" className="animate-bounce" />
                                    {heartRate} BPM
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-[#12060c]/40 p-2.5 rounded border border-rose-950/40">
                                <span className="text-zinc-500">ENCRYPTION</span>
                                <span className="text-emerald-500 font-bold flex items-center gap-1">
                                    <Lock size={12} /> AES_LOVE_256
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Sectors decryption widget */}
                    <div className="bg-[#0d0408]/80 border border-rose-500/20 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden flex-1 hidden lg:block">
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-rose-500/40"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rose-500/40"></div>

                        <div className="flex items-center gap-2.5 text-rose-500 mb-4 border-b border-rose-950 pb-3">
                            <Terminal size={18} />
                            <h2 className="text-xs font-bold uppercase tracking-widest">Memory Blocks Status</h2>
                        </div>

                        <div className="space-y-3 text-xs">
                            {QUESTIONS.map((q, idx) => {
                                const isDone = idx < currentStep
                                const isCurrent = idx === currentStep
                                return (
                                    <div 
                                        key={q.id}
                                        className={`flex items-center justify-between p-2 rounded transition-colors ${
                                            isCurrent ? 'bg-rose-500/10 border border-rose-500/30' : 'bg-transparent'
                                        }`}
                                    >
                                        <span className={isDone ? 'text-rose-500/70 line-through' : isCurrent ? 'text-rose-400 font-bold' : 'text-zinc-600'}>
                                            {q.label.split(":")[0]}
                                        </span>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                            isDone ? 'text-rose-500/40 border border-rose-500/10' :
                                            isCurrent ? 'text-rose-500 animate-pulse border border-rose-500/20' :
                                            'text-zinc-700 border border-zinc-900'
                                        }`}>
                                            {isDone ? 'Decrypted' : isCurrent ? 'Decrypting' : 'Sealed'}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* CENTER AREA: Main Interface Card */}
                <div className="lg:col-span-8 flex flex-col justify-center">
                    {/* Progress System */}
                    <div className="mb-8 bg-[#0d0408]/40 border border-rose-950/40 p-4 rounded-2xl backdrop-blur-md">
                        <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-500 mb-2.5 px-1 font-bold">
                            <span className="flex items-center gap-2">
                                <ShieldCheck size={14} className="text-rose-500" />
                                Memory Validation Progress
                            </span>
                            <span className="text-rose-500">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-rose-950/30">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", stiffness: 80 }}
                                className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {!isAnalyzing ? (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[#0d0408]/90 border border-rose-500/25 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-[0_30px_70px_-20px_rgba(244,63,94,0.15)] backdrop-blur-md"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Sparkles size={140} className="text-rose-500" />
                                </div>

                                <div className="flex items-center gap-2 text-rose-500 mb-3 border-b border-rose-950/60 pb-3">
                                    <CheckCircle2 size={16} className="animate-pulse" />
                                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">{QUESTIONS[currentStep].label}</span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-zinc-100 font-serif leading-tight">
                                    {QUESTIONS[currentStep].text}
                                </h3>
                                <p className="text-zinc-500 text-xs sm:text-sm mb-8 leading-relaxed">
                                    {QUESTIONS[currentStep].subtext}
                                </p>

                                <div className="space-y-6">
                                    {QUESTIONS[currentStep].type === "date-image" && (
                                        <div className="space-y-2 group">
                                            <label className="text-xs uppercase text-zinc-500 flex items-center gap-2 group-focus-within:text-rose-500 transition-colors">
                                                <Calendar size={12} /> Milestone Date
                                            </label>
                                            <input
                                                type="date"
                                                value={tempDate}
                                                onChange={(e) => setTempDate(e.target.value)}
                                                className="w-full bg-[#12060c]/60 border border-rose-950/80 rounded-xl p-3.5 text-zinc-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all font-mono"
                                            />
                                        </div>
                                    )}

                                    <label className={`
                                        flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-rose-950/80 rounded-2xl cursor-pointer
                                        hover:border-rose-500/40 hover:bg-rose-500/[0.02] transition-all group relative overflow-hidden
                                        ${(QUESTIONS[currentStep].type === "date-image" && !tempDate) ? 'opacity-20 pointer-events-none' : ''}
                                    `}>
                                        {/* Hover Laser Line effect */}
                                        <div className="absolute inset-x-0 h-[1px] bg-rose-500/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse pointer-events-none" />

                                        <div className="flex flex-col items-center justify-center p-6 text-center">
                                            <div className="p-4 bg-[#12060c]/80 rounded-full mb-4 border border-rose-950/40 group-hover:border-rose-500/30 group-hover:bg-rose-500/10 transition-all">
                                                <Camera size={26} className="text-zinc-500 group-hover:text-rose-400 transition-colors" />
                                            </div>
                                            <p className="text-sm font-bold text-zinc-400 group-hover:text-rose-400 transition-colors">
                                                Click to upload memory
                                            </p>
                                            <p className="text-[10px] text-zinc-600 mt-2 uppercase tracking-wider">
                                                System requires primary image payload
                                            </p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                    </label>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20 bg-[#0d0408]/90 border border-rose-500/25 p-8 sm:p-12 rounded-3xl shadow-[0_30px_70px_-20px_rgba(244,63,94,0.15)] backdrop-blur-md relative overflow-hidden"
                            >
                                {/* Laser scanning line */}
                                <motion.div 
                                    animate={{ y: [-150, 150] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="absolute inset-x-0 h-0.5 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)] pointer-events-none z-10"
                                />

                                <div className="relative mb-8">
                                    <Loader2 size={56} className="text-rose-500 animate-spin" />
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute inset-0 bg-rose-500 blur-2xl opacity-30"
                                    />
                                </div>
                                <p className="text-rose-400 font-bold tracking-widest uppercase text-xs sm:text-sm font-mono">
                                    {analyzingText}
                                </p>
                                <p className="text-zinc-600 mt-2 text-[10px] uppercase tracking-wider font-mono">
                                    Decrypting image vectors & syncing memory nodes...
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-8 text-center text-zinc-600 text-[10px] uppercase tracking-widest font-mono">
                        Security Verification Node: {currentStep + 1} / {QUESTIONS.length} Verified
                    </div>
                </div>

            </div>
        </div>
    )
}
