import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    projects: [
      {
        plugins: [tsconfigPaths(), react()],
        test: {
          name: 'node',
          include: ['src/lib/__tests__/**'],
          environment: 'node',
        },
      },
      {
        plugins: [tsconfigPaths(), react()],
        test: {
          name: 'jsdom',
          include: ['src/**/__tests__/**'],
          exclude: ['src/lib/__tests__/**'],
          environment: 'jsdom',
        },
      },
    ],
  },
})
