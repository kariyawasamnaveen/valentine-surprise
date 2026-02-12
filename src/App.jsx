import { useState } from 'react'
import Phase1 from './components/Phase1'
import Phase2 from './components/Phase2'
import Phase3 from './components/Phase3'
import Phase4 from './components/Phase4'
import Phase5 from './components/Phase5'
import Phase6 from './components/Phase6'

function App() {
  // DEV MODE: Start at Phase 4 for testing
  const [phase, setPhase] = useState(4)
  const [data, setData] = useState({
    startDate: '2022-02-14', // Mock Date
    images: [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
    ],
    username: 'Hansi'
  })

  const nextPhase = () => setPhase(prev => prev + 1)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {phase === 1 && <Phase1 nextPhase={nextPhase} />}
      {phase === 2 && <Phase2 nextPhase={nextPhase} />}
      {phase === 3 && <Phase3 setData={setData} nextPhase={nextPhase} />}
      {phase === 4 && <Phase4 data={data} nextPhase={nextPhase} />}
      {phase === 5 && <Phase5 data={data} nextPhase={nextPhase} />}
      {phase === 6 && <Phase6 data={data} />}
    </div>
  )
}

export default App
