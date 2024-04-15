import {
  createRouter,
  createWebHistory
} from "vue-router";
import login from "../popup/components/loginPage.vue";
import userAndPass from "../popup/components/userAndPass.vue";

// vue项目自带路由
const routes = [{
  path: "/",
  name: "login",
  component: login
}, {
  path: "/userAndPass",
  name: "userAndPass",
  component: userAndPass
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routes]
});

export default router;
