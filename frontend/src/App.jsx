import { useState } from 'react'
import './App.css'
import Hud from './components/Hud'
import CityScene from './components/CityScene'

function App() {
  // default Camera Mode is Orbit
  const [cameraMode, setCameraMode] = useState('orbit')
  // const zum speichern
  const [searchConfig, setSearchConfig] = useState({ username: '', type: 'tracks' })
  

  return (
    <div className='app-wrapper'>
        {/*3d world*/}
        <CityScene cameraMode={cameraMode} searchConfig={searchConfig}></CityScene>

        {/*hud*/}
        <Hud cameraMode={cameraMode} setCameraMode={setCameraMode} setSearchConfig={setSearchConfig}></Hud>
    </div>
  )
}

export default App