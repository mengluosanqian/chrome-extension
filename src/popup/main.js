import { createApp } from 'vue'
import app from './components/app.vue'
import router from "../router/index";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
createApp(app).use(router).use(ElementPlus).mount('#app')
