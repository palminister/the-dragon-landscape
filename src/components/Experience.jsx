import { useRef, Suspense, useMemo, useEffect, useState } from 'react';
import {
  MeshDistortMaterial,
  OrbitControls,
  PerspectiveCamera,
  Float,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { Water } from '@/components/Water';
import { Terrain } from '@/components/Terrain';
import { Cursor } from '@/components/Cursor';
import { Flower } from './Flower';
import { Dragon } from '@/components/Dragon';

export const Experience = () => {
  const cameraRef = useRef();
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <>
      {/* <Perf position="top-right" /> */}
      <PerspectiveCamera ref={cameraRef} position={[0, 1, 10]} makeDefault />
      {/* <OrbitControls /> */}
      {/* <mesh position={[4, 0.5, 4]} rotation={[0, 2, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh> */}
      {/* 
      <mesh position={[0, 0, 0]} rotation={[0, 1, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh> */}
      {/* <Flower /> */}
      {/* <Ripples /> */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <Dragon scale={0.1} position={[0, 0, 5]} />
      </Float>
      <Water />
      <Terrain />
      <mesh position={[0, -1, -20]} scale={9}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#f55b20"
          // emissive="#f55b20"
          toneMapped={false}
          // emissive={[4, 1, 0.5]}
          // emissiveIntensity={10}
        />
        {/* <MeshDistortMaterial color="#f55b20" distort={0.3} speed={0.2} /> */}
      </mesh>
      <Cursor />
    </>
  );
};
