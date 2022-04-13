import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad({ filter: /src\/.*\.js$/ }, async args => {
                return {
                  loader: 'jsx',
                  contents: await fs.readFile(args.path, 'utf8'),
                };
              });
            },
          },
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
