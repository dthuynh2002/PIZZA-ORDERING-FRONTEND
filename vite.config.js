import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/images': {
                target: 'http://localhost:3001/images/',
                changeOrigin: true
            }
        }
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src')
        }
    }
});
