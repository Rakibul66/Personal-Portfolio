import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function StarLayer() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  const count = 1400;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y += delta * 0.01;
    pointsRef.current.rotation.x = THREE.MathUtils.damp(pointsRef.current.rotation.x, mouse.y * 0.08, 3, delta);
    pointsRef.current.position.x = THREE.MathUtils.damp(pointsRef.current.position.x, mouse.x * 0.2, 2.5, delta);
    pointsRef.current.position.y = Math.sin(t * 0.12) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#38bdf8" size={0.02} sizeAttenuation transparent opacity={0.22} depthWrite={false} />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 5.4], fov: 52 }} dpr={[1, 1.8]} gl={{ antialias: false }} style={{ pointerEvents: 'none' }}>
        <color attach="background" args={['#020617']} />
        <StarLayer />
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.14),transparent_46%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_44%)] pointer-events-none" />
    </div>
  );
}
