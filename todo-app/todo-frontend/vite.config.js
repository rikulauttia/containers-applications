import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external connections, needed for Docker
    allowedHosts: ["todo-frontend", "localhost"], // ✅ Fixes "Blocked Request" issue
  },
  test: {
    globals: true,
    environment: "jsdom", // Simulates browser-like environment for testing
  },
});
