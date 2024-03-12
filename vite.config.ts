import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'
import tailwindcss from '@tailwindcss/vite';

const portEnv = parseInt(process.env.PORT || '');
const port = Number.isInteger(portEnv) ? portEnv : 4000

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: port,
  },
  build: {
    outDir: "build", // change to 'build', explain later
  },
  plugins: [
    react(),
    tailwindcss(),
    devServer({
      entry: "server.ts",
      exclude: [ // We need to override this option since the default setting doesn't fit
        /.*\.tsx?($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /.*\.(svg|png)($|\?)/,
        /^\/@.+$/,
        /^\/favicon\.ico$/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/
      ],
      injectClientScript: false, // This option is buggy, disable it and inject the code manually
    })
  ],
})
