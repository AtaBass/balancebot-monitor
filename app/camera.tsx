import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Screen } from '../src/components/layout/Screen';
import { Badge, Card, InfoRow, ui } from '../src/components/ui/Primitives';
import { Icon } from '../src/components/ui/Icon';
import { strings as t } from '../src/i18n';
import { theme as th } from '../src/theme/tokens';
export default function Camera() {
  const wide = useWindowDimensions().width >= 1100;
  return (
    <Screen title={t.camera.title}>
      <View style={{ flexDirection: wide ? 'row' : 'column', gap: 20 }}>
        <Card style={{ flex: 2 }}>
          <View style={ui.between}>
            <Text style={ui.title}>{t.camera.viewport}</Text>
            <Badge label={t.camera.inactive} muted />
          </View>
          <View style={styles.viewport}>
            <View style={styles.target}>
              <Icon name="camera" size={44} color={th.colors.muted} />
            </View>
            <Text style={ui.title}>{t.camera.inactive}</Text>
            <Text style={[ui.body, { textAlign: 'center', maxWidth: 340 }]}>
              {t.camera.body}
            </Text>
            <Text style={ui.label}>{t.camera.noPermission}</Text>
          </View>
        </Card>
        <View style={{ flex: 1, gap: 20 }}>
          <Card>
            <Text style={ui.title}>{t.camera.tracking}</Text>
            <InfoRow label={t.monitor.motion} value={t.common.unknown} />
            <InfoRow
              label={t.camera.calibration}
              value={t.camera.uncalibrated}
            />
            <Badge label={t.camera.waiting} muted />
          </Card>
          <Card>
            <Icon name="angle" color={th.colors.warning} />
            <Text style={ui.title}>{t.camera.precision}</Text>
            <Text style={ui.body}>{t.camera.limit}</Text>
          </Card>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  viewport: {
    minHeight: 360,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    backgroundColor: th.colors.background,
    borderRadius: th.radius.sm,
    padding: 24,
  },
  target: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: th.colors.border,
    borderWidth: 1,
    borderRadius: 24,
  },
});
