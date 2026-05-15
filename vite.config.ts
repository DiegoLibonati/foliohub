import path from "path";
import { defineConfig, loadEnv } from "vite";

import type { UserConfig } from "vite";

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
        "@tests": path.resolve(import.meta.dirname, "./__tests__"),
      },
    },
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      proxy: {
        "/users": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: 3001,
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      minify: "esbuild",
      target: "ES2022",
    },
  };
});
