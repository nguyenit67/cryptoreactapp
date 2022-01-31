import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// import vitePluginImp from 'vite-plugin-imp';

// import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style: (name) => `antd/es/${name}/style`,
    //     },
    //   ],
    // }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [{ find: /^~/, replacement: '' }],
  },
});
