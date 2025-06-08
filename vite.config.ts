import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint2';

export default defineConfig({
  plugins: [
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'hq-modal',
      fileName: (format) => `hq-modal.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
  },
});
