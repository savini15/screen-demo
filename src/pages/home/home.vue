<template>
  <div class="content_container">
    <el-row>
      <el-col :span="6">
        <list-card
          :cardName="item.cardName"
          :cardData="item.data"
          :cardbg="item.bk"
          v-for="(item, index) in cardList"
          :key="index"
        ></list-card>
      </el-col>
      <el-col :span="12">
        <h5 class="mb-2">main</h5>
        <div class="">
          <router-view></router-view>
        </div>
        <el-row>
          <el-col :span="8">
            <div class="">
              <div class="">1111</div>
              <my-chart :my-option="chart3Data" />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="">
              <div class="">222</div>
              <my-chart :my-option="chart4Data" />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="">
              <div class="">333</div>
              <my-chart :my-option="chart5Data" />
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="count-resource q1">
          <div class="com-screen-content2">
            <!-- 卫星信息传递特效
              <my-earth /> -->
            <list-card
              :cardName="item.cardName"
              :cardData="item.data"
              :cardbg="item.bk"
              v-for="(item, index) in cardListRight"
              :key="index"
            ></list-card>
          </div>
        </div>
        <!-- <my-switch /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import myChart from "@/components/MyEcharts/index.vue";
// import ScrollTable from "@/components/scrollTable/index.vue";
import "./home.scss";
import { reactive, ref } from "vue";
const cardList = ref([
  {
    cardName: "行政立法",
    data: [
      {
        icon: "src/assets/images/greenbook.png",
        key: "现行有效",
        value: 1170,
      },
      {
        icon: "src/assets/images/yellowarrow.png",
        key: "本年度制定(修改)",
        value: 1170,
      },
      {
        icon: "src/assets/images/greycancel.png",
        key: "本年度废止",
        value: 1170,
      },
      {
        icon: "src/assets/images/tele.png",
        key: "热线",
        value: 1170,
      },
      {
        icon: "src/assets/images/internet.png",
        key: "网络",
        value: 1170,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 1170,
      },
    ],
    bk: "src/assets/images/xzlf.png",
  },
  {
    cardName: "行政立法",
    data: [
      {
        icon: "src/assets/images/greenbook.png",
        key: "现行有效",
        value: 1170,
      },
      {
        icon: "src/assets/images/yellowarrow.png",
        key: "本年度制定(修改)",
        value: 1170,
      },
      {
        icon: "src/assets/images/greycancel.png",
        key: "本年度废止",
        value: 1170,
      },
    ],
    bk: "src/assets/images/xzlf.png",
  },
]);
const cardListRight = ref([
  {
    cardName: "公共法律服务平台数据",
    data: [
      {
        icon: "src/assets/images/tele.png",
        key: "热线",
        value: 1170,
      },
      {
        icon: "src/assets/images/internet.png",
        key: "网络",
        value: 1170,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 1170,
      },
    ],
    bk: "src/assets/images/xzlf.png",
  },
  {
    cardName: "律师业务",
    data: [
      {
        icon: "src/assets/images/manager.png",
        key: "律师",
        value: 1170,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "律所",
        value: 1170,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 1170,
      },
    ],
    bk: "src/assets/images/xzlf.png",
  },
  {
    cardName: "公证办理",
    data: [
      {
        icon: "src/assets/images/manager.png",
        key: "公证员",
        value: 1170,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "公证所",
        value: 1170,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 1170,
      },
    ],
    bk: "src/assets/images/xzlf.png",
  },
  {
    cardName: "司法鉴定",
    data: [
      {
        icon: "src/assets/images/manager.png",
        key: "司法鉴定人",
        value: 1170,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "司法鉴定机构",
        value: 1170,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 1170,
      },
    ],
    bk: "src/assets/images/xzlf.png",
  },
]);

