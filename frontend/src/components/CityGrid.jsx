import { useState, useEffect, useMemo } from 'react'
import { Instances, Instance } from '@react-three/drei'

export default function CityGrid({ searchConfig }) {
  const [scrobbleData, setScrobbleData] = useState([])

  useEffect(() => {
    // fetch tjark
    if (!searchConfig.username) return

    fetch(`http://localhost:5000/tracks`, {
      credentials: 'include' // cookie weil cringe
    })
      .then(res => res.json())
      .then(data => {
        console.log("Loaded tracks:", data)
        setScrobbleData(data)
      })
      .catch(err => console.error("Error fetching data :(", err))
  }, [searchConfig])

  const spacing = 4
  const gridSize = Math.ceil(Math.sqrt(scrobbleData.length))

  const buildings = useMemo(() => {
    return scrobbleData.map((item, index) => {
      const playCount = parseInt(item.playcount, 10) || 1
      const height = Math.max(playCount / 10, 1)

      const x = (index % gridSize) - gridSize / 2
      const z = Math.floor(index / gridSize) - gridSize / 2

      return {
        position: [x * spacing, height / 2, z * spacing],
        scale: [2, height, 2],
        color: "#d51007" 
      }
    })
  }, [scrobbleData, gridSize])

  // track has to wait
  if (scrobbleData.length === 0) {
    return null; 
  }

  return (
    <Instances limit={buildings.length}>
      <boxGeometry />
      <meshStandardMaterial />
      {buildings.map((data, i) => (
        <Instance key={i} position={data.position} scale={data.scale} color={data.color} />
      ))}
    </Instances>
  )
}