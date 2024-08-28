import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

import pluginAPIRoutes from 'vite-plugin-api-routes'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pluginAPIRoutes({
      // moduleId: "@api",  // Old version change to "virtual:vite-plugin-api-routes",
      // cacheDir: ".api",
      // server: "[cacheDir]/server.js",
      // handler: "[cacheDir]/handler.js",
      // configure: "[cacheDir]/configure.js",
      // routeBase: "api",
      // dirs: [{ dir: "src/api", route: "", exclude: ["*.txt", ".csv", "data/*.*"] }],
      // include: ["**/*.js", "**/*.ts"],
      // exclude: ["node_modules", ".git"],
      // mapper: { default: "use", GET: "get", ... },
    }),
  ],
  
})
