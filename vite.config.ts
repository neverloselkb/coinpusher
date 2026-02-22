import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 상대 경로로 설정하여 GitHub Pages(/coinpusher/) 및 Cloudflare Pages(/) 모두에서 정상 작동하도록 합니다.
  base: './',
  plugins: [react()],
})
