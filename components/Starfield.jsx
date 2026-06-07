"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A slow-drifting 3D particle starfield rendered once, fixed behind
 * the whole document. Reacts subtly to the pointer for depth.
 * This is the deepest parallax layer on the site.
 */
function Stars({ count = 1400 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.012;
    ref.current.rotation.x += delta * 0.004;
    const px = state.pointer.x * 0.6;
    const py = state.pointer.y * 0.4;
    ref.current.position.x += (px - ref.current.position.x) * 0.04;
    ref.current.position.y += (-py - ref.current.position.y) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color={new THREE.Color("#9af0ff")}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Starfield() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #0a1430 0%, #050813 45%, #03040a 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 18], fov: 70 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Stars />
          <fog attach="fog" args={["#03040a", 22, 48]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
