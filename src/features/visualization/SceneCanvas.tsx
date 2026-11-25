import { Canvas } from '@react-three/fiber/native';
import { RobotScene, type SceneProps } from './RobotScene';
export default function SceneCanvas(props: SceneProps) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [3.1, 2.5, 4.6], fov: 38 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.5, 0)}
    >
      <RobotScene {...props} />
    </Canvas>
  );
}
