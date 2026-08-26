import { useState, useEffect, useMemo } from 'react'
import { Instances, Instance, Text } from '@react-three/drei'

export default function CityGrid({ searchConfig }) {
  const [scrobbleData, setScrobbleData] = useState([])

  useEffect(() => {
    // fetch tjark
    if (!searchConfig.username) return

    fetch(`http://localhost:5000/${searchConfig.type}`, {
      credentials: 'include' // cookie weil cringe
    })
      .then(res => res.json())
      .then(data => {
        console.log("Loaded tracks:", data)
        setScrobbleData(data)
      })
      .catch(err => console.error("Error fetching data :(", err))
  }, [searchConfig])

  const spacing = 6
  const gridSize = Math.ceil(Math.sqrt(scrobbleData.length)) + 2

  const buildings = useMemo(() => {
  let gridCoords = []
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const posX = x - Math.floor(gridSize / 2)
      const posZ = z - Math.floor(gridSize / 2)
    
      const distance = Math.sqrt(posX * posX + posZ * posZ) + (Math.random() * 3)
      
      gridCoords.push({ x: posX, z: posZ, dist: distance })
    }
  }
  gridCoords.sort((a, b) => a.dist - b.dist)

  return scrobbleData.map((item, index) => {
    const rawCount = item.playcount || item.count || 1
    const playCount = parseInt(rawCount, 10) || 1
    
    // height scaling /8 , if you want to change
    const height = Math.max(playCount / 8, 1)
    const coord = gridCoords[index] || { x: 0, z: 0 }

    return {
      position: [coord.x * spacing, height / 2, coord.z * spacing],
      scale: [2, height, 2],
      color: "#d51007", 
      name: item.name,
      height: height
    }
  })
  }, [scrobbleData, gridSize])

  // track has to wait
  if (scrobbleData.length === 0) {
    return null 
  }

  return (
    <>
      <Instances limit={buildings.length}>
        <boxGeometry />
        <meshStandardMaterial />
        {buildings.map((data, i) => (
          <Instance key={i} position={data.position} scale={data.scale} color={data.color} />
        ))}
      </Instances>

      {/*floating 3D names */}
      {buildings.map((data, i) => (
        <Text
          key={`text-${i}`}
          // Place the text exactly at the building's X/Z, but float it 0.5 units above the roof
          position={[data.position[0], data.height + 0.5, data.position[2]]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="bottom"
          maxWidth={3.5} // Wraps long song titles so they don't overlap neighbors
          textAlign="center"
        >
          {data.name}
        </Text>
      ))}
    </>
  )
}