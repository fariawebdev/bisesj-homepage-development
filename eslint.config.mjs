import nextConfig from 'eslint-config-next'

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'docs/**', 'public/**', 'tests/**', 'dist/**'],
  },
  ...nextConfig,
  {
    rules: {
      'import/no-anonymous-default-export': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
