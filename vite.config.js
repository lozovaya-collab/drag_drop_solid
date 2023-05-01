import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
    plugins: [
        devtools({
            /* additional options */
            autoname: true, // e.g. enable autoname
        }),
        solidPlugin()
    ],
    server: {
        port: 8085,
    },
    build: {
        target: 'esnext',
    },
});