import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function PlayerMovement() {
  const keys = useRef({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) keys.current[key] = true;
    }
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) keys.current[key] = false;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [])

  useFrame((state, delta) => {
    const { camera } = state
    const speed = 5 * delta
    const { w, a, s, d } = keys.current

    
    const z = (s ? 1 : 0) - (w ? 1 : 0); // W moves forward (negative Z)
    const x = (d ? 1 : 0) - (a ? 1 : 0); // D moves right (positive X)

    const moveVector = new THREE.Vector3(x, 0, z);

    if (moveVector.length() > 0) {
      moveVector.normalize().multiplyScalar(speed);
      
      // Rotate the movement vector to match where the camera is currently looking (yaw)
      moveVector.applyEuler(new THREE.Euler(0, camera.rotation.y, 0));
      
      // Apply the movement
      camera.position.add(moveVector);
    }

    // Lock the camera strictly to eye-level 
    camera.position.y = 2; 
  });

  return null;
}