import { monitorStore } from '../src/features/monitoring/useDashboardData';
import { jest, test, expect, beforeEach } from '@jest/globals';
import {
  renderRouter,
  screen,
  fireEvent,
  act,
} from 'expo-router/testing-library';
import Layout from '../app/_layout';
import Monitoring from '../app/index';
import Camera from '../app/camera';
import Tests from '../app/tests';
import Reports from '../app/reports';
import Settings from '../app/settings';
import Connection from '../app/connection';
import { strings as t } from '../src/i18n';
import { usePresentationStore } from '../src/stores/presentationStore';
import type { SceneProps } from '../src/features/visualization/RobotScene';
jest.mock('../src/features/visualization/SceneCanvas', () => {
  const { Text } =
    jest.requireActual<typeof import('react-native')>('react-native');
  return {
    __esModule: true,
    default: ({ state, viewRotation }: SceneProps) => (
      <Text testID="scene-props">
        {JSON.stringify({ state, viewRotation })}
      </Text>
    ),
  };
});
const routes = {
  _layout: Layout,
  index: Monitoring,
  camera: Camera,
  tests: Tests,
  reports: Reports,
  settings: Settings,
  connection: Connection,
};
beforeEach(() => {
  usePresentationStore.setState({ selectedTask: null });
  monitorStore.getState().reset();
});
test('all five Turkish tabs navigate to their screens', async () => {
  await renderRouter(routes);
  expect(screen.getByRole('header', { name: t.nav.monitor })).toBeTruthy();
  for (const [label, title] of [
    [t.nav.camera, t.camera.title],
    [t.nav.tests, t.tests.title],
    [t.nav.reports, t.reports.title],
    [t.nav.connection, t.bluetooth.title],
    [t.nav.monitor, t.nav.monitor],
  ] as const) {
    await fireEvent.press(screen.getByLabelText(label));
    expect(screen.getByRole('header', { name: title })).toBeTruthy();
  }
});
test('telemetry drives tilt and charging without manual status controls', async () => {
  monitorStore.getState().accept({ type: 'connection', status: 'connected' });
  await renderRouter(routes);
  for (const name of [t.monitor.balanced, t.monitor.tilted, t.monitor.charge]) {
    expect(screen.queryByRole('button', { name })).toBeNull();
  }
  await act(() =>
    monitorStore.getState().accept({
      type: 'sample',
      sample: {
        source: 'ble',
        receivedAtMs: 1000,
        data: { timestamp: 1000, tiltAngleDeg: -12, charging: false },
      },
    }),
  );
  expect(screen.getByText('-12,0°')).toBeTruthy();
  expect(screen.getByTestId('scene-props').props.children).toContain(
    '"tiltAngleDeg":-12',
  );
  await fireEvent.press(screen.getByRole('button', { name: t.robot.left }));
  expect(screen.getByTestId('scene-props').props.children).toContain(
    '"viewRotation":-0.5',
  );
  expect(screen.getByTestId('scene-props').props.children).toContain(
    '"tiltAngleDeg":-12',
  );
  await fireEvent.press(screen.getByRole('button', { name: t.robot.right }));
  expect(screen.getByTestId('scene-props').props.children).toContain(
    '"viewRotation":0',
  );
  await act(() =>
    monitorStore.getState().accept({
      type: 'sample',
      sample: {
        source: 'ble',
        receivedAtMs: 2000,
        data: { timestamp: 2000, tiltAngleDeg: 0, charging: true },
      },
    }),
  );
  expect(screen.getByTestId('scene-props').props.children).toContain(
    '"charging":true',
  );
  await act(() =>
    monitorStore
      .getState()
      .accept({ type: 'connection', status: 'disconnected' }),
  );
  expect(screen.getByTestId('scene-props').props.children).toContain(
    '"tiltAngleDeg":null',
  );
  expect(screen.getByTestId('scene-props').props.children).toContain(
    '"charging":null',
  );
});
test('disconnected dashboard has no invented readings or demo controls', async () => {
  await renderRouter(routes);
  for (const name of [
    t.robot.reset,
    t.robot.play,
    t.robot.pause,
    t.monitor.quickAction,
  ]) {
    expect(screen.queryByRole('button', { name })).toBeNull();
  }
  expect(screen.queryByText(t.common.simulation)).toBeNull();
  expect(screen.queryByText('%76')).toBeNull();
  expect(screen.queryByText(t.monitor.sampleChart)).toBeNull();
  expect(screen.getByText(t.monitor.noTelemetry)).toBeTruthy();
  expect(screen.getAllByText(t.connection.disconnected).length).toBeGreaterThan(
    0,
  );
});
