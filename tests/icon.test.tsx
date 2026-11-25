import { test, expect } from '@jest/globals';
import { Icon } from '../src/components/ui/Icon';
test('native-only accessibility props stay off SVG elements', () => {
  const wrapper = Icon({ name: 'monitor' });
  const svg = wrapper.props.children;
  expect(svg.props.accessibilityElementsHidden).toBeUndefined();
  expect(svg.props.importantForAccessibility).toBeUndefined();
  expect(wrapper.props['aria-hidden']).toBe(true);
});
