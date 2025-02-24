import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/auth-form/',
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@api': resolve(__dirname, 'src/api'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@schemas': resolve(__dirname, 'src/schemas'),
      '@models': resolve(__dirname, 'src/models'),
      '@providers': resolve(__dirname, 'src/providers'),
      '@hooks': resolve(__dirname, 'src/hooks'),
    },
  },
  build: {
    outDir: 'build', // Ensure this matches the directory in the workflow
  },
})
