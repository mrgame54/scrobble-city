import './App.css'
import Hud from './components/Hud'

function App() {
  return (
    <div className='app-wrapper'>
        {/* the visulaizer will come here later*/}
        <div className="background-placeholder" style={{ width: '100vw', height: '100vh', background: '#111' }}></div>

        <Hud></Hud>
    </div>
  )
}

export default App