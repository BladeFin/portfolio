import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use a relative base so the built site works whether it is hosted at
// `https://<user>.github.io/` (user pages) or `https://<user>.github.io/<repo>/`
// (project pages). Hash-style anchors (#about, #projects, …) don't care about
// the base path so this is safe for our SPA.
export default defineConfig({
  plugins: [react()],
  base: './',
});
