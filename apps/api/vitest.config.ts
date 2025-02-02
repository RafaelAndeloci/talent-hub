/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        setupFiles: ['tests/setup.ts'],
        include: ['tests/**/*.test.ts'],
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
    resolve: {
        extensions: ['.js', '.ts', '.mjs', '.json'],
    },
});
