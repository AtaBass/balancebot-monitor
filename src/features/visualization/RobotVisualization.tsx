import { Component, type ErrorInfo, useState, useCallback } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Svg, { Circle, Rect, Line } from 'react-native-svg';
import SceneCanvas from './SceneCanvas';
import type { RobotVisualizationState } from './contracts';
import { strings as t } from '../../i18n';
import { Button, ui } from '../../components/ui/Primitives';
import { theme as th } from '../../theme/tokens';
function Fallback() {
  return (
    <View
      style={styles.fallback}
      accessibilityRole="image"
      accessibilityLabel={t.robot.fallback}
    >
      <Svg width={150} height={180} viewBox="0 0 150 180">
        <Rect x={39} y={50} width={72} height={85} rx={12} fill="#bfd3df" />
        <Rect x={30} y={30} width={90} height={30} rx={5} fill="#70ddd0" />
        <Circle cx={29} cy={139} r={20} fill="#526b80" />
        <Circle cx={121} cy={139} r={20} fill="#526b80" />
        <Line
          x1={67}
          y1={44}
          x2={83}
          y2={44}
          stroke="#102a38"
          strokeWidth={4}
        />
        <Line
          x1={75}
          y1={36}
          x2={75}
          y2={52}
          stroke="#102a38"
          strokeWidth={4}
        />
      </Svg>
      <Text style={ui.body}>{t.robot.fallbackReason}</Text>
      <Text style={ui.label}>{t.robot.schematic}</Text>
    </View>
  );
}
class SceneBoundary extends Component<
  { children: React.ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}
export function RobotVisualization({
  state,
}: {
  state: RobotVisualizationState;
}) {
  const [viewRotation, setViewRotation] = useState(0);
  const [pan] = useState(() => {
    let lastDx = 0;
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderGrant: () => {
        lastDx = 0;
      },
      onPanResponderMove: (_, gesture) => {
        const delta = gesture.dx - lastDx;
        lastDx = gesture.dx;
        setViewRotation((value) => value + delta * 0.008);
      },
    });
  });
  const [failed, setFailed] = useState(false);
  const [focused, setFocused] = useState(true);
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );
  return (
    <View style={ui.stack}>
      <View
        style={styles.scene}
        {...(!failed ? pan.panHandlers : {})}
        accessibilityLabel={t.robot.accessible}
        testID="robot-viewport"
      >
        {failed ? (
          <Fallback />
        ) : (
          focused && (
            <SceneBoundary onFailure={() => setFailed(true)}>
              <SceneCanvas state={state} viewRotation={viewRotation} />
            </SceneBoundary>
          )
        )}
      </View>
      {!failed && (
        <View style={ui.row}>
          <Button
            secondary
            label="←"
            accessibilityLabel={t.robot.left}
            onPress={() => setViewRotation((value) => value - 0.5)}
          />
          <Button
            secondary
            label="→"
            accessibilityLabel={t.robot.right}
            onPress={() => setViewRotation((value) => value + 0.5)}
          />
        </View>
      )}
      {!failed && state.tiltAngleDeg === null && (
        <Text style={ui.body}>{t.robot.waiting}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  scene: {
    height: 350,
    borderRadius: th.radius.card,
    overflow: 'hidden',
    backgroundColor: '#0C1927',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
});
