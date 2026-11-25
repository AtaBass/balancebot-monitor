const { defineConfig } = require('eslint/config');
const expo = require('eslint-config-expo/flat');
module.exports = defineConfig([
  expo,
  // R3F owns these JSX props; they are not DOM attributes. Keep DOM checking elsewhere.
  {
    files: ['src/features/visualization/RobotScene.tsx'],
    rules: {
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            'position',
            'args',
            'metalness',
            'roughness',
            'intensity',
            'rotation',
            'emissive',
            'emissiveIntensity',
          ],
        },
      ],
    },
  },
  { ignores: ['dist/*', 'coverage/*', '.expo/*'] },
]);
