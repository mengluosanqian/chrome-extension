import {
  createRouter,
  createWebHistory
} from "vue-router";
import login from "../popup/components/loginPage.vue";


// vue项目自带路由
const routes = [{
  path: "/",
  name: "login",
  component: login
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routes]
});

export default router;
