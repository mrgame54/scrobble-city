import { useState, useEffect, useMemo } from 'react'
import { Instances, Instance } from '@react-three/drei'

export default function CityGrid() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // fetch tjark
    fetch('http://localhost:5000/tracks')
      .then(res => res.json())
      .then(data => {
        console.log("Loaded Tracks:", data)
        setTracks(data)
      })
      .catch(err => console.error("Error fetching tracks:", err))
  }, [])

  const spacing = 4;
  const gridSize = Math.ceil(Math.sqrt(tracks.length))

  const buildings = useMemo(() => {
    return tracks.map((track, index) => {
      const playCount = parseInt(track.playcount, 10) || 1
      const height = Math.max(playCount / 10, 1); 

      const x = (index % gridSize) - gridSize / 2;
      const z = Math.floor(index / gridSize) - gridSize / 2

      return {
        position: [x * spacing, height / 2, z * spacing],
        scale: [2, height, 2],
        color: "#d51007" 
      };
    });
  }, [tracks, gridSize]);

  // track has to wait
  if (tracks.length === 0) {
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