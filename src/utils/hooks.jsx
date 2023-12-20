import { useMemo } from 'react';

export function glsl(strings, ...variables) {
  let str = [];

  strings.forEach((x, i) => {
    str.push(x);
    str.push(variables[i] || '');
  });

  return str.join('');
}

export function useShader({
  uniforms: incomingUniforms = {},
  vertex = {
    head: '',
    main: '',
  },
  fragment = {
    head: '',
    main: '',
  },
}) {
  let uniforms = useMemo(() => {
    return Object.entries(incomingUniforms)
      .map(([key, value]) => ({ [key]: { needsUpdate: true, ...value } }))
      .reduce((previous, current) => ({ ...previous, ...current }), {});
  }, [incomingUniforms]);

  return {
    uniforms,
    onBeforeCompile(useShader) {
      shader.uniforms = {
        ...shader.uniforms,
        ...uniforms,
      };

      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        glsl`
                #include <common>
         
                ${vertex.head}  
            `
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        glsl`
                #include <begin_vertex>
        
                ${vertex?.main}  
            `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        glsl`
                #include <common>

                ${fragment?.head}  
            `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        glsl`
                #include <dithering_fragment> 

                ${fragment?.main}  
            `
      );
    },
  };
}
