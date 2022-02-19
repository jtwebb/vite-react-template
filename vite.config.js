import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { injectManifest } from 'rollup-plugin-workbox';
import fs from 'fs';
import path from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      react(),
      svgr(),
      injectManifest({
        swSrc: 'src/service-worker.js',
        swDest: 'dist/service-worker.js',
        globDirectory: 'dist',
        mode: 'production'
      })
    ],
    clearScreen: false,
    css: {
      preprocessorOptions: {
        scss: {}
      },
      postcss: {
        plugins: [
          autoprefixer(),
          mode === 'production' ? cssnano() : false
        ].filter(Boolean)
      }
    },
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, './.cert/key.pem'), 'utf8'),
        cert: fs.readFileSync(path.resolve(__dirname, './.cert/cert.pem'), 'utf8')
      }
    }
  });
}
