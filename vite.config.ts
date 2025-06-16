import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint2';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
    checker({ typescript: true }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'HqModal',
      fileName: (format) => `hq-modal.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
  },
});
