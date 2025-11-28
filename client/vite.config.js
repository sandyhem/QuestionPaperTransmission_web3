import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@adraffy/ens-normalize']
  },
  build: {
    rollupOptions: {
      external: ['@adraffy/ens-normalize']
    }
  }
});
