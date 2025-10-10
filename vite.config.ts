import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base URL for built assets. Default to '/' which is correct for a custom domain (www.bemaia.nl).
  // You can override at build time for a project page (username.github.io/repo) with VITE_BASE=/BeMaia/
  base: process.env.VITE_BASE || '/',
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: 'docs',
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
