import { defineConfig, PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const plugins: PluginOption[] = [
  vue(),
  vueJsx()
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  server: {
    host: '0.0.0.0'
  }
});
