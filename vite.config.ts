import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    //引入vue 插件
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-import.d.ts",
    }),
    //plus按需引入
    AutoImport({
      // resolvers: [ElementPlusResolver()],
    }),
    //plus按需引入
    Components({
      // resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  resolve: {
    //配置根路径别名： import('@/pages/login/login.vue')
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 跨域
  server: {
    //使用IP能访问
    host: "0.0.0.0",
    // 热更新
    hmr: true,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //自定义代理规则
    proxy: {
      // 选项写法
      "/api": {
        // 跨域这里只需要写本地接口就行，线上和test环境已经在network/baseUrl.js中配置好了
        target: "http://219.145.89.71:9002",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
