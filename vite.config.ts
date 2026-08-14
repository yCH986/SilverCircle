import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      proxy: {
        '/api/singstat': {
          target: 'https://tablebuilder.singstat.gov.sg/api/table/tabledata',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/singstat/, ''),
        },
      },
    },
  };
});
