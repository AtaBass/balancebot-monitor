import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions } from 'react-native';
import { theme } from '../src/theme/tokens';
import { Icon, type IconName } from '../src/components/ui/Icon';
import { strings as t } from '../src/i18n';
const routes = [
  ['index', 'monitor'],
  ['camera', 'camera'],
  ['tests', 'tests'],
  ['reports', 'reports'],
  ['connection', 'connection'],
] as const;
export default function RootLayout() {
  const wide = useWindowDimensions().width >= theme.layout.desktop;
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarPosition: wide ? 'left' : 'bottom',
          tabBarActiveTintColor: theme.colors.accent,
          tabBarInactiveTintColor: theme.colors.muted,
          tabBarActiveBackgroundColor: theme.colors.accentSoft,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            ...(wide
              ? {
                  width: 186,
                  minWidth: 186,
                  maxWidth: 186,
                  paddingTop: 44,
                  paddingHorizontal: 12,
                }
              : {}),
          },
          tabBarItemStyle: wide
            ? { borderRadius: 12, marginBottom: 8, minHeight: 52 }
            : { minHeight: 48 },
          tabBarLabelStyle: { fontSize: wide ? 14 : 11, fontWeight: '500' },
          sceneStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Tabs.Screen name="settings" options={{ href: null }} />
        {routes.map(([name, key]) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title: t.nav[key],
              tabBarAccessibilityLabel: t.nav[key],
              tabBarIcon: ({ color, size }) => (
                <Icon name={key as IconName} color={color} size={size} />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
}
