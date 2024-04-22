import {
  createRouter,
  createWebHistory
} from "vue-router";
import login from "../popup/components/loginPage.vue";
import userAndPass from "../popup/components/userAndPass.vue";
import indexedDB from "../popup/components/indexedDB.vue"

// vue项目自带路由
const routes = [{
  path: "/",
  name: "login",
  component: login
}, {
  path: "/base/userAndPass",
  name: "userAndPass",
  component: userAndPass
}, {
  path: "/base/indexedDB",
  name: "indexedDB",
  component: indexedDB
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routes]
});

export default router;
