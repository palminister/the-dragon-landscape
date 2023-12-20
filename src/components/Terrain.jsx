import {
  Gltf,
  useGLTF,
  useTexture,
  Sampler,
  ComputedAttribute,
  Clone,
  useSurfaceSampler,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Flower } from '@/components/Flower';

const Sand = ({ amount = 700, maxSize = 5, ...props }) => {
  const { nodes } = useGLTF('/smooth-terrain.glb');
  const sandTexture = useTexture({
    // map: '/matcap_black_stone.jpg',
    // map: 'abstract-green-yellow-oil-paint-textured-background.jpg',
    normalMap: '/sand/normal.jpg',
    metalnessMap: '/sand/gloss.jpg',
    roughnessMap: '/sand/roughness.jpg',
  });
  const textureProps = {
    // color: 'hotpink',
    color: '#59683a',
    // color: '#616b4d',
    // color: '#839868',
    // color: 'black',
    castShadow: true,
    receiveShadow: true,
  };

  const transformInstances = ({ dummy, position, normal }) => {
    dummy.position.copy(position);
    // dummy.scale.setScalar(0.01);
    dummy.scale.setScalar(Math.random());
    dummy.lookAt(normal.add(position));
    dummy.rotation.set(
      dummy.rotation.x,
      dummy.rotation.y,
      Math.random() * Math.PI * 2
    );
  };

  const meshRef = useRef();
  const instanceRef = useRef();
  let localObject = new THREE.Object3D();
  let worldObject = new THREE.Object3D();
  let visitedInstances = new Set();

  const COLORS = useMemo(() => {
    return ['#d7be68', '#a480ff', '#fc9ad7', '#ffffff'];
  }, []);

  const colorArray = useMemo(() => {
    return Float32Array.from(
      new Array(amount)
        .fill()
        .flatMap(() =>
          new THREE.Color(COLORS[(COLORS.length * Math.random()) | 0]).toArray()
        )
    );
  }, [amount, COLORS]);

  const handlePointerMove = (e) => {
    /* The idea behind this is to get the distance between the cursor and the instance
    However, the cursor is in "world" space and the instance is in "local" space
    So we need to convert the local space of the instance into world space
    But be reminded that if we want to adjust the transformation of the instance
    we need to do it in local space*/
    e.stopPropagation();
    const { point } = e;

    /* Get the transformation matrix of the group */
    const groupTransformMatrix = instanceRef.current.parent.parent.matrix;

    for (let index = 0; index < amount; index++) {
      /* Get the local transformation matrix of the current instance */
      instanceRef.current.getMatrixAt(index, localObject.matrix);

      /* Multiply the local matrix by the group's transformation matrix to get the world transformation matrix */
      worldObject.matrix.multiplyMatrices(
        groupTransformMatrix,
        localObject.matrix
      );
      /* Decompose the world matrix to update world position, quaternion, and scale */
      worldObject.matrix.decompose(
        worldObject.position,
        worldObject.quaternion,
        worldObject.scale
      );

      /* Calculate the distance between the current cursor location on the mesh and the world position of the instance */
      const d = point.distanceTo(worldObject.position);

      if (d < 0.8) {
        /* Add the index of the instance to the set */
        visitedInstances.add(index);
      }
    }
  };

  let tempLocalObject = new THREE.Object3D();

  useFrame((state, delta) => {
    if (instanceRef.current) {
      for (const value of visitedInstances) {
        /* Get the local transformation matrix of the current instance */
        instanceRef.current.getMatrixAt(value, tempLocalObject.matrix);
        /* Decompose the local matrix to extract position, quaternion, and scale */
        tempLocalObject.matrix.decompose(
          tempLocalObject.position,
          tempLocalObject.quaternion,
          tempLocalObject.scale
        );

        /* Interpolate the instance's scale to a target scale of 4 with a gradual change of 0.1 */
        const scale = THREE.MathUtils.lerp(
          tempLocalObject.scale.x,
          maxSize,
          0.05
        );

        /* Update the instance via the "local" matrix */
        tempLocalObject.scale.setScalar(scale);
        tempLocalObject.updateMatrix();
        instanceRef.current.setMatrixAt(value, tempLocalObject.matrix);
        instanceRef.current.instanceMatrix.needsUpdate = true;
      }
    }
  });

  const { nodes: flower, materials } = useGLTF('/flower-merged.glb');

  // The base config: n is number of component calls
  // const flowerScale = 0.001 * n
  // flower.petal.geometry.scale(flowerScale, flowerScale, flowerScale);
  // flower.petal.geometry.rotateX(Math.PI / 2 * n);

  const flowerScale = 0.2;
  flower.petal.geometry.scale(flowerScale, flowerScale, flowerScale);
  flower.petal.geometry.rotateX(Math.PI / 8);

  return (
    <group {...props}>
      <Sampler count={amount} transform={transformInstances}>
        <mesh
          ref={meshRef}
          onPointerMove={handlePointerMove}
          castShadow
          receiveShadow
        >
          <primitive attach="geometry" object={nodes.Plane.geometry} />
          <meshStandardMaterial {...textureProps} {...sandTexture} />
        </mesh>
        <instancedMesh
          ref={instanceRef}
          args={[null, null, amount]}
          castShadow
          receiveShadow
        >
          {/* <boxGeometry args={[0.005, 0.005, 0.005]}>
            <instancedBufferAttribute
              attach="attributes-color"
              args={[colorArray, 3]}
            />
          </boxGeometry>
          <meshStandardMaterial vertexColors /> */}
          {/* <Flower /> */}
          {/* <instancedBufferGeometry
            ref={flowerGeometryRef}
            attach="geometry"
            args={[flower.petal.geometry]}
            // scale={[0.0001, 0.0001, 0.0001]}
          > */}
          <primitive attach="geometry" object={flower.petal.geometry}>
            <instancedBufferAttribute
              attach="attributes-color"
              args={[colorArray, 3]}
            />
          </primitive>
          {/* </instancedBufferGeometry> */}
          {/* <primitive
            attach="material"
            object={materials['petal-material']}
            vertexColors
          /> */}
          <meshStandardMaterial roughness={0} metalness={1} vertexColors />
        </instancedMesh>

        {/* <instancedMesh
          ref={instanceRef}
          args={[null, null, amount]}
          castShadow
          receiveShadow
          name="flower"
          geometry={flower.petal.geometry}
        >
          <instancedBufferAttribute
            attach="attributes-color"
            args={[colorArray, 3]}
          />
          <meshStandardMaterial roughness={0} metalness={1} vertexColors />
        </instancedMesh> */}
      </Sampler>
    </group>
    // <mesh>
    //   <primitive attach="geometry" object={nodes.Plane.geometry} />
    //   <meshStandardMaterial {...props} {...sandTexture} />
    // </mesh>
  );
};

