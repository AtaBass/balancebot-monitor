import { strings as t } from '../src/i18n';
import { jest, test, expect } from '@jest/globals';
import { isRobotTelemetry, telemetryFreshness } from '../src/models/telemetry';
import { MockTelemetryProvider } from '../src/services/telemetry/MockTelemetryProvider';
import { bindTelemetry, createMonitorStore } from '../src/stores/monitorStore';
const fixture = { timestamp: 1000, tiltAngleDeg: -2, charging: false };
test('requires tilt, charging and finite timestamp; battery is optional', () => {
  expect(isRobotTelemetry(fixture)).toBe(true);
  for (const invalid of [
    null,
    {},
    { ...fixture, charging: 1 },
    { ...fixture, tiltAngleDeg: NaN },
    { ...fixture, timestamp: -1 },
    { ...fixture, batteryLevelPercent: 101 },
  ])
    expect(isRobotTelemetry(invalid)).toBe(false);
});
test('interruption begins strictly after two seconds, including missing first sample', () => {
  expect(telemetryFreshness(2000, 0, null)).toBe('awaiting');
  expect(telemetryFreshness(2001, 0, null)).toBe('interrupted');
  expect(telemetryFreshness(3000, 0, 1000)).toBe('fresh');
  expect(telemetryFreshness(3001, 0, 1000)).toBe('interrupted');
});
test('provider connects without fabricating data, validates fixtures and cleans up', async () => {
  const provider = new MockTelemetryProvider(() => 42);
  const store = createMonitorStore();
  const unbind = bindTelemetry(provider, store);
  expect(() => provider.push(fixture)).toThrow(t.errors.connectFirst);
  await provider.connect();
  await provider.connect();
  expect(store.getState().connection).toBe('connected');
  expect(store.getState().latestTelemetry).toBeNull();
  provider.push(fixture);
  expect(store.getState().latestTelemetry).toEqual({
    data: fixture,
    source: 'simulation',
    receivedAtMs: 42,
  });
  provider.push({});
  expect(store.getState().error).toBe(t.errors.invalidTelemetry);
  expect(store.getState().latestTelemetry?.receivedAtMs).toBe(42);
  await provider.disconnect();
  expect(store.getState().latestTelemetry).toBeNull();
  unbind();
  unbind();
  await provider.dispose();
  await expect(provider.connect()).rejects.toThrow(t.errors.disposed);
});
test('unsubscribe stops delivery', async () => {
  const provider = new MockTelemetryProvider();
  const listener = jest.fn();
  const stop = provider.subscribe(listener);
  stop();
  await provider.connect();
  expect(listener).not.toHaveBeenCalled();
  await provider.dispose();
});
