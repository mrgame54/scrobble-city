import { useMemo } from 'react'
import { Instances, Instance } from '@react-three/drei'

export default function CityGrid() {
  const gridSize = 20; // 20x20 grid = 400 buildings
  const spacing = 4; // Space between buildings

  const buildings = useMemo(() => {
    const temp = [];
    
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // leave a 2x2 empty clearing in the center for the player to spawn
        if (Math.abs(x - gridSize / 2) < 2 && Math.abs(z - gridSize / 2) < 2) continue;

        // generate a random height based on imaginary scrobble counts
        const height = Math.random() * 15 + 3; 

        temp.push({
          position: [
            (x - gridSize / 2) * spacing, 
            height / 2, 
            (z - gridSize / 2) * spacing
          ],
          scale: [2, height, 2],
          color: Math.random() > 0.9 ? "#d51007" : "#dbd7d7" 
        });
      }
    }
    return temp;
  }, []);

  return (
    <Instances limit={buildings.length}>
      {/*define shape material once */}
      <boxGeometry />
      <meshStandardMaterial />
      
      {/* stamp it hundreds of times */}
      {buildings.map((data, i) => (
        <Instance 
          key={i} 
          position={data.position} 
          scale={data.scale} 
          color={data.color} 
        />
      ))}
    </Instances>
  );
}