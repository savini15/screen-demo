import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

// 导入路由404分模块
import NoFond from "./NoFond.ts";
// 导出多个要导出一个数组形式，在router.js中使用,必须使用扩展运算全部导入，导出一个如上一个对象形式即可

//引入main.ts
import app from "../main.ts";

const routes = [
  {
    // 测路由目前为测试vuex
    path: "/login",
    component: () => import("@/pages/login/login.vue"),
    meta: {
      loading: true,
    },
  },
  {
    // 重定向到china
    path: "/",
    redirect: "/china",
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/home/home.vue"),
    meta: {
      loading: true,
    },
    children: [
      {
        path: "/china",
        name: "",
        component: () => import("@/pages/home/china.vue"),
        meta: {
          loading: true,
        },
      },
      {
        path: "/city",
        name: "",
        component: () => import("@/pages/home/city.vue"),
        meta: {
          loading: true,
        },
      },
      {
        path: "/province",
        name: "",
        component: () => import("@/pages/home/province.vue"),
        meta: {
          loading: true,
        },
      },
    ],
  },

  // 路由分模块
  NoFond,
];

// 导出路由
const router = createRouter({
  history: createWebHistory(), //开启history模式
  // history: createWebHashHistory(), //开启hash模式
  routes,
});

// 在路由元信息配置守卫 requiredPath为true, 适合守卫多个页面 vue3next() 变成return true
router.beforeEach((to, from, next) => {
  if (to.meta.loading) {
    app.config.globalProperties.$loading.showLoading();
    next();
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  if (to.meta.loading) {
    app.config.globalProperties.$loading.hideLoading();
  }
});
export default router;
