import { monitorStore } from '../src/features/monitoring/useDashboardData';
import { test, expect, beforeEach } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Camera from '../app/camera';
import Tests from '../app/tests';
import Reports from '../app/reports';
import Connection from '../app/connection';
import { strings as t, formatNumber } from '../src/i18n';
import { usePresentationStore } from '../src/stores/presentationStore';
beforeEach(() => {
  usePresentationStore.setState({ selectedTask: null });
  monitorStore.getState().reset();
});
test.each([
  [Camera, t.camera.title],
  [Tests, t.tests.title],
  [Reports, t.reports.title],
  [Connection, t.bluetooth.title],
] as const)('screen renders Turkish title', async (Component, title) => {
  await render(<Component />);
  expect(screen.getByRole('header', { name: title })).toBeTruthy();
  expect(screen.queryByText(/STAGE|FOUNDATION|University/)).toBeNull();
});
test('test details select a task without starting an evaluation', async () => {
  await render(<Tests />);
  await fireEvent.press(
    screen.getByRole('button', {
      name: `${t.tests.tasks.charging.title} · ${t.common.details}`,
    }),
  );
  expect(usePresentationStore.getState().selectedTask).toBe('charging');
  expect(screen.getByRole('button', { name: t.tests.start })).toBeDisabled();
  await fireEvent.press(screen.getByRole('button', { name: t.common.close }));
  expect(usePresentationStore.getState().selectedTask).toBeNull();
});
test('settings has no mock or animation switches', async () => {
  await render(<Connection />);
  expect(screen.queryAllByRole('switch')).toHaveLength(0);
});
test('numbers use Turkish decimal separator', () =>
  expect(formatNumber(-12.5)).toBe('-12,5'));

test('Bluetooth tab does not pretend to scan and settings can be opened', async () => {
  await render(<Connection />);
  expect(screen.getByRole('button', { name: t.bluetooth.scan })).toBeDisabled();
  expect(screen.getByText(t.bluetooth.noPacket)).toBeTruthy();
  expect(screen.queryByText('%76')).toBeNull();
  await fireEvent.press(
    screen.getByRole('button', { name: t.bluetooth.settings }),
  );
  expect(
    screen.getByRole('header', { name: t.bluetooth.settings }),
  ).toBeTruthy();
  await fireEvent.press(screen.getByRole('button', { name: t.common.close }));
  expect(
    screen.queryByRole('header', { name: t.bluetooth.settings }),
  ).toBeNull();
});

test('connection details distinguish unavailable radio information from disconnection', async () => {
  await render(<Connection />);
  expect(screen.getByText(t.bluetooth.statusDetails)).toBeTruthy();
  expect(screen.getByText(t.bluetooth.properties)).toBeTruthy();
  expect(screen.getAllByText(t.bluetooth.notChecked)).toHaveLength(2);
  expect(screen.getByText(t.bluetooth.noReception)).toBeTruthy();
  expect(screen.getByText(t.bluetooth.signal)).toBeTruthy();
});
