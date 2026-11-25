import { Text, View, useWindowDimensions } from 'react-native';
import { Screen } from '../src/components/layout/Screen';
import { Badge, Button, Card, ui } from '../src/components/ui/Primitives';
import { Icon, type IconName } from '../src/components/ui/Icon';
import { strings as t } from '../src/i18n';
import { theme as th } from '../src/theme/tokens';
import { usePresentationStore } from '../src/stores/presentationStore';
import type { EvaluationTask } from '../src/models/evaluation';
const tasks: readonly [EvaluationTask, IconName][] = [
  ['static-balance', 'angle'],
  ['robot-guidance', 'motion'],
  ['charging', 'charge'],
  ['integrated-task', 'robot'],
];
export default function Tests() {
  const width = useWindowDimensions().width;
  const selected = usePresentationStore((s) => s.selectedTask);
  const select = usePresentationStore((s) => s.selectTask);
  return (
    <Screen title={t.tests.title}>
      <View style={ui.between}>
        <Text style={ui.label}>{t.tests.count}</Text>
        <Text style={ui.label}>{t.tests.unavailable}</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
        {tasks.map(([key, icon], index) => (
          <Card
            key={key}
            style={{
              flexBasis: width >= 800 ? '47%' : '100%',
              flexGrow: 1,
              minWidth: 0,
              ...(key === selected ? { borderColor: th.colors.accent } : {}),
            }}
          >
            <View style={ui.between}>
              <Icon name={icon} size={30} color={th.colors.accent} />
              <Text style={ui.label}>0{index + 1}</Text>
            </View>
            <Text style={ui.title}>{t.tests.tasks[key].title}</Text>
            <Text style={ui.body}>{t.tests.tasks[key].description}</Text>
            <Button
              secondary
              label={`${t.tests.tasks[key].title} · ${t.common.details}`}
              onPress={() => select(key)}
              icon="arrow"
            />
          </Card>
        ))}
      </View>
      {selected && (
        <Card>
          <View style={ui.between}>
            <Badge label={t.tests.selected} />
            <Button
              secondary
              label={t.common.close}
              onPress={() => select(null)}
            />
          </View>
          <Text accessibilityRole="header" style={ui.title}>
            {t.tests.tasks[selected].title}
          </Text>
          <Text style={ui.body}>{t.tests.tasks[selected].detail}</Text>
          <Text style={ui.label}>{t.tests.noRecord}</Text>
          <Button label={t.tests.start} disabled />
          <Text accessibilityLiveRegion="polite" style={ui.body}>
            {t.tests.unavailable}
          </Text>
        </Card>
      )}
    </Screen>
  );
}
