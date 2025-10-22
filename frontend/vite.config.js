import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: './', // 👈 Important for production to use relative paths
  build: {
    outDir: 'dist',
  },
})
