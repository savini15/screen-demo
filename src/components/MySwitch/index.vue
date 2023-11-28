<!-- 自动切换echarts -->
<template>
  <div
    class="count-resource q2"
    @mouseenter="ClearInterval"
    @mouseleave="SetInterval"
  >
    <div class="com-count-title">基础库统计</div>
    <div class="com-screen-content">
      <ul class="data-label">
        <li
          v-for="(item, index) in BaseLibrary"
          :key="index"
          :class="BaseLibraryIndex == index ? 'active' : ''"
          @click="BaseLibraryChange(index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul class="use-data">
        <li>
          <count-to
            class="data-count"
            :startVal="0"
            :endVal="BaseLibraryData.totalData"
            :decimals="0"
            :duration="2000"
          >
          </count-to>
          <span class="data-name">数据总量</span>
        </li>
        <li>
          <count-to
            class="data-count"
            :startVal="0"
            :endVal="BaseLibraryData.updateQuantity"
            :decimals="0"
            :duration="2000"
          ></count-to>
          <span class="data-name">更新量</span>
        </li>
        <li>
          <count-to
            class="data-count"
            :startVal="0"
            :endVal="BaseLibraryData.SharingNum"
            :decimals="0"
            :duration="2000"
          ></count-to>
          <span class="data-name">共享次数</span>
        </li>
      </ul>
      <div id="main3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { CountTo } from "vue3-count-to";
let myChart3;
const BaseLibrary = reactive([
  { name: "法人库", totalData: 5681, updateQuantity: 1331, SharingNum: 3753 },
  { name: "人口库", totalData: 3971, updateQuantity: 1141, SharingNum: 3753 },
  {
    name: "电子证照库",
    totalData: 4742,
    updateQuantity: 1231,
    SharingNum: 2983,
  },
]);
const BaseLibraryIndex = ref<number>(0);

const BaseLibraryData = ref({
  name: "法人库",
  totalData: 5681,
  updateQuantity: 1331,
  SharingNum: 3753,
});

