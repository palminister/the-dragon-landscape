import { useRef } from 'react';
import { Instances, Instance, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending } from 'three';

export const Ripples = ({ count = 20 }) => {
  const textureProps = {
    map: useTexture('/brush.png'),
    transparent: true,
    blending: AdditiveBlending,
    depthTest: false,
    depthWrite: false,
    opacity: 0,
  };

  return (
    <>
      <ambientLight intensity={1} />
      <Instances>
        <planeGeometry args={[0.5, 0.5, 1, 1]} />
        <meshStandardMaterial {...textureProps} />
        {[...Array(count)].map((_, i) => (
          <Ripple key={i} count={count} index={i} />
        ))}
      </Instances>
    </>
  );
};

const Ripple = ({ index, count, delta = 0.005 }) => {
  const ref = useRef();
  let prevMouse = { x: 0, y: 0 };
  let currentWave = 0;

  useFrame((state) => {
    const mouse = {
      x: (state.mouse.x * state.viewport.width) / 2,
      y: (state.mouse.y * state.viewport.height) / 2,
    };

    // Check if the mouse movement exceeds the specified
    // delta (distance between the current and previous mouse position)
    if (
      Math.abs(mouse.x - prevMouse.x) >= delta &&
      Math.abs(mouse.y - prevMouse.y) >= delta
    ) {
      // Cycle through the waves
      currentWave = (currentWave + 1) % count;
      // Apply the ripple effect to the current wave
      if (index === currentWave) {
        ref.current.instance.current.material.opacity +=
          0.1 * Math.abs(mouse.x - prevMouse.x);
        ref.current.scale.x = 1;
        ref.current.scale.y = 1;
        ref.current.position.x = mouse.x;
        ref.current.position.y = mouse.y;
      }
    }
    prevMouse = mouse;

    // Apply ripple transformation
    ref.current.rotation.z += 0.02;
    ref.current.scale.x = 0.98 * ref.current.scale.x + 0.1;
    ref.current.scale.y = 0.98 * ref.current.scale.x + 0.1;
    // Fade out the ripple effect over time
    ref.current.instance.current.material.opacity *= 0.999;
  });
  return <Instance ref={ref} rotation={[0, 0, 2 * Math.PI * Math.random()]} />;
};
