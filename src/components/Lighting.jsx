import {
  CubeCamera,
  Environment,
  Sky,
  AccumulativeShadows,
  RandomizedLight,
  useTexture,
  GradientTexture,
  SpotLight,
} from '@react-three/drei';
// import { useControls } from 'leva';
import * as THREE from 'three';

export const Lighting = () => {
  const texture = useTexture('pinksky.jpg');
  // const texture = useTexture('sky_0011.jpg');
  // const texture = useTexture('/sky-unreal.png');
  // const texture = useTexture('/vangogh.jpg');

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);

  // const { rotateX, rotateY } = useControls({
  //   rotateX: {
  //     value: 3.29,
  //     min: -1,
  //     max: 2 * Math.PI,
  //     step: 0.01,
  //   },
  //   rotateY: {
  //     value: 0,
  //     min: 0,
  //     max: 2 * Math.PI,
  //     step: 0.01,
  //   },
  // });
  // const { rotateX, rotateY } = useControls({
  //   rotateX: {
  //     value: -0.53,
  //     min: -1,
  //     max: 2 * Math.PI,
  //     step: 0.01,
  //   },
  //   rotateY: {
  //     value: 0,
  //     min: 0,
  //     max: 2 * Math.PI,
  //     step: 0.01,
  //   },
  // });
  // const { intensity, decay, positionX, positionY, positionZ, rotateX } =
  //   useControls({
  //     intensity: {
  //       value: 2,
  //       min: 0,
  //       max: 100,
  //       step: 0.1,
  //     },
  //     decay: {
  //       value: 1,
  //       min: 0,
  //       max: 100,
  //       step: 0.1,
  //     },
  //     positionX: {
  //       value: 0,
  //       step: 0.1,
  //     },
  //     positionY: {
  //       value: 0,
  //       step: 0.1,
  //     },
  //     positionZ: {
  //       value: 0,
  //       step: 0.1,
  //     },
  //     rotateX: {
  //       value: 0,
  //       min: -1,
  //       max: 2 * Math.PI,
  //       step: 0.01,
  //     },
  //     rotateY: {
  //       value: 0,
  //       min: 0,
  //       max: 2 * Math.PI,
  //       step: 0.01,
  //     },
  //   });
  return (
    <>
      {/* <color attach="background" args={['skyblue']} /> */}
      {/* <color attach="background" args={['white']} /> */}
      {/* <Environment files="Sky_CumulusAltoStratus_HDR_4k.exr" background /> */}

      {/* <Environment background resolution={64}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial side={THREE.BackSide} color="hotpink" />
        </mesh>
      </Environment> */}
      {/* <Environment background near={1} far={1000} resolution={256}>
        <mesh scale={100} rotation={[rotateX, 0, 0]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial side={THREE.BackSide}>
            <GradientTexture
              stops={[0, 0.25, 0.5, 1]} // As many stops as you want
              colors={['#9d839a', '#9f90a0', '#dfad9e', '#d8a2ac']} // Colors need to match the number of stops
              // colors={['#112734', '#112734', '#746b5c', '#887763', '#b09f85']} // Colors need to match the number of stops
              size={1024} // Size is optional, default = 1024
            />
          </meshBasicMaterial>
        </mesh>
      </Environment> */}
      {/* <Sky azimuth={1} inclination={0.6} distance={1000} /> */}
      {/* <GradientTexture
        attach="background"
        stops={[0, 0.25, 0.5, 1]} // As many stops as you want
        colors={['#9d839a', '#9f90a0', '#dfad9e', '#d8a2ac']} // Colors need to match the number of stops
        // colors={['#112734', '#112734', '#746b5c', '#887763', '#b09f85']} // Colors need to match the number of stops
        size={1024} // Size is optional, default = 1024
      /> */}
      {/* <ambientLight intensity={1} /> */}

      <Environment background near={1} far={1000} resolution={2048}>
        <mesh scale={100} rotation={[0.17, 3.55, 0]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
      </Environment>

      <directionalLight intensity={2.0} position={[0, 5.0, -4.0]} castShadow />
      {/* <directionalLight intensity={2.5} position={[-5, 5, 0]} castShadow /> */}

      {/* <directionalLight intensity={1} position={[-10, 10, 0]} castShadow /> */}
      {/* <directionalLight
        color={'#f8e6d2'}
        intensity={5}
        position={[-1, 2, -2]}
        castShadow
      /> */}
      {/* <pointLight intensity={8} position={[-0.9, 2, 3]} /> */}
      <pointLight intensity={76.6} position={[5.0, 6.0, -11.0]} />
      <pointLight intensity={60} position={[-5.0, 0, -9.5]} />
      <pointLight
        color={'#f8e6d2'}
        intensity={35}
        decay={3}
        position={[0, 2.8, 4.0]}
      />
      {/* <pointLight
        color={'#f8e6d2'}
        intensity={intensity}
        decay={decay}
        position={[positionX, positionY, positionZ]}
      /> */}
      {/* <SpotLight
        distance={5}
        angle={0.15}
        attenuation={5}
        anglePower={15} // Diffuse-cone anglePower (default: 5)
        position={[positionX, positionY, positionZ]}
      /> */}
    </>
  );
};
