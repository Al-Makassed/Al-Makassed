module.exports = {
  // root: true,
  env: { browser: true, es2020: true },
  extends: [
    'aribnb',
    'aribnb-typescript',
    'aribnb/hooks',
    'eslint:recommended'  ,
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  
  plugins: ['react-refresh','prettier'],
  rules: {
    // 'react-refresh/only-export-components': [
    //   'warn',
    //   { allowConstantExport: true },
    // ],
  },
}
