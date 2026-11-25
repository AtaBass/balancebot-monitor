import { Redirect } from 'expo-router';
/** Preserve old settings links without adding a sixth tab. */
export default function SettingsRedirect() {
  return <Redirect href="/connection" />;
}
