import { useState } from 'react'
import Phase1 from './components/Phase1'
import Phase2 from './components/Phase2'
import Phase3 from './components/Phase3'
import Phase4 from './components/Phase4'
import Phase5 from './components/Phase5'
import Phase6 from './components/Phase6'

function App() {
  // DEV MODE: Start from Phase 6 for testing
  const [phase, setPhase] = useState(6)
  const [data, setData] = useState({
    startDate: '2022-02-14',
    images: [
      '', '', '', '',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2488&auto=format&fit=crop' // Mock Image for Phase 6
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
