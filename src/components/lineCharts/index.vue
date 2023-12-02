<template>
  <div >
    <!-- <my-switch></my-switch> -->
    <my-echarts :myOption="options" v-if="changeDom"></my-echarts>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
const options = ref({
  title: {
    // text: "Stacked Line",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    // data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    // boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: "value",
    min: 0,
  },
  series: [],
});
const props = defineProps(["chartData", "catax"]);
const propOpts = computed(() => {
  //返回的是ref对象
  return props.chartData;
});
let changeDom = ref(false);
watch(propOpts, (newValue, oldValue) => {
  changeDom.value = false;
  const data = JSON.parse(JSON.stringify(newValue));
  changeDom.value = true;
  options.value.series = data; //newValue;
  options.value.xAxis.data = JSON.parse(JSON.stringify(props.catax)); //newValue;
  console.log("catax", options);
});
</script>
