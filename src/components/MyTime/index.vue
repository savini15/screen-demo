<template>
  <span class="nowTime">{{ nowTime }} {{ day }}</span>
</template>

<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";
const nowTime = ref(null);
const day = ref(null);
const getNowformatDate = () => {
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const dayNum = moment().day();
  nowTime.value = date;
  day.value = getweekDay();
  setTimeout(getNowformatDate, 1000);
};
const getweekDay = () => {
  let week = moment().day();
  switch (week) {
    case 1:
      return "周一";
    case 2:
      return "周er";
    case 3:
      return "周三";
    case 4:
      return "周四";
    case 5:
      return "周五";
    case 6:
      return "周六";
    case 0:
      return "周日";
  }
};
onMounted(() => {
  getNowformatDate();
});
</script>

<style lang="scss" scoped>
.nowTime {
  position: absolute;
  right: 30px;
  top: 23px;
  font-size: 10px;
  color: #58d9f9;
}
</style>
