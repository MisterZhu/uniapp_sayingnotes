import { createSSRApp } from "vue";
import App from "./App.vue";
import  share from '@/public/share'
import { createPinia, defineStore } from 'pinia';

export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia());
  app.mixin(share);
  return {
    app,
  };
}
