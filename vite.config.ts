import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath } from "url";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const wechatAppId = env.WECHAT_APP_ID||process.env.WECHAT_APP_ID;
  const apiBaseUrl = env.API_BASE_URL||process.env.API_BASE_URL;
  const base = env.BASE||process.env.BASE;
  return {
    define: {
      "__wechat_app_id__": JSON.stringify(wechatAppId),
      "__api_base_url__": JSON.stringify(apiBaseUrl),
    },
    base: base,
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      Icons({
        autoInstall: true,
      }),
    ],
    //兼容旧版本浏览器
    build: {
      polyfillModulePreload: true,
      rollupOptions: {
        output: {
          manualChunks: {
            "element-plus": ["element-plus"],
          },
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "https://csmht.xin/sinin",
          rewrite: (path) => path.replace(/^\/api/, ""),
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
