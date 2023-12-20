import { useEffect, useRef, useState } from 'react';
import {
  MeshReflectorMaterial,
  PerspectiveCamera,
  RenderTexture,
  useTexture,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RepeatWrapping, SRGBColorSpace } from 'three';
import { Ripples } from '@/components/Ripple';

export const Water = () => {
  const rippleRef = useRef();
  const [isRippleLoaded, setIsRippleLoaded] = useState(false);

  useEffect(() => {
    if (rippleRef.current) {
      setIsRippleLoaded(true);
    }
  }, [rippleRef]);

  const waterTexture = useTexture('/water-height-blur.jpg');
  waterTexture.wrapS = waterTexture.wrapT = RepeatWrapping;
  waterTexture.repeat.set(2, 2);
  waterTexture.colorSpace = SRGBColorSpace;

  useFrame((state, delta) => {
    waterTexture.offset.y -= delta * 0.03;
  });

  return (
    <mesh rotation-x={Math.PI * -0.5}>
      <planeGeometry args={[20, 20, 12, 12]} />
      <MeshReflectorMaterial
        mirror={1}
        roughness={0.5}
        resolution={1024}
        distortion={isRippleLoaded ? 0.5 : 0}
        distortionMap={isRippleLoaded ? rippleRef.current : null}
      />
      {/* <meshStandardMaterial> */}
      <RenderTexture ref={rippleRef} attach="map">
        <PerspectiveCamera
          makeDefault
          manual
          aspect={1 / 1}
          position={[0, 0, 10]}
        />
        <ambientLight intensity={1} />
        <primitive attach="background" object={waterTexture} />
        <Ripples />
      </RenderTexture>
      {/* </meshStandardMaterial> */}
    </mesh>
  );
};
