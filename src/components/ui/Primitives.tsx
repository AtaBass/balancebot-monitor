import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { theme as th } from '../../theme/tokens';
import { Icon, type IconName } from './Icon';
export const ui = StyleSheet.create({
  title: {
    color: th.colors.text,
    fontSize: th.typography.subtitle,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  body: {
    color: th.colors.muted,
    fontSize: th.typography.body,
    lineHeight: th.typography.lineHeight,
  },
  label: {
    color: th.colors.muted,
    fontSize: th.typography.caption,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: th.spacing.md },
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: th.spacing.md,
    flexWrap: 'wrap',
  },
  stack: { gap: th.spacing.md },
});
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}
export function Badge({
  label,
  muted = false,
}: {
  label: string;
  muted?: boolean;
}) {
  return (
    <View
      style={[styles.badge, muted && { backgroundColor: th.colors.elevated }]}
    >
      <View
        style={[styles.dot, muted && { backgroundColor: th.colors.muted }]}
      />
      <Text style={[styles.badgeText, muted && { color: th.colors.muted }]}>
        {label}
      </Text>
    </View>
  );
}
export function Button({
  label,
  onPress,
  secondary = false,
  disabled = false,
  icon,
  accessibilityLabel,
}: {
  label: string;
  onPress?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  icon?: IconName;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        disabled && { opacity: th.states.disabledOpacity },
        pressed && { opacity: th.states.pressedOpacity },
      ]}
    >
      <Text style={[styles.buttonText, secondary && { color: th.colors.text }]}>
        {label}
      </Text>
      {icon && (
        <Icon
          name={icon}
          color={secondary ? th.colors.text : th.colors.background}
          size={18}
        />
      )}
    </Pressable>
  );
}
export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
      <Text style={[ui.body, { flex: 1 }]}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: th.colors.surface,
    borderWidth: 1,
    borderColor: th.colors.border,
    borderRadius: th.radius.card,
    padding: th.spacing.lg,
    gap: th.spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: th.colors.accentSoft,
    borderRadius: th.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: 'flex-start',
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 3,
    backgroundColor: th.colors.accent,
  },
  badgeText: { fontSize: 11, fontWeight: '600', color: th.colors.accent },
  button: {
    minHeight: th.layout.minimumTarget,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: th.radius.sm,
    backgroundColor: th.colors.accent,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'flex-start',
  },
  secondary: {
    backgroundColor: th.colors.elevated,
    borderWidth: 1,
    borderColor: th.colors.border,
  },
  buttonText: {
    color: th.colors.background,
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: th.colors.border,
  },
  value: {
    color: th.colors.text,
    fontSize: 14,
    flexShrink: 1,
    textAlign: 'right',
  },
});
