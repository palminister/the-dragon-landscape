import { useEffect, useRef, Suspense } from 'react';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import { LoopOnce } from 'three';

export const Dragon = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/dragon.glb');
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    setTimeout(() => {
      for (const action of Object.values(actions)) {
        action.setLoop(LoopOnce, 1);
        action.play();
        action.clampWhenFinished = true;
      }
    }, 1000);

    for (const children of group.current.children[0].children) {
      // children.material.color.set('#e60532');
      children.material.color.set('#d7be68');
      // children.material.color.set('#a48d3f');
    }
    // console.log(materials.scales);
  }, [actions]);
  return (
    <Suspense fallback={null}>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <mesh
            name="head"
            castShadow
            receiveShadow
            geometry={nodes.head.geometry}
            material={materials.base}
            position={[-18.338, -9.879, -45.013]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={4.176}
          />
          <mesh
            name="leg-front"
            castShadow
            receiveShadow
            geometry={nodes['leg-front'].geometry}
            material={materials.base}
            position={[-8.13, -25.357, -53.895]}
            rotation={[-0.952, -0.573, -0.339]}
            scale={2.664}
          />
          <mesh
            name="leg-back"
            castShadow
            receiveShadow
            geometry={nodes['leg-back'].geometry}
            material={materials.base}
            position={[16.391, -62.33, -75.52]}
            rotation={[-0.952, -0.573, -0.339]}
            scale={2.664}
          />
          <mesh
            name="low-body001"
            castShadow
            receiveShadow
            geometry={nodes['low-body001'].geometry}
            material={materials.scales}
            morphTargetDictionary={nodes['low-body001'].morphTargetDictionary}
            morphTargetInfluences={nodes['low-body001'].morphTargetInfluences}
          />
          <mesh
            name="fur000"
            castShadow
            receiveShadow
            geometry={nodes.fur000.geometry}
            material={materials.base}
            position={[-12.564, -17.146, -51.019]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={1.702}
          />
          <mesh
            name="fur001"
            castShadow
            receiveShadow
            geometry={nodes.fur001.geometry}
            material={materials.base}
            position={[-7.489, -24.798, -55.495]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={1.777}
          />
          <mesh
            name="fur002"
            castShadow
            receiveShadow
            geometry={nodes.fur002.geometry}
            material={materials.base}
            position={[-3.246, -31.195, -59.236]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={2.801}
          />
          <mesh
            name="fur003"
            castShadow
            receiveShadow
            geometry={nodes.fur003.geometry}
            material={materials.base}
            position={[3.129, -40.808, -64.859]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={1.816}
          />
          <mesh
            name="fur004"
            castShadow
            receiveShadow
            geometry={nodes.fur004.geometry}
            material={materials.base}
            position={[7.019, -47.26, -68.16]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={1.692}
          />
          <mesh
            name="fur005"
            castShadow
            receiveShadow
            geometry={nodes.fur005.geometry}
            material={materials.base}
            position={[11.679, -53.905, -71.96]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={2.278}
          />
          <mesh
            name="fur006"
            castShadow
            receiveShadow
            geometry={nodes.fur006.geometry}
            material={materials.base}
            position={[18.394, -64.502, -78.209]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={2.278}
          />
          <mesh
            name="fur007"
            castShadow
            receiveShadow
            geometry={nodes.fur007.geometry}
            material={materials.base}
            position={[23.298, -71.897, -82.534]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={2.278}
          />
          <mesh
            name="fur008"
            castShadow
            receiveShadow
            geometry={nodes.fur008.geometry}
            material={materials.base}
            position={[34.105, -88.228, -92.748]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={2.902}
          />
          <mesh
            name="fur009"
            castShadow
            receiveShadow
            geometry={nodes.fur009.geometry}
            material={materials.base}
            position={[41.437, -99.2, -98.498]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={2.653}
          />
          <mesh
            name="fur010"
            castShadow
            receiveShadow
            geometry={nodes.fur010.geometry}
            material={materials.base}
            position={[45.687, -105.609, -102.246]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={2.468}
          />
          <mesh
            name="fur011"
            castShadow
            receiveShadow
            geometry={nodes.fur011.geometry}
            material={materials.base}
            position={[56.957, -120.723, -111.398]}
            rotation={[-1.046, -0.533, -0.373]}
            scale={2.729}
          />
        </group>
      </group>
    </Suspense>
  );
};
