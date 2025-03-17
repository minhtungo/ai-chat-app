import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// const ReactCompilerConfig = {};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      autoCodeSplitting: true,
    }),
    viteReact({
      // babel: {
      //   plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      // },
    }),
    tailwindcss(),
    viteTsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