export const Terrain = () => {
  const sandTexture = useTexture({
    normalMap: '/sand/normal.jpg',
    metalnessMap: '/sand/gloss.jpg',
    roughnessMap: '/sand/roughness.jpg',
  });
  const props = {
    color: 'hotpink',
    castShadow: true,
    receiveShadow: true,
  };

  return (
    <group>
      {/* <Gltf
        src="/smooth-terrain.glb"
        position={[-4, -0.01, 7]}
        scale={0.55}
        rotation-y={3}
        inject={<meshStandardMaterial {...props} {...sandTexture} />}
      />
      <Gltf
        src="/smooth-terrain.glb"
        position={[5, -0.04, 4]}
        scale={0.7}
        rotation-y={2}
        inject={<meshStandardMaterial {...props} {...sandTexture} />}
      />
      <Gltf
        src="/smooth-terrain.glb"
        position={[6, -0.01, -7]}
        scale={1}
        rotation-y={2}
        inject={<meshStandardMaterial {...props} {...sandTexture} />}
      />
      <Gltf
          src="/smooth-terrain.glb"
          position={[-8, -0.05, -8]}
          scale={1.5}
          rotation-y={-2.5}
          inject={<meshStandardMaterial {...props} {...sandTexture} />}
        /> */}

      {/* <Sampler
        count={1000}
        transform={transformInstances}
        position={[-8, -0.05, -8]}
        scale={1.5}
        rotation-y={-2.5}
        // weight="uv"
        weight="upness"
      >
        <Gltf
          src="/smooth-terrain.glb"
          inject={<meshStandardMaterial {...props} {...sandTexture} />}
        >
          <ComputedAttribute name="upness" compute={computeUpness} />
        </Gltf>
        <instancedMesh args={[null, null, 1000]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="black" />
        </instancedMesh>
      </Sampler> */}

      {/* <Sampler
        count={1000}
        transform={transformInstances}
        position={[-8, -0.05, -8]}
        scale={1.5}
        rotation-y={-2.5}
      >
        <mesh>
          <primitive attach="geometry" object={nodes.Plane.geometry} />
          <meshStandardMaterial {...props} {...sandTexture} />
        </mesh>
        <instancedMesh args={[null, null, 1000]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="black" />
        </instancedMesh>
      </Sampler> */}

      <Sand position={[-4, -0.01, 7]} scale={2.8} maxSize={6} rotation-y={3} />
      <Sand position={[5, -0.04, 4]} scale={3.3} maxSize={5} rotation-y={2} />
      <Sand
        position={[-8, -0.05, -8]}
        maxSize={3}
        scale={7}
        rotation-y={-2.5}
      />
      <Sand position={[6, -0.01, -7]} maxSize={3} scale={6.5} rotation-y={2} />
    </group>
  );
};

useGLTF.preload('/smooth-terrain.glb');
