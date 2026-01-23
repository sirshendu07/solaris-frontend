import { useEffect, useRef } from 'react';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ChromaticAberrationEffect } from 'postprocessing';
import * as THREE from 'three';
import './GridScan.css';

// Shader code for the 3D Grid effect
const vert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uScanOpacity;
varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    vec3 rd = normalize(vec3(p, 2.0));
    rd.xy += uSkew * rd.z;
    
    float gridScale = max(1e-5, uGridScale);
    vec3 h = rd * (0.2 / max(rd.y, 0.001));
    vec2 gridUV = h.xz / gridScale;
    
    float fx = fract(gridUV.x); float fy = fract(gridUV.y);
    float ax = min(fx, 1.0 - fx); float ay = min(fy, 1.0 - fy);
    float lineMask = 1.0 - smoothstep(0.0, 0.02 * uLineThickness, min(ax, ay));
    
    float scanZ = mod(iTime * 0.5, 2.0);
    float dz = abs(h.z - scanZ);
    float pulse = exp(-10.0 * dz * dz) * uScanOpacity;
    
    vec3 color = (uLinesColor * lineMask * exp(-length(h.z))) + (uScanColor * pulse);
    fragColor = vec4(color, 1.0);
}
void main(){ mainImage(gl_FragColor, vUv * iResolution.xy); }
`;

const GridScan = ({ linesColor = '#392e4e', scanColor = '#FF9FFC', gridScale = 0.1, lineThickness = 1, scanOpacity = 0.4 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, 1) },
        iTime: { value: 0 },
        uSkew: { value: new THREE.Vector2(0, 0) },
        uLineThickness: { value: lineThickness },
        uLinesColor: { value: new THREE.Color(linesColor) },
        uScanColor: { value: new THREE.Color(scanColor) },
        uGridScale: { value: gridScale },
        uScanOpacity: { value: scanOpacity },
      },
      vertexShader: vert,
      fragmentShader: frag,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const animate = (time) => {
      material.uniforms.iTime.value = time / 1000;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [linesColor, scanColor, gridScale, lineThickness, scanOpacity]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default GridScan;