import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/events': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
      },
    },
  },
});
