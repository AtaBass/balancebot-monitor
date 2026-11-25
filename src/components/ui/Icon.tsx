import { View, type ColorValue } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { theme } from '../../theme/tokens';
export type IconName =
  | 'connection'
  | 'monitor'
  | 'camera'
  | 'tests'
  | 'reports'
  | 'settings'
  | 'angle'
  | 'charge'
  | 'motion'
  | 'arrow'
  | 'robot';
const paths: Record<IconName, string> = {
  connection: 'M7 7l10 10-5 4V3l5 4L7 17',
  monitor: 'M3 12h4l3-7 4 14 3-7h4',
  camera: 'M8 5l2-2h4l2 2h4v15H4V5h4',
  tests: 'M8 3h8v4H8z M6 5H4v16h16V5h-2 M8 12h8 M8 16h5',
  reports: 'M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 16h6',
  settings: 'M4 7h16 M4 17h16 M9 4v6 M15 14v6',
  angle: 'M4 4v16h16 M4 20L19 5 M4 12a8 8 0 018 8',
  charge: 'M13 2L5 14h6l-1 8 9-13h-7z',
  motion: 'M3 7h13l-4-4 M16 7l-4 4 M21 17H8l4-4 M8 17l4 4',
  arrow: 'M4 12h16 M14 6l6 6-6 6',
  robot: 'M6 8h12v11H6z M12 8V4 M3 11v6 M21 11v6 M9 19v2 M15 19v2',
};
/** Hide only decorative artwork; the parent control owns its accessible label.
 * RN View maps aria-hidden on web and native accessibility props correctly.
 */
export function Icon({
  name,
  size = 22,
  color = theme.colors.muted,
}: {
  name: IconName;
  size?: number;
  color?: ColorValue;
}) {
  return (
    <View
      aria-hidden
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d={paths[name]}
          stroke={color}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {name === 'camera' && (
          <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.6} />
        )}
        {name === 'robot' && (
          <Rect x={9} y={11} width={6} height={3} rx={1} fill={color} />
        )}
      </Svg>
    </View>
  );
}
