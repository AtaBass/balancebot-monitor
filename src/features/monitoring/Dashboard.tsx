import { router } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Screen } from '../../components/layout/Screen';
import { Badge, Card, InfoRow, ui } from '../../components/ui/Primitives';
import { Icon, type IconName } from '../../components/ui/Icon';
import { strings as t, formatNumber } from '../../i18n';
import { theme as th } from '../../theme/tokens';
import { useDashboardData } from './useDashboardData';
import { RobotVisualization } from '../visualization/RobotVisualization';
function Metric({
  icon,
  label,
  value,
  note,
}: {
  icon: IconName;
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <Card style={styles.metric}>
      <View style={ui.between}>
        <Text style={ui.label}>{label}</Text>
        <Icon name={icon} color={th.colors.accent} />
      </View>
      <Text style={styles.measurement}>{value}</Text>
      {note && <Text style={ui.label}>{note}</Text>}
    </Card>
  );
}
export function Dashboard() {
  const { width } = useWindowDimensions();
  const wide = width >= 1150;
  const { simulation, telemetry, connection } = useDashboardData();
  return (
    <Screen title={t.nav.monitor}>
      <View
        style={[styles.columns, { flexDirection: wide ? 'row' : 'column' }]}
      >
        <Card style={{ flex: wide ? 1.25 : undefined, minWidth: 0 }}>
          <View style={ui.between}>
            <View style={{ gap: 6 }}>
              <Text style={ui.title}>{t.monitor.robot}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t.bluetooth.title}
              onPress={() => router.push('/connection')}
              style={{ minHeight: 48, justifyContent: 'center' }}
            >
              <Badge label={t.connection[connection]} muted />
            </Pressable>
          </View>
          <RobotVisualization
            state={{
              tiltAngleDeg: telemetry?.tiltAngleDeg ?? null,
              charging: telemetry?.charging ?? null,
              yawRad: null,
              motion: 'unknown',
              stale: !telemetry,
            }}
          />
        </Card>
        <View style={{ flex: wide ? 1 : undefined, minWidth: 0, gap: 20 }}>
          <View style={styles.metrics}>
            <Metric
              icon="angle"
              label={t.monitor.tilt}
              value={
                telemetry
                  ? `${formatNumber(telemetry.tiltAngleDeg)}°`
                  : t.common.unavailable
              }
            />
            <Metric
              icon="charge"
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
              <Metric
                icon="charge"
                label={t.monitor.battery}
                value={`%${formatNumber(telemetry.batteryLevelPercent, 0)}`}
              />
            )}
            <Metric
              icon="motion"
              label={t.monitor.motion}
              value={t.common.unknown}
              note={t.monitor.cameraRequired}
            />
          </View>
        </View>
      </View>
      <View
        style={[styles.columns, { flexDirection: wide ? 'row' : 'column' }]}
      >
        <View style={{ flex: 1.6, minWidth: 0 }}>
          <Card>
            <Text style={ui.title}>{t.monitor.telemetry}</Text>
            <Text style={ui.body}>
              {telemetry ? t.monitor.historyWaiting : t.monitor.noTelemetry}
            </Text>
          </Card>
        </View>
        <Card style={{ flex: 1, minWidth: 0 }}>
          <Text style={ui.title}>{t.monitor.summary}</Text>
          <InfoRow
            label={t.monitor.source}
            value={
              telemetry
                ? simulation
                  ? t.common.simulation
                  : t.monitor.sourceRobot
                : t.common.unavailable
            }
          />
          <InfoRow label={t.monitor.interval} value={t.monitor.intervalValue} />
          <InfoRow
            label={t.monitor.connection}
            value={t.connection[connection]}
          />
        </Card>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  columns: { gap: 20, alignItems: 'stretch' },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  metric: { flexGrow: 1, flexBasis: 170, minWidth: 0, padding: 20 },
  measurement: {
    fontSize: 24,
    fontWeight: '600',
    color: th.colors.text,
    letterSpacing: -0.5,
  },
});
