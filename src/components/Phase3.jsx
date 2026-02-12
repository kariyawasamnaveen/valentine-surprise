import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Calendar, Upload, CheckCircle2, Loader2, Sparkles } from 'lucide-react'

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
        <div className="min-h-screen bg-[#080808] text-white p-6 flex flex-col items-center justify-center font-mono">
            <div className="max-w-2xl w-full">
                {/* Progress System */}
                <div className="mb-12">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-gray-500 mb-2">
                        <span>Memory Validation Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-pink-600 to-red-600 shadow-lg shadow-pink-600/20"
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {!isAnalyzing ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-[#111] border border-gray-800 p-8 rounded-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles size={100} className="text-pink-500" />
                            </div>

                            <div className="flex items-center gap-2 text-pink-500 mb-2">
                                <CheckCircle2 size={16} />
                                <span className="text-xs font-bold uppercase tracking-tighter">{QUESTIONS[currentStep].label}</span>
                            </div>

                            <h3 className="text-2xl font-bold mb-2 text-gray-100">{QUESTIONS[currentStep].text}</h3>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">{QUESTIONS[currentStep].subtext}</p>

                            <div className="space-y-6">
                                {QUESTIONS[currentStep].type === "date-image" && (
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase text-gray-600 flex items-center gap-2">
                                            <Calendar size={12} /> Milestone Date
                                        </label>
                                        <input
                                            type="date"
                                            value={tempDate}
                                            onChange={(e) => setTempDate(e.target.value)}
                                            className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-pink-600 outline-none transition-colors"
                                        />
                                    </div>
                                )}

                                <label className={`
                  flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-800 rounded-2xl cursor-pointer
                  hover:border-pink-600/50 hover:bg-pink-900/5 transition-all group
                  ${(QUESTIONS[currentStep].type === "date-image" && !tempDate) ? 'opacity-30 pointer-events-none' : ''}
                `}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="p-3 bg-gray-900 rounded-full mb-3 group-hover:bg-pink-900/20 transition-colors">
                                            <Camera size={24} className="text-gray-500 group-hover:text-pink-500" />
                                        </div>
                                        <p className="text-sm text-gray-500">Click to upload memory</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                </label>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20 bg-[#111] border border-pink-900/20 p-8 rounded-2xl"
                        >
                            <div className="relative mb-6">
                                <Loader2 size={48} className="text-pink-600 animate-spin" />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 bg-pink-600 blur-xl opacity-20"
                                />
                            </div>
                            <p className="text-pink-500 font-bold tracking-widest uppercase text-xs">{analyzingText}</p>
                            <p className="text-gray-600 mt-2 text-[10px] uppercase">Bypassing memory firewalls...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8 text-center text-gray-700 text-[10px] uppercase tracking-widest">
                    Security Node: {currentStep + 1} / {QUESTIONS.length} Verified
                </div>
            </div>
        </div>
    )
}
