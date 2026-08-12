"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Torus } from "@react-three/drei";
import * as THREE from "three";

// Orb using MeshStandardMaterial + emissive — intentional glow, no env map needed
function GlowOrb({
  position,
  scale,
  speed,
  color,
  emissive,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  emissive: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * speed * 0.15;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * speed * 0.1) * 0.2;
  });

  return (
    <Float speed={speed * 0.7} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.7}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

function GlowingRing({
  position,
  rotation,
  scale,
  color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = rotation[0] + clock.elapsedTime * 0.08;
    mesh.current.rotation.z = rotation[2] + clock.elapsedTime * 0.05;
  });
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <torusGeometry args={[1, 0.015, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

function ParticleField() {
  const count = 250;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Cluster particles on the right half of the scene
      pos[i * 3] = Math.random() * 10 + 0.5;  // x: 0.5 to 10.5
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const geo = useRef<THREE.BufferGeometry>(null);
  useFrame(({ clock }) => {
    if (!geo.current) return;
    const arr = geo.current.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(clock.elapsedTime * 0.2 + i * 0.5) * 0.0006;
    }
    geo.current.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geo}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#39A8F5" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function CameraMouseTrack() {
  const { camera }: { camera: THREE.Camera } = { camera: null as unknown as THREE.Camera };
  useFrame(({ camera: cam, mouse }) => {
    // Subtle mouse parallax — only horizontal shift, keep camera on right side
    cam.position.x += (mouse.x * 0.3 + 3 - cam.position.x) * 0.02;
    cam.position.y += (mouse.y * 0.2 - cam.position.y) * 0.02;
    cam.lookAt(3, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    // Canvas covers only the right 60% of the hero — left is text-safe
    <Canvas
      camera={{ position: [3, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "65%",   // right 65% only — text area is safe
        height: "100%",
        pointerEvents: "none",
      }}
      dpr={[1, 1.5]}
    >
      {/* Lighting using logo blue palette */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={4} color="#39A8F5" />
      <pointLight position={[8, -3, 3]} intensity={2} color="#1A3FD4" />
      <pointLight position={[0, 4, 4]} intensity={1.5} color="#2878E8" />
      <pointLight position={[10, 0, -2]} intensity={1} color="#ffffff" />

      <CameraMouseTrack />
      <ParticleField />

      {/* Main large orb — right-center */}
      <GlowOrb position={[2.8, 0.3, 0]} scale={1.7} speed={0.9} color="#1A3FD4" emissive="#2878E8" />
      {/* Smaller upper left orb */}
      <GlowOrb position={[0.5, 1.8, -1]} scale={0.75} speed={1.3} color="#39A8F5" emissive="#39A8F5" />
      {/* Tiny lower orb */}
      <GlowOrb position={[1.2, -2.2, 0.5]} scale={0.38} speed={1.8} color="#2878E8" emissive="#1A3FD4" />

      {/* Decorative rings around main orb */}
      <GlowingRing position={[2.8, 0.3, 0]} rotation={[1.1, 0, 0.5]} scale={3.2} color="#39A8F5" />
      <GlowingRing position={[2.8, 0.3, 0]} rotation={[0.4, 0.5, 1.4]} scale={3.9} color="#1A3FD4" />
      <GlowingRing position={[0.5, 1.8, -1]} rotation={[0.9, 1.2, 0]} scale={1.6} color="#2878E8" />
    </Canvas>
  );
}
