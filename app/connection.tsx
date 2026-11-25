import { useState } from 'react';
import { Text, View, Pressable, useWindowDimensions } from 'react-native';
import { useStore } from 'zustand';
import { Screen } from '../src/components/layout/Screen';
import {
  Badge,
  Button,
  Card,
  InfoRow,
  ui,
} from '../src/components/ui/Primitives';
import { Icon } from '../src/components/ui/Icon';
import { theme } from '../src/theme/tokens';
import { strings as t, formatNumber } from '../src/i18n';
import {
  monitorStore,
  useDashboardData,
} from '../src/features/monitoring/useDashboardData';
export default function Connection() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const wide = useWindowDimensions().width >= 1100;
  const { connection, telemetry } = useDashboardData();
  const source = useStore(monitorStore, (s) => s.latestTelemetry?.source);
  const error = useStore(monitorStore, (s) => s.error);
  const sourceLabel = !telemetry
    ? t.common.unavailable
    : source === 'ble'
      ? t.bluetooth.protocol
      : source === 'wifi'
        ? t.bluetooth.wifi
        : t.common.simulation;
  return (
    <Screen title={t.bluetooth.title}>
      <View style={ui.between}>
        <View style={ui.row}>
          <Icon name="connection" color={theme.colors.accent} size={28} />
          <Text style={ui.title}>{t.bluetooth.protocol}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t.bluetooth.settings}
          accessibilityState={{ expanded: settingsOpen }}
          onPress={() => setSettingsOpen((v) => !v)}
          style={({ pressed }) => ({
            minWidth: 48,
            minHeight: 48,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            backgroundColor: theme.colors.surface,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Icon name="settings" />
        </Pressable>
      </View>
      {settingsOpen && (
        <Card>
          <View style={ui.between}>
            <Text accessibilityRole="header" style={ui.title}>
              {t.bluetooth.settings}
            </Text>
            <Button
              secondary
              label={t.common.close}
              onPress={() => setSettingsOpen(false)}
            />
          </View>
          <InfoRow label={t.settings.theme} value={t.settings.dark} />
          <InfoRow label={t.settings.units} value={t.settings.unitsValue} />
          <InfoRow
            label={t.settings.language}
            value={t.settings.languageValue}
          />
          <InfoRow label={t.settings.version} value="0.2.0" />
        </Card>
      )}
      <View style={{ flexDirection: wide ? 'row' : 'column', gap: 20 }}>
        <View style={{ flex: 1, gap: 20 }}>
          <Card>
            <View style={ui.between}>
              <Text style={ui.title}>{t.bluetooth.device}</Text>
              <Badge
                label={t.connection[connection]}
                muted={connection !== 'connected'}
              />
            </View>
            {connection !== 'connected' && (
              <Text style={ui.body}>{t.bluetooth.noDevice}</Text>
            )}
            <Text style={ui.body}>{t.bluetooth.unavailable}</Text>
            <Button label={t.bluetooth.scan} disabled />
            {error && (
              <Text
                accessibilityRole="alert"
                style={[ui.body, { color: theme.colors.error }]}
              >
                {error}
              </Text>
            )}
          </Card>
          <Card>
            <Text style={ui.title}>{t.bluetooth.statusDetails}</Text>
            <InfoRow
              label={t.bluetooth.transport}
              value={t.connection[connection]}
            />
            <InfoRow
              label={t.bluetooth.bluetoothState}
              value={t.bluetooth.notChecked}
            />
            <InfoRow
              label={t.bluetooth.permission}
              value={t.bluetooth.notChecked}
            />
            <InfoRow
              label={t.bluetooth.reception}
              value={
                connection === 'connected'
                  ? telemetry
                    ? t.bluetooth.packetReceived
                    : t.bluetooth.waitingPacket
                  : t.bluetooth.noReception
              }
            />
            <InfoRow
              label={t.bluetooth.lastError}
              value={error ?? t.bluetooth.noError}
            />
            <Text style={ui.label}>{t.bluetooth.radioNote}</Text>
          </Card>
          <Card>
            <Text style={ui.title}>{t.bluetooth.devices}</Text>
            <View
              style={{ alignItems: 'center', paddingVertical: 24, gap: 16 }}
            >
              <Icon name="connection" size={36} />
              <Text style={ui.body}>{t.bluetooth.notScanned}</Text>
            </View>
          </Card>
        </View>
        <View style={{ flex: 1, gap: 20 }}>
          <Card>
            <Text style={ui.title}>{t.bluetooth.live}</Text>
            {!telemetry && <Text style={ui.body}>{t.bluetooth.noPacket}</Text>}
            <InfoRow label={t.bluetooth.source} value={sourceLabel} />
            <InfoRow
              label={t.monitor.tilt}
              value={
                telemetry
                  ? `${formatNumber(telemetry.tiltAngleDeg)}°`
                  : t.common.unavailable
              }
            />
            <InfoRow
              label={t.monitor.charging}
              value={
                telemetry
                  ? telemetry.charging
                    ? t.monitor.chargingOn
                    : t.monitor.chargingOff
                  : t.common.unavailable
              }
            />
            {telemetry?.batteryLevelPercent !== undefined && (
              <InfoRow
                label={t.monitor.battery}
                value={`%${formatNumber(telemetry.batteryLevelPercent, 0)}`}
              />
            )}
            {telemetry && (
              <InfoRow
                label={t.bluetooth.timestamp}
                value={new Date(telemetry.timestamp).toLocaleString('tr-TR')}
              />
            )}
          </Card>
          <Card>
            <Text style={ui.title}>{t.bluetooth.properties}</Text>
            <InfoRow
              label={t.bluetooth.technology}
              value={t.bluetooth.protocol}
            />
            <InfoRow
              label={t.bluetooth.deviceName}
              value={t.common.unavailable}
            />
            <InfoRow
              label={t.bluetooth.deviceId}
              value={t.common.unavailable}
            />
            <InfoRow label={t.bluetooth.signal} value={t.common.unavailable} />
            <InfoRow
              label={t.bluetooth.service}
              value={t.bluetooth.notConfigured}
            />
            <InfoRow
              label={t.bluetooth.payload}
              value={t.bluetooth.payloadValue}
            />
            <InfoRow
              label={t.bluetooth.batteryField}
              value={t.bluetooth.hardwareDependent}
            />
          </Card>
          <Card>
            <View style={ui.between}>
              <Text style={ui.title}>{t.bluetooth.requirements}</Text>
              <Badge muted label={t.bluetooth.pending} />
            </View>
            <InfoRow
              label={t.bluetooth.targetRate}
              value={t.bluetooth.targetRateValue}
            />
            <InfoRow
              label={t.bluetooth.interruption}
              value={t.bluetooth.interruptionValue}
            />
            <Text style={ui.label}>{t.bluetooth.checkNote}</Text>
          </Card>
        </View>
      </View>
    </Screen>
  );
}
