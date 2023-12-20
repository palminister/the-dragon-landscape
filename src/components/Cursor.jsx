import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { calculateMovement } from '@/utils/cursor';

export const Cursor = ({ smoothingFactor = 0.2, scale = 0.8 }) => {
  const cursorGroupRef = useRef();
  const cursorRef = useRef();
  let prevMouse = { x: 0, y: 0 };
  let targetPosition = { x: 0, y: 0 };

  useFrame((state) => {
    const mouse = {
      x: (state.mouse.x * state.viewport.width) / 2,
      y: (state.mouse.y * state.viewport.height) / 2,
    };

    // Calculate the new target position with a smoothing factor
    targetPosition.x += (mouse.x - targetPosition.x) * smoothingFactor;
    targetPosition.y += (mouse.y - targetPosition.y) * smoothingFactor;

    // Update the cursor position
    cursorGroupRef.current.position.set(targetPosition.x, targetPosition.y, 0);

    if (cursorRef.current) {
      const { magnitude, directionDegrees } = calculateMovement(
        targetPosition,
        prevMouse
      );
      const scaleX = scale + magnitude;

      // Handle scale
      cursorRef.current.style.transform = `scale(${scaleX}, 0.8) translate(-50%, -50%)`;

      // Handle rotation (rotate the parent)
      const parentStyle = cursorRef.current.parentElement.style;
      parentStyle.transform = parentStyle.transform.replace(
        /rotate\([^\)]*\)/,
        ''
      );
      parentStyle.transform += ` rotate(${directionDegrees}deg)`;
    }
    prevMouse = mouse;
  });
  return (
    <group ref={cursorGroupRef}>
      <Html
        ref={cursorRef}
        center
        zIndexRange={[10, 0]}
        className="pointer-events-none"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="19.5" stroke="white" />
        </svg>
      </Html>
    </group>
  );
};
