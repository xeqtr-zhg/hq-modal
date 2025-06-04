import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'hq-modal',
      fileName: (format) => `hq-modal.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    }
  }
})