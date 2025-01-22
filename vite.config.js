import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'rewrite-paths',
      enforce: 'post',
      generateBundle(options, bundle) {
        const basePath = mode === "development" ? "/" : "/threejs_portfolio/";
        Object.values(bundle).forEach((chunk) => {
          if (chunk.type === 'chunk' || chunk.type === 'asset') {
            if (chunk.code) {
              chunk.code = chunk.code
                .replace(/["']\/assets\//g, `"${basePath}assets/`)
                .replace(/["']\/models\//g, `"${basePath}models/`)
                .replace(/["']\/textures\//g, `"${basePath}textures/`);
            }
          }
        });
      }
    }
  ],
  base: mode === "development" ? "/" : "/threejs_portfolio/",
  build: {
    outDir: "docs",
  },
}))