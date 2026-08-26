import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, PointerLockControls, Stars, Text } from '@react-three/drei'
import PlayerMovement from './PlayerMovement'
import CityGrid from './CityGrid'
import { EffectComposer, Bloom } from '@react-three/postprocessing'


export default function CityScene({ cameraMode, searchConfig }) {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        {/* env */}
        <Sky sunPosition={[0, -10, -10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 10, 600]} />

        {/* floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[300, 300]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        <CityGrid searchConfig={searchConfig}></CityGrid>
              <EffectComposer>
                  <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.5} />
              </EffectComposer>

        {/* default skyscraper 
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[2, 5, 2]} />
          <meshStandardMaterial color="#d51007" />

          
            <Text
            position={[0, 1.5, 1.01]} 
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
            textAlign='center'
          >
            Alper Natlus
          </Text>
        </mesh> */}

        {/* camera controls */}
        <OrbitControls 
        makeDefault={cameraMode === 'orbit'} 
        enabled={cameraMode === 'orbit'} 
        maxPolarAngle={Math.PI / 2}
        />
        {/* Add PlayerMovement*/}
        {cameraMode === 'walk' && (
          <>
            <PointerLockControls makeDefault />
            <PlayerMovement />
          </>
        )}

      </Canvas>
    </div>
  )
}