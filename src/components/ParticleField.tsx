import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function StarLayer() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  const count = 1700;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y += delta * 0.012;
    pointsRef.current.rotation.x = THREE.MathUtils.damp(pointsRef.current.rotation.x, mouse.y * 0.1, 3, delta);
    pointsRef.current.position.x = THREE.MathUtils.damp(pointsRef.current.position.x, mouse.x * 0.35, 2.5, delta);
    pointsRef.current.position.y = Math.sin(t * 0.14) * 0.22;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7dd3fc" size={0.018} sizeAttenuation transparent opacity={0.26} depthWrite={false} />
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.16),transparent_32%),linear-gradient(180deg,transparent,rgba(2,8,23,0.35)_72%,rgba(2,6,17,0.78))] pointer-events-none" />
      <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />
    </div>
  );
}
