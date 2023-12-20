'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from '@/components/Lighting';
import { Experience } from '@/components/Experience';
import { Name } from '@/components/Name';
import { Postprocessing } from '@/components/Postprocessing';

export default function Home() {
  return (
    <>
      <Canvas dpr={[1, 2]} shadows>
        <Suspense fallback={null}>
          <Experience />
          <Lighting />
          {/* <Postprocessing /> */}
        </Suspense>
      </Canvas>
    </>
  );
}
