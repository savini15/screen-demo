<template>
  <!-- 中国地图 渲染县级 三级页面 接受来自市点击的name，渲染不同市json-->
  <!-- <div @click="$router.go(-1)" style="color: #fff; font-size: 20px">返回</div> -->
  <!-- <div class="tip" v-if="state.cityId === undefined">
    敬请谅解，乡镇数据正在努力更新中...
  </div> -->
  <!-- echarts的容器 -->
  <div :id="state.id" class="cityCharts"></div>
</template>

<script setup>
import * as echarts from "echarts";

import axios from "axios";

import { onMounted, reactive, ref } from "vue";

// useRoute() 用于获取当前路由信息（路由实例对象） useRouter() 路由跳转对象
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

// 引入定义的js，方便动态引入json
import { cityMap } from "../../../public/public/city/china-main-city-map";

import { watch } from "@vue/runtime-core";
const props = defineProps(["codeNo"]);
watch([props.codeNo], (newValue, oldValue) => {
  console.log("区域选择 修改了", newValue, oldValue);
});
let state = reactive({
  id: "echarts_" + new Date().getTime() + Math.floor(Math.random() * 1000),
  myChart: null,
  option: {
    // 背景颜色
    // backgroundColor: "#0b1c3e",
    title: {
      text: "",
      top: "8%",
      left: "8%",
      textStyle: {
        fontSize: 14,
        fontWeight: 300,
        color: "#fff",
      },
    },
    // 提示浮窗样式
    tooltip: {
      show: false,
      trigger: "item",
      alwaysShowContent: false,
      backgroundColor: "#0C121C",
      borderColor: "rgba(0, 0, 0, 0.16);",
      hideDelay: 100,
      triggerOn: "mousemove",
      enterable: true,
      formatter: "",
      textStyle: {
        color: "#DADADA",
        fontSize: "8",
        width: 20,
        height: 30,
        overflow: "break",
      },
      showDelay: 100,
    },

    visualMap: {
      //分段型视觉映射组件
      show: false,
      type: "piecewise",
      left: 50,
      bottom: 50,
      showLabel: true,
      itemWidth: 10,
      itemHeight: 10,
      inverse: true,
      color: "#fff",
      textStyle: {
        color: "#ffffff",
      },
      // lt:小于; lte:小于等于; gt:大于; gte:大于等于;
      pieces: [
        {
          lt: 5,
          label: " < 5",
          color: "#3749b9",
        },
        {
          gte: 5,
          lte: 10,
          label: "5 - 10",
          color: "#3749b9",
        },
        {
          gt: 10,
          lte: 15,
          label: "10 - 15",
          color: "#3749b9",
        },
        {
          gt: 15,
          lte: 20,
          label: "15 - 20",
          color: "#3749b9",
        },
        {
          gt: 20,
          lte: 30,
          label: "20 - 30",
          color: "#3749b9",
        },
        {
          gt: 30,
          label: "> 30",
          color: "#3749b9",
        },
      ],
    },

    // 地图配置
    geo: {
      map: "",
      roam: true, //是否开启平游或缩放
      zoom: 1.6, //当前视角的缩放比例
      emphasis: {
        label: {
          color: "#fff",
          backgroundColor: "yellow",
          padding: 5,
        },
        // 鼠标放上高亮样式
        itemStyle: {
          areaColor: "#2297fe",
          borderWidth: 0,
        },
      },
      label: {
        // 通常状态下的样式
        show: true,
        color: "#fff",
        // 鼠标放上去的样式
      },
      // 地图区域的样式设置
      itemStyle: {
        borderColor: "rgba(147, 235, 248, 1)",
        borderWidth: 1,
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "#3749b9", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#3749b9", // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        shadowColor: "rgba(128, 217, 248, 1)",
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
    },

    series: [
      {
        name: "",
        type: "map",
        geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
        data: [{ name: "", value: "" }],
      },
    ],
  },
});

onMounted(async () => {
  // console.log(route.query);
  /*  接受来自province.vue的参数:
     console.log(route.query);  打印后====》类似 {city: '哈密市'}*/
  const city = route.query.city;

  // 设置地图标题
  state.option.title.text = city;
  // 设置地图
  state.option.geo.map = city;
  // 第二种方式通过js文件引入json
  state.cityId = "xian"; //cityMap[city];

  // console.log(state.cityId);
  // 初始化echarts
  state.myChart = echarts.init(document.getElementById(state.id));
  if (state.cityId === undefined) return;

  await axios.get(`../../../public/city/${state.cityId}.json`).then((res) => {
    // console.log('\😂👨🏾‍❤️‍👨🏼==>： ',res);
    // 地图注册，第一个参数的名字必须和option.geo.map一致，第二个参数是地图json数据
    echarts.registerMap(city, res.data);
    res.data.features.forEach((item) => {
      // console.log(item);
      // series是数组里面data是一个对象，所以要用series[0].data.push
      state.option.series[0].data.push({
        name: item.properties.name,
        value: Math.floor(Math.random() * 100),
      });
    });
    state.myChart.setOption(state.option);
  });

  // state.myChart.on("click", function (params) {
  //   console.log("😂👨🏾‍❤️‍👨🏼==>： ", params);
  // });
  // 自适应
  window.addEventListener("resize", () => {
    state.myChart.resize();
  });
});

// 指定高亮区域
const cancelActive = (cityName) => {
  state.myChart &&
    state.myChart.dispatchAction({
      type: "select",
      // geo 中名称。
      name: cityName,
    });
};
</script>
<style>
.cityCharts {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
.tip {
  text-align: center;
  margin-top: 30px;
  color: #fff;
  font-size: 15px;
}
</style>
