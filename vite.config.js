import { defineConfig } from 'vite'
import content from '@originjs/vite-plugin-content'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), content()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
