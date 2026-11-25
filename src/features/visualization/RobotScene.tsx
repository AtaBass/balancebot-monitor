import { MathUtils } from 'three';
import type { RobotVisualizationState } from './contracts';
export interface SceneProps {
  state: RobotVisualizationState;
  viewRotation: number;
}
function Box({
  position,
  size,
  color,
  metalness = 0.25,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  metalness?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={0.35}
      />
    </mesh>
  );
}
export function RobotScene({ state, viewRotation }: SceneProps) {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 7, 5]} intensity={3.2} color="#c9f5ff" />
      <directionalLight
        position={[-4, 3, -3]}
        intensity={2.2}
        color="#63c7c0"
      />
      <mesh position={[0, -0.57, 0]}>
        <cylinderGeometry args={[1.7, 1.8, 0.12, 64]} />
        <meshStandardMaterial
          color="#172d3b"
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <ringGeometry args={[1.55, 1.57, 64]} />
        <meshBasicMaterial color={state.charging ? '#73e4c1' : '#426578'} />
      </mesh>
      <group
        rotation={[0, (state.yawRad ?? 0) - 0.3 + viewRotation, 0]}
        position={[0, -0.06, 0]}
      >
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 0.78, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <mesh>
              <cylinderGeometry args={[0.43, 0.43, 0.25, 48]} />
              <meshStandardMaterial color="#101b28" roughness={0.75} />
            </mesh>
            <mesh position={[0, -side * 0.14, 0]}>
              <cylinderGeometry args={[0.31, 0.31, 0.025, 48]} />
              <meshStandardMaterial
                color="#9daebc"
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, -side * 0.16, 0]}>
              <cylinderGeometry args={[0.21, 0.21, 0.03, 32]} />
              <meshStandardMaterial
                color="#203b50"
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, -side * 0.18, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.035, 24]} />
              <meshStandardMaterial color="#6de0d0" metalness={0.4} />
            </mesh>
          </group>
        ))}
        <group rotation={[0, 0, MathUtils.degToRad(state.tiltAngleDeg ?? 0)]}>
          <Box
            position={[0, 0.14, 0]}
            size={[1.28, 0.4, 0.65]}
            color="#293f51"
          />
          <Box
            position={[0, 0.72, 0]}
            size={[1.07, 1.05, 0.57]}
            color="#d4e0e5"
          />
          <Box
            position={[0, 0.78, 0.3]}
            size={[0.8, 0.7, 0.045]}
            color="#b5c7d1"
          />
          <Box
            position={[0, 0.38, 0.34]}
            size={[0.88, 0.1, 0.055]}
            color="#224151"
          />
          <mesh position={[0, 0.42, 0.375]}>
            <boxGeometry args={[0.65, 0.035, 0.015]} />
            <meshStandardMaterial
              color={
                state.charging == null
                  ? '#526b80'
                  : state.charging
                    ? '#74f1b3'
                    : '#6cdbd8'
              }
              emissive={state.charging ? '#3cbb75' : '#1d646e'}
              emissiveIntensity={state.charging == null ? 0 : 1.8}
            />
          </mesh>
          <Box
            position={[0, 1.37, 0]}
            size={[1.2, 0.3, 0.78]}
            color="#eef3f1"
          />
          <Box
            position={[0, 1.54, 0]}
            size={[1.24, 0.07, 0.82]}
            color="#75bdb7"
          />
          <Box
            position={[0, 1.38, 0.4]}
            size={[0.31, 0.055, 0.02]}
            color="#397f79"
          />
          <Box
            position={[0, 1.38, 0.4]}
            size={[0.055, 0.18, 0.022]}
            color="#397f79"
          />
          <Box
            position={[0, 1.07, 0.315]}
            size={[0.57, 0.16, 0.04]}
            color="#142b3c"
          />
          {[-0.17, 0.17].map((x) => (
            <mesh key={x} position={[x, 1.07, 0.345]}>
              <sphereGeometry args={[0.035, 16, 12]} />
              <meshStandardMaterial
                color="#7de6de"
                emissive="#438d98"
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
          <Box
            position={[0, 0.68, -0.31]}
            size={[0.6, 0.36, 0.04]}
            color="#334e5f"
          />
        </group>
      </group>
    </>
  );
}
