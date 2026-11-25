import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme as th } from '../../theme/tokens';
import { Badge, ui } from '../ui/Primitives';
import { strings as t } from '../../i18n';
import { useDashboardData } from '../../features/monitoring/useDashboardData';
export function Screen({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { width } = useWindowDimensions();
  const { simulation } = useDashboardData();
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { padding: width < 600 ? 20 : 36 },
        ]}
      >
        <View style={styles.content}>
          <View style={ui.between}>
            <View style={{ gap: 10, flex: 1 }}>
              <Text style={styles.eyebrow}>
                {t.product.toLocaleUpperCase('tr-TR')}
              </Text>
              <Text
                accessibilityRole="header"
                style={[styles.title, width < 600 && { fontSize: 27 }]}
              >
                {title}
              </Text>
            </View>
            {simulation && <Badge label={t.common.simulation} />}
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: th.colors.background },
  scroll: { flexGrow: 1 },
  content: {
    width: '100%',
    maxWidth: th.layout.maxWidth,
    alignSelf: 'center',
    gap: 28,
  },
  eyebrow: {
    color: th.colors.accent,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '600',
  },
  title: {
    color: th.colors.text,
    fontSize: th.typography.title,
    fontWeight: '600',
    letterSpacing: -1,
  },
});
