import { createApp } from 'vue';
import './style.css';
import App from './App';
import { setupStore } from './store';

const bootstrap = async (): Promise<void> => {
  const app = createApp(App);

  // 挂载状态管理
  setupStore(app);

  app.mount('#app', true);
};

bootstrap();