let legal_person_data = {
  uploadData: [
    { count: 630 },
    { count: 986 },
    { count: 792 },
    { count: 642 },
    { count: 521 },
    { count: 573 },
    { count: 832 },
    { count: 747 },
    { count: 983 },
    { count: 836 },
    { count: 831 },
    { count: 633 },
  ],
  updateData: [
    { count: 110 },
    { count: 181 },
    { count: 123 },
    { count: 197 },
    { count: 123 },
    { count: 173 },
    { count: 123 },
    { count: 151 },
    { count: 101 },
    { count: 152 },
    { count: 101 },
    { count: 177 },
  ],
  viewData: [
    { count: 651 },
    { count: 842 },
    { count: 223 },
    { count: 223 },
    { count: 221 },
    { count: 812 },
    { count: 928 },
    { count: 219 },
    { count: 613 },
    { count: 254 },
    { count: 981 },
    { count: 301 },
  ],
};
let people_data = {
  uploadData: [
    { count: 1300 },
    { count: 1686 },
    { count: 1692 },
    { count: 1742 },
    { count: 1621 },
    { count: 773 },
    { count: 832 },
    { count: 1047 },
    { count: 1483 },
    { count: 1336 },
    { count: 831 },
    { count: 973 },
  ],
  updateData: [
    { count: 103 },
    { count: 281 },
    { count: 203 },
    { count: 197 },
    { count: 173 },
    { count: 154 },
    { count: 223 },
    { count: 251 },
    { count: 201 },
    { count: 252 },
    { count: 201 },
    { count: 277 },
  ],
  viewData: [
    { count: 651 },
    { count: 842 },
    { count: 223 },
    { count: 223 },
    { count: 221 },
    { count: 812 },
    { count: 928 },
    { count: 219 },
    { count: 613 },
    { count: 254 },
    { count: 981 },
    { count: 301 },
  ],
};
let picture_data = {
  uploadData: [
    { count: 330 },
    { count: 786 },
    { count: 492 },
    { count: 842 },
    { count: 421 },
    { count: 673 },
    { count: 932 },
    { count: 447 },
    { count: 583 },
    { count: 436 },
    { count: 331 },
    { count: 433 },
  ],
  updateData: [
    { count: 10 },
    { count: 81 },
    { count: 23 },
    { count: 97 },
    { count: 23 },
    { count: 73 },
    { count: 23 },
    { count: 51 },
    { count: 1 },
    { count: 52 },
    { count: 1 },
    { count: 77 },
  ],
  viewData: [
    { count: 451 },
    { count: 342 },
    { count: 523 },
    { count: 323 },
    { count: 421 },
    { count: 812 },
    { count: 728 },
    { count: 619 },
    { count: 613 },
    { count: 554 },
    { count: 481 },
    { count: 301 },
  ],
};
var scaleData = [
  {
    name: "数据总量",
    value: 3971,
  },
  {
    name: "更新量",
    value: 1141,
  },
  {
    name: "共享次数",
    value: 3753,
  },
];
var rich = {
  white: {
    color: "#ddd",
    align: "center",
    padding: [3, 0],
  },
};
var placeHolderStyle = {
  label: {
    show: false,
  },
  labelLine: {
    show: false,
  },
  color: "rgba(0, 0, 0, 0)",
  borderColor: "rgba(0, 0, 0, 0)",
  borderWidth: 0,
};
var data = [];
var color = [
  "#00ffff",
  "#00cfff",
  "#006ced",
  "#ffe000",
  "#ffa800",
  "#ff5b00",
  "#ff3000",
];
for (var i = 0; i < scaleData.length; i++) {
  data.push(
    {
      value: scaleData[i].value,
      name: scaleData[i].name,
      label: { color: "#ddd" },
      itemStyle: {
        borderWidth: 2,
        borderColor: color[i],
        shadowColor: color[i],
      },
    },
    {
      value: 2,
      name: "",
      itemStyle: placeHolderStyle,
    }
  );
}
var seriesObj = [
  {
    name: "",
    type: "pie",
    clockwise: false,
    radius: ["40%", "70%"],
    itemStyle: {
      label: {
        show: true,
        position: "outside",
        formatter: function (params) {
          var percent = 0;
          var total = 0;
          for (var i = 0; i < scaleData.length; i++) {
            total += scaleData[i].value;
          }
          percent = ((params.value / total) * 100).toFixed(0);

          if (params.name !== "") {
            return params.name + "\n{white|" + "占比" + percent + "%}";
          } else {
            return "";
          }
        },
        rich: rich,
      },
      labelLine: {
        show: true,
        color: "#00ffff",
      },
    },
    data: data,
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
];
// 柱状图
var attr = {
  name: "月平均单价",
  unit: "元/单",
};
// var graphicData = ["A级:1000-10000元/人",
// "B级:10000-100000元/人",
// "C级:100000-10000000元/人",
// ];
// 基础库统计tab改变时触发
const BaseLibraryChange = (index: number) => {
  BaseLibraryIndex.value = index;
  BaseLibraryData.value = BaseLibrary[index];
  if (index == 0) {
    init_myChart3(legal_person_data);
  } else if (index == 1) {
    init_myChart3(people_data);
  } else if (index == 2) {
    init_myChart3(picture_data);
  }
};
// 改变基础库统计tab
const Timer = () => {
  if (BaseLibraryIndex.value < 2) {
    BaseLibraryIndex.value++;
  } else {
    BaseLibraryIndex.value = 0;
  }
  BaseLibraryChange(BaseLibraryIndex.value);
};
let changeBaseLibrary;
const ClearInterval = () => {
  clearInterval(changeBaseLibrary);
};
// 启动计时器
const SetInterval = () => {
  changeBaseLibrary = setInterval(Timer, 3000);
};
const init_myChart3 = (data) => {
  domIsExistence(myChart3);
  myChart3 = echarts.init(document.getElementById("main3"));
  if (BaseLibraryIndex.value == 1) {
    myChart3.setOption({
      tooltip: {
        show: false,
      },
      legend: {
        show: false,
      },
      toolbox: {
        show: false,
      },
      series: seriesObj,
    });
  } else if (BaseLibraryIndex.value == 2) {
    myChart3.setOption({
      tooltip: {
        trigger: "item",
        padding: 1,
        formatter: function (param) {
          var resultTooltip =
            "<div style='background:rgba(13,5,30,.6);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;'>" +
            "<div style='text-align:center;color:#fff;'>" +
            param.name +
            "</div>" +
            "<div style='padding-top:5px;'>" +
            "<span style='color:#fff;'> " +
            attr.name +
            ": </span>" +
            "<span style='color:#fff;'>" +
            param.value +
            "</span><span style='color:#fff;'>" +
            attr.unit +
            "</span>" +
            "</div>" +
            "</div>";
          return resultTooltip;
        },
      },
      grid: {
        left: "10%",
        top: "7%",
        right: "0",
        bottom: "15%",
      },
      legend: {
        show: true,
        icon: "circle",
        orient: "horizontal",
        top: "90.5%",
        right: "center",
        itemWidth: 16.5,
        itemHeight: 6,
        textStyle: {
          color: "#C9C8CD",
          fontSize: 14,
        },
      },
      xAxis: [
        {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisLabel: {
            textStyle: {
              color: "#aaaaaa",
              fontSize: 12,
            },
            margin: 10, //刻度标签与轴线之间的距离。
            interval: 0,
          },

          axisLine: {
            show: false, //不显示x轴
          },
          axisTick: {
            show: false, //不显示刻度
          },
          boundaryGap: true,
          splitLine: {
            show: false,
            width: 0.08,
            lineStyle: {
              type: "solid",
              color: "#03202E",
            },
          },
        },
      ],
      yAxis: [
        {
          splitLine: {
            show: false,
            lineStyle: {
              color: "#eee",
              type: "solid",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#888",
            },
          },
        },
      ],
      series: [
        {
          //柱底圆片
          name: "",
          type: "pictorialBar",
          symbolSize: [14, 6], //调整截面形状
          symbolOffset: [0, 3],
          z: 12,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(89,211,255,1)",
                },
                {
                  offset: 1,
                  color: "rgba(23,237,194,1)",
                },
              ]),
            },
          },
          data: [120, 200, 150, 80, 70, 110, 130, 140, 150, 160, 150, 200],
        },

        //柱体
        {
          name: "",
          type: "bar",
          barWidth: 15,
          barGap: "0%",
          itemStyle: {
            normal: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: "linear",
                global: false,
                colorStops: [
                  {
                    //第一节下面
                    offset: 0,
                    color: "rgba(0,255,245,0.5)",
                  },
                  {
                    offset: 1,
                    color: "#43bafe",
                  },
                ],
              },
            },
          },

          data: [120, 200, 150, 80, 70, 110, 130, 140, 150, 160, 150, 200],
        },

        //柱顶圆片
        {
          name: "",
          type: "pictorialBar",
          symbolSize: [14, 6], //调整截面形状
          symbolOffset: [0, -3],
          z: 12,
          symbolPosition: "end",
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(89,211,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(23,237,194,1)",
                  },
                ],
                false
              ),
            },
          },
          data: [120, 200, 150, 80, 70, 110, 130, 140, 150, 160, 150, 200],
        },
      ],
    });
  } else {
    var uploadCnt = [];
    var updateCnt = [];

    var viewCnt = [];
    if (data.uploadData != null) {
      for (var i = 0; i < data.uploadData.length; i++) {
        uploadCnt.push(data.uploadData[i].count);
      }
    }
    if (data.updateData != null) {
      for (var i = 0; i < data.updateData.length; i++) {
        updateCnt.push(data.updateData[i].count);
      }
    }

    if (data.viewData != null) {
      for (var i = 0; i < data.viewData.length; i++) {
        viewCnt.push(data.viewData[i].count);
      }
    }
    myChart3.setOption({
      tooltip: {
        trigger: "axis",
        formatter: function (params, ticket, callback) {
          var res = "";
          for (var i = 0, l = params.length; i < l; i++) {
            res += "" + params[i].seriesName + " : " + params[i].value + "<br>";
          }
          return res;
        },
        transitionDuration: 0,
        backgroundColor: "rgba(83,93,105,0.8)",
        borderColor: "#535b69",
        borderRadius: 8,
        borderWidth: 2,
        padding: [5, 10],
        axisPointer: {
          type: "line",
          lineStyle: {
            type: "dashed",
            color: "#ffff00",
          },
        },
        textStyle: {
          // 提示框浮层的文本样式。
          color: "#fff",
        },
      },
      legend: {
        icon: "circle",
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 10,
        top: "5",
        right: "10",
        data: ["数据总量", "共享次数", "更新量"],
        textStyle: {
          fontSize: 14,
          color: "#a0a8b9",
        },
      },
      grid: {
        top: "30",
        left: "13%",
        right: "10",
        bottom: "22%",
        containLabel: false,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            fontSize: 14,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#a0a8b9",
            },
          },
          axisTick: {
            show: false,
          },
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月"],
          offset: 10,
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#a0a8b9",
            },
          },
          axisLabel: {
            margin: 10,
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: "#2b3646",
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "数据总量",
          type: "line",
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(137, 189, 27, 0.3)",
                },
                {
                  offset: 0.8,
                  color: "rgba(137, 189, 27, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "#1cc840",
          },
          data: uploadCnt,
        },
        {
          name: "共享次数",
          type: "line",
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(219, 50, 51, 0.3)",
                },
                {
                  offset: 0.8,
                  color: "rgba(219, 50, 51, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "#eb5690",
          },
          data: viewCnt,
        },
        {
          name: "更新量",
          type: "line",
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 136, 212, 0.3)",
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 136, 212, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "#43bbfb",
          },
          data: updateCnt,
        },
      ],
    });
  }
};
// 判断dom是否存在
const domIsExistence = (name) => {
  if (name != null && name != "" && name != undefined) {
    name.dispose(); //解决echarts dom已经加载的报错
  }
};
onMounted(() => {
  SetInterval();
  BaseLibraryChange(BaseLibraryIndex.value);
});

