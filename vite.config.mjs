import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from a `.env` file
dotenv.config({ path: path.resolve(__dirname, './sample.env') });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for easier imports
    },
  },
  build: {
    outDir: 'build', // Specify the output directory
    sourcemap: true, // Generate sourcemaps (set to false if you want to disable them)
  },
});
