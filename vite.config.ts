import { defineConfig } from 'vitest/config';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), viteReact(), tailwindcss(), viteTsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
