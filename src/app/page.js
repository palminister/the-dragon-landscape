'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from '@/components/Lighting';
import { Experience } from '@/components/Experience';
import { Name } from '@/components/Name';
import { Postprocessing } from '@/components/Postprocessing';
import { Html, useProgress } from '@react-three/drei';

export default function Home() {
  return (
    <>
      <Canvas dpr={[1, 2]} shadows>
        <Suspense fallback={<Loader />}>
          <Experience />
          <Lighting />
          {/* <Postprocessing /> */}
        </Suspense>
      </Canvas>
    </>
  );
}

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html
      center
      className="flex bg-black text-white font-thin w-screen h-screen justify-center items-center"
    >
      {progress.toFixed(2)}% Loaded
    </Html>
  );
};
