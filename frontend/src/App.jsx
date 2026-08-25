import { useState } from 'react'
import './App.css'
import Hud from './components/Hud'
import CityScene from './components/CityScene'

function App() {
  // default Camera Mode is Orbit
  const [cameraMode, setCameraMode] = useState('orbit')
  
  return (
    <div className='app-wrapper'>
        {/*3d world*/}
        <CityScene cameraMode={cameraMode}></CityScene>

        {/*hud*/}
        <Hud cameraMode={cameraMode} setCameraMode={setCameraMode}></Hud>
    </div>
  )
}

export default App