window.addEventListener("resize", () => {
  myChart3.resize();
});
</script>

<style lang="scss" scoped>
.count-resource {
  position: relative;
  padding: 12px;
  box-sizing: border-box;

  .com-count-title {
    color: #1bb4f9;
    font-size: 9px;
    padding: 0;
  }

  .com-screen-content {
    width: 100%;
    height: auto;

    .data-label {
      position: absolute;
      top: 12px;
      right: 10px;
      display: flex;

      li {
        width: 66px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        font-size: 10px;
        color: #828c9d;
      }

      li:hover,
      li.active {
        color: #fff;
        background: url(@/assets/images/choose-item.png) center/cover no-repeat;
      }
    }

    .use-data {
      text-align: center;
      padding: 2px 0;
      margin-top: 6%;
      height: 5%;
      background: url(@/assets/images/resource-use-data.jpg) center no-repeat;
      background-size: cover;
      border: solid 1px #093552;
      border-right: 0px;
      border-left: 0;

      li {
        width: 30%;
        font-size: 0;
        display: inline-table;
        border-right: solid 1px #1f4191;
      }

      .data-count {
        display: block;
        color: #fff;
        font-family: Bold;
        height: 1%;
        font-size: 9px;
      }

      .data-name {
        color: #1bb9f9;
        font-size: 9px;
      }

      li:last-child {
        border-right: 0;
      }
    }

    #main3 {
      height: 80px;
    }
  }
}
</style>