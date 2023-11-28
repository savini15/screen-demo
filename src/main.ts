import { createApp } from "vue";
import App from "./App.vue";

// 引入重置与全局样式
import "./style/reset.css";
import "./style/common.css";

//导入router配置文件
import route from "@/route/router";

//导入vuex配置文件
import store from "@/store";

// 引入rem基准值
import "amfe-flexible";

// 引入element-icon集合
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 自定义loading组件
import Loading from "./components/MyLoading/index.ts";

const app = createApp(App);

// 打印环境变量
// console.log(process.env.NODE_ENV);
// console.log("😂👨🏾‍❤️‍👨🏼==>： ", process.env.NODE_ENV);

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }

//全局注册
app.use(route);
app.use(store);
app.use(Loading);
app.mount("#app");
export default app; // 这里导出app的目的，是为了在后面演示js文件中使用插件
