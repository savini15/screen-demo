<template>
  <div >
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
  series: [
    {
      name: "",
      type: "pie",
      clockwise: false,
      radius: ["40%", "70%"],
      label: {
        show: true,
        position: "outside",
        fontSize:8,
        formatter(param) {
          return param.name + " (" + param.percent * 1 + "%)";
        },
      },

      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      data: [
        { value: 30, name: "rose 1" },
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
