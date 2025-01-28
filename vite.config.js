import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const repoName = "threejs_portfolio"; // Ganti sesuai nama repo GitHub
  const basePath = mode === "development" ? "/" : `/${repoName}/`;

  return {
    plugins: [
      react(),
      {
        name: 'rewrite-paths',
        enforce: 'post',
        generateBundle(options, bundle) {
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
    base: basePath,
    build: {
      outDir: "dist",
    },
  };
});
