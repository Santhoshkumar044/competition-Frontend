import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";


function FloatingBuilding({ scale = 0.05 }) {
  const { scene } = useGLTF("/models/clg1.glb");
  const ref = useRef();

  // Add floating animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.3;
      ref.current.position.y = Math.sin(t * 1.5) * 0.3;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[scale, scale, scale]}
      position={[0, 0, 0]}
    />
  );
}

useGLTF.preload("/models/clg1.glb");

export default function FloatingCampusModel() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 3, 6], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 6, 4]} intensity={1.2} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.7}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 3}
        />
        <Suspense fallback={null}>
          <FloatingBuilding />
        </Suspense>
      </Canvas>
    </div>
  );
}
