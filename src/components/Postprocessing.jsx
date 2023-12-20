import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

export const Postprocessing = () => {
  return (
    <EffectComposer multisampling={8}>
      {/* <Bloom
        intensity={0.1} // The bloom intensity.
        // blurPass={undefined} // A blur pass.
        // kernelSize={KernelSize.HUGE} // blur kernel size
        // luminanceThreshold={3} // luminance threshold. Raise this value to mask out darker elements in the scene.
        // luminanceSmoothing={0.25} // smoothness of the luminance threshold. Range is [0, 1]
        mipmapBlur
      /> */}
      <SSR />
    </EffectComposer>
  );
};
