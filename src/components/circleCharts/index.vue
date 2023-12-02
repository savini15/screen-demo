<template>
  <div style="height: 100%">
    <my-echarts :myOption="options" v-if="changeDom"></my-echarts>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
const props = defineProps(["chartData"]);
const options = ref({
  title: {
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
      data: [],
    },
  ],
});
const propOpts = computed(() => {
  //返回的是ref对象
  return props.chartData;
});
let changeDom = ref(false);
watch(propOpts, (newValue, oldValue) => {
  changeDom.value = false;
  const data = JSON.parse(JSON.stringify(newValue));
  changeDom.value = true;
  options.value.series[0].data = data; //newValue;
  console.log("propOpts", data, options);
});
</script>
