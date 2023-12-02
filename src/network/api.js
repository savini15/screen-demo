// 导入请求的方法

// 不使用箭头函数
// export function home() {
//     return request({ url: '/home', })
// }

import request from "./request";
// 用户登陆的接口  post请求使用data请求体 默认封装的get 如果是get请求不需要写methiod
//  export const login = (data) => request({ method: "post", url: '/login', data: data });

// 获取用户列表的接口 ,需要有默认参数. pagenum: 1,pagesize: 10,,所以要接收,
//  export const getUserList = (params) => request({ url: '/users', params });

// put请求修改用户id users/:uId/state/:type
//     export const getEdit = (data) => request({
//      method: "put",
//      data,
//      url: "users/" + data.uid + "/state/" + data.type,
//    })

// 轮播
export const getBanner = () => request({ url: "/carousel/getReleaseList" });

// 实例接口
export const mapCities = () =>
  request({
    url: "/data/countyList",
  });
// 媒体咨询
export const indexData = (code) =>
  request({
    url: `/data/index?quxian=${code}`,
  });
// 媒体查询详情  ?quxian=
export const lawData = (code) =>
  request({
    url: `/data/ggflfw?quxian=${code}`,
  });
