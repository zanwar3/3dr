import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { useRef } from 'react';

export default function Scene({ children, ...props }) {



  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <directionalLight intensity={0.5} />
      <ambientLight intensity={0.5} />
      {children}
      <Preload all />
      <OrbitControls />
    </Canvas>
  )
}
