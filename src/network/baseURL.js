let baseURL = "/api";
// if (process.env.NODE_ENV === "development") {
//   // 开发环境  因为我这里写了配置跨域的重定路径所以是api
//   // 只有开发环境才会使用代理跨域，其他环境都是直接访问真实的服务器
//   baseURL = "/api";
// } else if (process.env.NODE_ENV === "production") {
//   // 正式环境 真正的上线网址 不是跨域别名路径,在network不显示
//   baseURL = "https://dp.itrustnow.com";
// } else if (process.env.NODE_ENV === "test") {
//   // 测试环境
//   baseURL = "https://testdp.itrustnow.com";
// }
export default baseURL;
