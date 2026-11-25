import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Screen } from '../src/components/layout/Screen';
import { Button, Card, ui } from '../src/components/ui/Primitives';
import { Icon } from '../src/components/ui/Icon';
import { strings as t } from '../src/i18n';
import { theme as th } from '../src/theme/tokens';
export default function Reports() {
  return (
    <Screen title={t.reports.title}>
      <View style={ui.between}>
        <Text style={ui.title}>{t.reports.history}</Text>
        <Text style={ui.label}>0 · {t.reports.count}</Text>
      </View>
      <Card>
        <View style={{ alignItems: 'center', paddingVertical: 60, gap: 20 }}>
          <View
            style={{
              padding: 22,
              backgroundColor: th.colors.elevated,
              borderRadius: 24,
            }}
          >
            <Icon name="reports" size={42} color={th.colors.accent} />
          </View>
          <Text style={[ui.title, { textAlign: 'center' }]}>
            {t.reports.empty}
          </Text>
          <Text style={[ui.body, { textAlign: 'center', maxWidth: 440 }]}>
            {t.reports.body}
          </Text>
          <View>
            <Button
              label={t.reports.action}
              onPress={() => router.push('/tests')}
              icon="arrow"
            />
          </View>
        </View>
      </Card>
      <Text style={ui.body}>{t.reports.immutable}</Text>
    </Screen>
  );
}
