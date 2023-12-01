<template>
  <div>
    <my-echarts :myOption="options"></my-echarts>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["seriesData"]);
const options = ref({
  title: {
    // text: 'Nightingale Chart',
    // subtext: 'Fake Data',
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a}{b} : {c} ({d}%)",
  },
  series: [
    {
      name: "",
      type: "pie",
      clockwise: false,
      radius: ["40%", "70%"],
      minAngle: 15, //最小角度
      startAngle: 270, //起始角度
      label: {
        show: true,
        alignTo: "left",
        minMargin: 1,
        edgeDistance: 10,
        lineHeight: 5,
        fontSize: 8,
        color: "inherit",
        formatter(param) {
          return param.name + " (" + param.percent * 1 + "%)";
        },
      },
      labelLine: {
        length: 5,
        length2: 5,
        maxSurfaceAngle: 20,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      data: [
        { value: 30, name: "rose 1", color: "red" },
        { value: 28, name: "rose 2" },
        { value: 26, name: "rose 3" },
        { value: 24, name: "rose 4" },
        { value: 22, name: "rose 5" },
        { value: 20, name: "rose 6" },
        { value: 18, name: "rose 7" },
        { value: 16, name: "dd 8" },
      ],
    },
  ],
});
</script>
