import { Canvas } from '@react-three/fiber';
import { RobotScene, type SceneProps } from './RobotScene';
export default function SceneCanvas(props: SceneProps) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [3.1, 2.5, 4.6], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0.5, 0)}
    >
      <RobotScene {...props} />
    </Canvas>
  );
}
