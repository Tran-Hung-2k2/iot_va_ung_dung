import { resolve } from 'path';
import { defineConfig } from 'vite';
// import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // base: 'https://tranhung912002.id.vn/',
    build: {
        outDir: '../server/public/',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
});
// export default defineConfig({
//     server: { https: true },
//     plugins: [react(), mkcert()],
// });
