/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
    plugins:[react()],
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: "load-js-files-as-jsx",
                    setup(build) {
                        build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                            loader: "jsx",
                            contents: await fs.readFile(args.path, "utf8"),
                        }));
                    }
                },
            ],
        },
    },
    test: {
        globals: true, // Make Vitest variable can be accessed globaly
        environment: 'jsdom', // Change default testing environment to jsdom
        setupFiles: './setup.js', // Setup file,
        exclude: ['**/node_modules/**'],
    },
});
