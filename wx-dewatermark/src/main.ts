import { createSSRApp } from "vue";
import App from "./App.vue";
import  share from '@/public/share'

export function createApp() {
  const app = createSSRApp(App);
  app.mixin(share);
  return {
    app,
  };
}
