<template>
    <ul class="nowTime" ref="nowTime">
        <li></li>
        <li></li>
      </ul>
</template>

<script setup lang="ts">
const nowTime = ref<HTMLDivElement | null>(null);
const NowTime = () => nowTime.value as HTMLDivElement;
//获取当前时间
const getNowFormatDate = () => {
  let date = new Date();
  let year: number | string = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let strDate: number | string = date.getDate();
  let Hour: number | string = date.getHours(); // 获取当前小时数(0-23)
  let Minute: number | string = date.getMinutes(); // 获取当前分钟数(0-59)
  let Second: number | string = date.getSeconds(); // 获取当前秒数(0-59)
  let show_day = new Array(
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  );
  let day = date.getDay();
  if (Hour < 10) {
    Hour = "0" + Hour;
  }
  if (Minute < 10) {
    Minute = "0" + Minute;
  }
  if (Second < 10) {
    Second = "0" + Second;
  }
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentdate =
    "<div><p style='text-align:left;'>" +
    year +
    "年" +
    month +
    "月" +
    strDate +
    "号</p><p style='text-align:left'>" +
    show_day[day] +
    "</p></div>";
  let HMS = Hour + ":" + Minute + ":" + Second;
  let temp_time = year + "-" + month + "-" + strDate + " " + HMS;
  NowTime().children[0].innerHTML = HMS;
  NowTime().children[1].innerHTML = currentdate;
  setTimeout(getNowFormatDate, 1000); //每隔1秒重新调用一次该函数
};
onMounted(() => {
  getNowFormatDate();
})
</script>

<style lang="scss" scoped>
 .nowTime {
      position: absolute;
      left: 10px;
      top: 23px;
      font-size: 0;

      li {
        display: inline-block;
        width: 73px;
        height: 21px;
        font-size: 16px;
        color: #000;
        float: left;
      
      }

      li:nth-child(2) {
        font-size: 9px;
      

        p {
          text-align: left;
        }
      }
    }

</style>