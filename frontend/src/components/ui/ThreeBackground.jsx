import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, color, speed = 1, size = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[size, 100, 200]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
};

const FloatingParticles = ({ count = 100 }) => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() * 0.02;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const points = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.forEach((particle, i) => {
      particle.time += particle.speed;
      particle.x += Math.sin(particle.time) * 0.1;
      particle.y += Math.cos(particle.time) * 0.1;
      particle.z += Math.sin(particle.time) * 0.1;
    });
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.length * 3)}
          itemSize={3}
          onUpdate={(self) => {
            const positions = self.array;
            particles.forEach((particle, i) => {
              positions[i * 3] = particle.x;
              positions[i * 3 + 1] = particle.y;
              positions[i * 3 + 2] = particle.z;
            });
            self.needsUpdate = true;
          }}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom right, #0f0f23, #1a1a2e, #16213e)' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <AnimatedSphere
          position={[-3, 0, 0]}
          color="#4f46e5"
          speed={0.8}
          size={1.5}
        />
        <AnimatedSphere
          position={[3, 0, 0]}
          color="#7c3aed"
          speed={1.2}
          size={1.2}
        />
        <AnimatedSphere
          position={[0, 2, -2]}
          color="#06b6d4"
          speed={0.6}
          size={0.8}
        />
        <AnimatedSphere
          position={[0, -2, -1]}
          color="#10b981"
          speed={1.0}
          size={1.0}
        />
        
        <FloatingParticles count={50} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ThreeBackground; 