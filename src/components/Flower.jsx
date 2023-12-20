import { useGLTF } from '@react-three/drei';

export const Flower = (props) => {
  const { nodes, materials } = useGLTF('/flower.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.petal.geometry}
        material={materials['petal-material']}
        position={[0.026, 0.307, -0.194]}
        rotation={[0.021, -0.002, 0.038]}
        scale={[1, 1, 1.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.petal001.geometry}
        material={materials['petal-material']}
        position={[-0.039, 0.191, -0.088]}
        rotation={[-0.012, -0.799, -0.003]}
        scale={[1, 1, 1.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.petal002.geometry}
        material={materials['petal-material']}
        position={[0.365, 0.41, 0.049]}
        rotation={[-0.067, -Math.PI / 2, 0]}
        scale={[1, 1, 1.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.petal003.geometry}
        material={materials['petal-material']}
        position={[-0.05, 0.297, -0.073]}
        rotation={[-3.053, -0.836, -3.048]}
        scale={[1, 1, 1.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.petal004.geometry}
        material={materials['petal-material']}
        position={[0.111, 0.382, 0.372]}
        rotation={[3.076, -0.165, -3.128]}
        scale={[1, 1, 1.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.petal005.geometry}
        material={materials['petal-material']}
        position={[-0.234, 0.279, 0.08]}
        rotation={[-3.119, 0.638, 3.07]}
        scale={[1, 1, 1.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.petal006.geometry}
        material={materials['petal-material']}
        position={[-0.26, 0.275, 0.132]}
        rotation={[1.196, 1.419, -1.106]}
        scale={[1, 1, 1.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.petal007.geometry}
        material={materials['petal-material']}
        position={[-0.299, 0.272, 0.17]}
        rotation={[0.087, 0.95, -0.018]}
        scale={[1, 1, 1.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stigma.geometry}
        material={materials['stigma-material']}
        position={[0, 0.442, 0]}
        scale={1.052}
      />
    </group>
  );
};

useGLTF.preload('/flower.glb');