// 获取1-当前月份的数据
const date = new Date();
const month = date.getMonth() + 1;
const arr = [];
for (let i = 1; i <= month; i++) {
  arr.push(i + "月");
}
let XData = arr;
let yData = [1243, 2315, 1164, 3021, 3521, 4121, 2001, 1983, 1432];
let baifenbi = [0.333, 0.444, 0.555, 0.777, 0.888];
let grayBar = [
  "技术建设类",
  "排查与整改类",
  "机制建设类",
  "管理完善类",
  "技术标识类",
];
let paiming = [5, 4, 3, 2, 1];
let xingm = [
  "技术建设类",
  "排查与整改类",
  "机制建设类",
  "管理完善类",
  "技术标识",
];
let state = reactive({
  chartData: {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    series: [
      {
        name: "资源总量构成",
        type: "pie",
        radius: "40%",
        center: ["50%", "50%"],
        data: [
          { value: 435, name: "公安局", label: { color: "#8fc31f" } },
          { value: 679, name: "民政局", label: { color: "#f35833" } },
          { value: 848, name: "气象局", label: { color: "#00ccff" } },
          { value: 348, name: "统计局", label: { color: "#ffcc00" } },
          { value: 679, name: "交通局", label: { color: "#f5e965" } },
          { value: 848, name: "人社局", label: { color: "#a74faf" } },
          { value: 1348, name: "其他", label: { color: "#ff9668" } },
        ],
        color: [
          "#8fc31f",
          "#f35833",
          "#00ccff",
          "#ffcc00",
          "#f5e965",
          "#a74faf",
          "#ff9668",
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          label: {
            show: true,
            formatter: "{b} : {c} ({d}%)",
            fontSize: 10, //文字的字体大小
          },
          labelLine: { show: true },
        },
      },
    ],
  },
  chart2Data: {
    backgroundColor: "",
    xAxis: {
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      data: XData,
      axisLabel: {
        formatter: function (value) {
          var ret = ""; //拼接加\n返回的类目项
          var maxLength = 1; //每项显示文字个数
          var valLength = value.length; //X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN > 1) {
            //如果类目项的文字大于3,
            for (var i = 0; i < rowN; i++) {
              var temp = ""; //每次截取的字符串
              var start = i * maxLength; //开始截取的位置
              var end = start + maxLength; //结束截取的位置
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + "\n";
              ret += temp; //凭借最终的字符串
            }
            return ret;
          } else {
            return value;
          }
        },
        interval: 0,
        fontSize: 14,
        fontWeight: 100,
        color: "#9faeb5",
      },
      axisLine: {
        lineStyle: {
          color: "#4d4d4d",
        },
      },
    },
    yAxis: {
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },

      axisLabel: {
        color: "#9faeb5",
        fontSize: 16,
      },
      axisLine: {
        lineStyle: {
          color: "#4d4d4d",
        },
      },
    },
    tooltip: {
      trigger: "axis",
      transitionDuration: 0,
      backgroundColor: "rgba(83,93,105,0.8)",
      borderColor: "#535b69",
      borderRadius: 8,
      borderWidth: 2,
      padding: [5, 10],
      formatter: function (params, ticket, callback) {
        var res = "";
        for (var i = 0, l = params.length; i < l; i++) {
          res += "" + params[i].seriesName + " : " + params[i].value + "<br>";
        }
        return res;
      },
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
    grid: {
      top: "10%",
      left: "13%",
      right: "0%",
      bottom: "17%",
    },
    series: [
      {
        name: "共享次数",
        type: "bar",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#00d386", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0076fc", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
          borderRadius: 15,
        },
        label: {
          show: true,
          position: "top",
          color: "#ffc72b",
          fontSize: 10,
        },
        data: yData,
        barWidth: 16,
      },
      {
        name: "折线",
        type: "line",
        itemStyle: {
          /*设置折线颜色*/
          /* color:'#c4cddc'*/
        },
        data: yData,
      },
    ],
  },
  chart3Data: {
    // 提示

    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      padding: [5, 10],
      formatter: function (params, ticket, callback) {
        // console.log("\😂👨🏾‍❤️‍👨🏼==>： ", params[0].data);
        if (params[0].data === "管理完善类") {
          return (
            "<span style='font-size:16px;color:#9a9a9a'>管理完善类</span>" +
            "<div style='margin:10px 0;'></div>" +
            "安全培训 ：" +
            "0" +
            "<br>" +
            "应急处置 ：" +
            "0" +
            "<br>" +
            "安全培训 ：" +
            "0" +
            "<br>" +
            "风险评估 ：" +
            "1"
          );
        } else if (params[0].data === "技术标识类") {
          return (
            "<span style='font-size:16px;color:#9a9a9a'>技术标识类</span>" +
            "<div style='margin:10px 0;'></div>" +
            "动态脱敏 : " +
            "56" +
            "<br>" +
            " 敏感数据发现 : " +
            "100"
          );
        } else if (params[0].data === "机制建设类") {
          return (
            "<span style='font-size:16px;color:#9a9a9a'>机制建设类</span>" +
            "<div style='margin:10px 0;'></div>" +
            " 数据交易 : " +
            "999" +
            "<br>" +
            " 数据认责 : " +
            "151" +
            "<br>" +
            " 重要数据 : " +
            "3" +
            "<br>" +
            " 分类分级 : " +
            "166"
          );
        } else if (params[0].data === "排查与整改类") {
          return (
            "<span style='font-size:16px;color:#9a9a9a'>排查与整改类</span>" +
            "<div style='margin:10px 0;'></div>" +
            " 业务完善 : " +
            "99" +
            "<br>" +
            " 数据跨境 : " +
            "550" +
            "<br>" +
            " 管理制度 : " +
            "30"
          );
        } else if (params[0].data === "技术建设类") {
          return (
            "<span style='font-size:16px;color:#9a9a9a'>技术建设类</span>" +
            "<div style='margin:10px 0;'></div>" +
            " 技术措施  : " +
            "99" +
            "<br>" +
            " 风险监测 : " +
            "1010" +
            "<br>" +
            " 主体授权 : " +
            "0"
          );
        }
      },
      axisPointer: {
        type: "line",
        lineStyle: {
          type: "dashed",
          color: "#ffff00",
        },
      },
      textStyle: {
        // 提示框浮层的文本样式。
        color: "#9a9a9a",
      },
    },
    title: {
      text: "企业级数据安全合规能力图谱",
      right: "5%",
      top: "20",
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    grid: {
      left: "15%", //如果离左边太远就用这个......
      right: "15%",
      bottom: "5%",
      top: "20%",
      containLabel: true,
    },
    xAxis: [
      {
        show: false,
      },
      {
        show: false,
      },
    ],
    yAxis: {
      type: "category",
      axisLabel: {
        show: true, //让Y轴数据不显示
      },

      axisTick: {
        show: false, //隐藏Y轴刻度
      },
      axisLine: {
        show: false, //隐藏Y轴线段
      },
    },
    series: [
      //背景色
      {
        show: true,
        type: "bar",
        barGap: "-100%",
        barWidth: "10%", //统计条宽度
        itemStyle: {
          borderRadius: 50,
          color: "rgba(41, 55, 94)",
        },
        z: 1,
        data: grayBar,
      },
      //蓝条
      {
        show: true,
        type: "bar",
        barGap: "-100%",
        barWidth: "10%", //统计条宽度
        itemStyle: {
          borderRadius: 50, //统计条弧度
          color: {
            colorStops: [
              {
                offset: 0,
                color: "#5d29f7", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#5093fb", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
        max: 1,
        label: {
          show: true,
          color: "#fff", //百分比颜色
          position: [0, "-15"],
          rich: {
            //富文本
            yellow: {
              color: "#FEC735",
            },
          },
          formatter: function (data) {
            //富文本固定格式{colorName|这里填你想要写的内容}
            if (
              paiming[data.dataIndex] == 1 ||
              paiming[data.dataIndex] == 2 ||
              paiming[data.dataIndex] == 3
            ) {
              return (
                "{yellow|" +
                paiming[data.dataIndex] +
                "  " +
                xingm[data.dataIndex] +
                "}"
              );
            } else {
              return paiming[data.dataIndex] + "  " + xingm[data.dataIndex];
            }
          },
        },
        data: baifenbi,
      },
    ],
  },
  chart4Data: {
    tooltip: {
      formatter: "{b}&nbsp; {c}次",
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "10%",
      top: "20%",

      containLabel: true,
      z: 22,
    },
    xAxis: {
      data: ["00:00", "06:00", "12:00", "18:00", "24:00"],
      axisLabel: {
        color: "#fff",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          type: "solid",
          color: "#24214e",
          width: "1  ", //坐标线的宽度
        },
      },
    },
    yAxis: {
      name: "（数次）",
      nameTextStyle: {
        color: "#fff",
      },
      nameLocation: "center",
      nameGap: 30,
      nameRotate: -270,
      axisLabel: {
        color: "#fff",
        fontSize: 12, //坐标值得具体的颜色
      },
      axisLine: {
        lineStyle: {
          type: "solid",
          color: "#24214e",
          width: "1  ", //坐标线的宽度
        },
      },
      splitLine: {
        lineStyle: {
          color: "#24214e",
        },
      },
    },
    series: [
      {
        type: "line",
        data: [40, 182, 191, 234, 290],
        itemStyle: {
          lineStyle: {
            width: 3, //折线宽度
          },
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
              {
                offset: 1,
                color: "#508ff6", // 0% 处的颜色
              },
              {
                offset: 0,
                color: "#2c137a", // 100% 处的颜色
              },
            ],
            false
          ),
          opacity: 0.4,
        },
      },
    ],
  },
  chart5Data: {
    color: ["#fd8f1e", "#7cb5ec", "#4280f1", "#957bde"],
    // 标题
    title: {
      text: "GDPR特有的合规需求之一",
      right: "5%",
      top: "20",
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: "10%",
      right: "15%",
      bottom: "20%",
      top: "20%",
      containLabel: true,
      z: 22,
    },

    legend: {
      data: ["系统日志", "业务数据", "其他用户数据", "搜索结果"],
      textStyle: {
        fontSize: 12,
        color: "#fff",
      },
      icon: "rect",
      itemWidth: 10,
      itemHeight: 10,
      bottom: "9%",
    },

    xAxis: {
      name: "次数",
      nameTextStyle: {
        color: "#fff",
      },
      axisLabel: {
        color: "#fff",
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: "#24214e",
        },
      },
      axisLine: {
        lineStyle: {
          type: "solid",
          color: "#24214e",
          width: "1  ", //坐标线的宽度
        },
      },
    },
    yAxis: {
      data: ["2018.11", "2018.12", "2019.01", "2021.02", "2022.03"],
      axisLabel: {
        color: "#fff",
        fontSize: 12, //坐标值得具体的颜色
      },
      axisLine: {
        lineStyle: {
          type: "solid",
          color: "#24214e",
          width: "1  ", //坐标线的宽度
        },
      },
    },
    series: [
      {
        name: "系统日志",
        type: "bar",
        stack: "总量",
        barWidth: 20,
        label: {
          show: false,
          position: "insideRight",
        },
        data: [6, 4, 10, 8, 7],
      },
      {
        name: "业务数据",
        type: "bar",
        barWidth: 20,
        stack: "总量",
        label: {
          show: false,
          position: "insideRight",
        },
        data: [8, 10, 4, 5, 6],
      },
      {
        name: "其他用户数据",
        type: "bar",
        stack: "总量",
        barWidth: 20,
        label: {
          show: false,
          position: "insideRight",
        },
        data: [6, 4, 10, 8, 7],
      },
      {
        name: "搜索结果",
        type: "bar",
        stack: "总量",
        barWidth: 20,
        label: {
          show: false,
          position: "insideRight",
        },
        data: [6, 4, 10, 8, 7],
      },
    ],
  },
  chart6Data: {
    color: ["#623ad1", "#3383fc"],
    tooltip: {},
    radar: [
      {
        indicator: [
          {
            name: "界面数据隐匿",
            max: 100,
          },
          {
            name: "网络数据隐匿",
            max: 100,
          },
          {
            name: "数据访问通告",
            max: 100,
          },
          {
            name: "域内计算数据隐匿",
            max: 100,
          },
          {
            name: "跨域计算数据隐匿",
            max: 100,
          },
        ],
        center: ["50%", "60%"],
        radius: "65%",
        startAngle: 90,
        axisName: {
          formatter: "{value}",
          fontSize: 12, //外圈标签字体大小
          color: "#FFF", //外圈标签字体颜色
        },
        splitArea: {
          // 坐标轴在 grid 区域中的分隔区域，默认不显示。
          show: true,
          areaStyle: {
            // 分隔区域的样式设置。
            color: [], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
          },
        },
        axisLine: {
          //指向外圈文本的分隔线样式
          lineStyle: {
            color: "#24214e",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#24214e", // 分隔线颜色
            width: 1, // 分隔线线宽
          },
        },
      },
    ],
    series: [
      {
        name: "雷达图",
        type: "radar",
        data: [
          {
            name: "2022",
            value: [85, 65, 55, 90, 82],
            areaStyle: {
              opacity: 1, // 区域透明度
            },
            symbolSize: 0, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
          },
          {
            name: "2021",
            value: [50, 80, 45, 30, 75],
            symbolSize: 0,
            areaStyle: {
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: "#3cd2f3",
                  },
                  {
                    offset: 1,
                    color: "#306eff",
                  },
                ],
                globalCoord: false,
              },
              opacity: 1, // 区域透明度
            },
          },
        ],
      },
    ],
  },
});
const {
  chartData,
  chart2Data,
  chart3Data,
  chart4Data,
  chart5Data,
  chart6Data,
} = toRefs(state);
</script>
<style lang="scss" scoped></style>
