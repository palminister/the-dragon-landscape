import { useMemo, useRef, useState } from 'react';
import { Ripples } from '@/components/Ripple';
import * as THREE from 'three';
import { createPortal, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material';

export const Water = (props) => {
  const { camera, scene, target } = useMemo(() => {
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 0, 30);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    const target = new THREE.WebGLRenderTarget(1024, 1024);
    return { camera, scene, target };
  }, []);

  const shaderRef = useRef();
  const texture = useTexture('/bagel.png');

  useFrame(({ gl }) => {
    gl.setRenderTarget(target);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    shaderRef.current.uniforms.u_displacement.value = target.texture;
    shaderRef.current.uniforms.tDiffuse.value = texture;
  });

  const meshRef = useRef();

  const shader = useMemo(() => {
    return {
      uniforms: {
        tDiffuse: { value: null },
        u_displacement: { value: null },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    };
  }, []);

  return (
    <>
      {createPortal(<Ripples />, scene)}
      <mesh ref={meshRef} rotation-x={Math.PI * -0.5} {...props}>
        <planeGeometry args={[20, 20, 12, 12]} />
        {/* <meshStandardMaterial map={target.texture} /> */}
        {/* <shaderMaterial
          ref={shaderRef}
          {...shader}
          //   transparent
          //   blending={THREE.AdditiveBlending}
        /> */}
        <CustomShaderMaterial
          ref={shaderRef}
          baseMaterial={THREE.MeshStandardMaterial}
          roughness={0.5}
          //   metalness={0.5}
          blending={THREE.AdditiveBlending}
          transparent={true}
          // opacity={0.1}
          {...shader}
        />
      </mesh>
    </>
  );
};

const vertexShader = /* glsl */ `
uniform sampler2D u_displacement;
varying vec2 v_uv;

void main() {
  v_uv = uv;
//   vec4 disp = texture2D(u_displacement, uv);
//   vec3 displacedPosition = position + normalize(normal) * disp.r * 0.09; // Adjust the scale (0.1) as needed
//   csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4( displacedPosition, 1.0 );
  csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = /* glsl */ `
uniform sampler2D tDiffuse;
uniform sampler2D u_displacement;
varying vec2 v_uv;

// float PI = 3.141592653589;

void main() {
  vec2 uv = v_uv;

  vec4 disp = texture2D(u_displacement, uv);
  float theta = disp.r * 0.1 * 3.141592653589;
  vec2 dir = vec2(sin(theta), cos(theta));
  uv += dir * disp.r * 0.09;

//   vec4 color = texture2D(tDiffuse, uv);
//   vec4 color = mix(texture2D(tDiffuse, uv), texture2D(u_displacement, uv), 0.5);

  vec4 color = texture2D(u_displacement, uv);

//   csm_DiffuseColor = color;
  csm_DiffuseColor =  vec4(color.rgb, 0.2);
//   gl_FragColor = color;
//   gl_FragColor = vec4(color.rgb, 0.2);
}`;
