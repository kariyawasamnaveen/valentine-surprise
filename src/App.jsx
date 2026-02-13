import { useState } from 'react'
import Phase1 from './components/Phase1'
import Phase2 from './components/Phase2'
import Phase3 from './components/Phase3'
import Phase4 from './components/Phase4'
import Phase5 from './components/Phase5'
import Phase6 from './components/Phase6'

function App() {
  // PRODUCTION MODE: Start from Phase 1
  const [phase, setPhase] = useState(1)
  const [data, setData] = useState({
    startDate: '',
    images: [],
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
