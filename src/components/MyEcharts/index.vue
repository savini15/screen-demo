<template>
  <div :id="uid" :style="style"></div>
</template>
<script setup>
import { defineProps, defineEmits, onMounted, reactive, ref } from "vue";
const emits = defineEmits([]);
import * as echarts from "echarts";

// 因为是封装的组件，会多次调用，id不能重复，要在初始化之前写，不然会报错dom为定义
let uid = ref(null);
onBeforeMount(() => {
  uid.value = `echarts-uid-${parseInt(Math.random() * 1000000)}`;
  // 也可以用毫秒数作为id
  // uid.value = `echarts-uid-${new Date().getTime()}`;
});

onMounted(() => {
  var myChart = echarts.init(document.getElementById(uid.value));
  // 在template中可以直接取props中的值，但是在script中不行，因为script是在挂载之前执行的
  myChart.setOption(props.myOption, {
    notMerge: true, //不和之前的option合并
  });
  // 监听页面的大小
  window.addEventListener("resize", () => {
    myChart.resize();
  });
});

const props = defineProps({
  style: {
    type: Object,
    default: () => ({
      width: "100%",
      height: "100%",
    }),
  },
  myOption: {
    type: Object,
    default: () => ({}),
  },
});
</script>
<style lang="scss" scoped></style>
