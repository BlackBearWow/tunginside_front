import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // npm run build를 index로 고정.
  // 브라우저 캐시 정책으로 인해 업데이트가 안될 수도 있음
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/index.js`,
        chunkFileNames: `assets/index.js`,
        assetFileNames: `assets/index.css`,
      },
    },
  },
  server: {
    proxy: {
      // 경로가 /api로 시작하면 아래 타겟 서버로 전달합니다.
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        // 만약 스프링 서버에서 /api를 제외한 경로를 사용한다면 아래 설정 추가
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
