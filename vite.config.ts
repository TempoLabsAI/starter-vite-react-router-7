import path from "path";
import { defineConfig } from "vite";
import { reactRouter} from "@react-router/dev/vite";

// const conditionalPlugins: [string, Record<string, any>][] = [];

// // @ts-ignore
// if (process.env.TEMPO === "true") {
//   conditionalPlugins.push(["tempo-devtools/swc", {}]);
// }

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
  // optimizeDeps: {
  //   entries: ["src/main.tsx", "src/tempobook/**/*"],
  // },
  plugins: [
    reactRouter()
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  }
});
