<template>
  <div class="card_list" :style="cardStyle">
    <el-row class="padding_container">
      <!-- <img src="../../assets/images/arrowright.png" class="arrow_icon" alt=""> -->
      <span class="right_arrow_name">{{ cardName }}</span>
    </el-row>
    <slot name="rate"></slot>
    <slot name="circleCharts"></slot>
    <el-row gutter="20">
      <el-col :span="getSpan()" v-for="(item, index) in cardData" :key="index">
        <div>
          <el-progress
            v-if="item.type"
            type="circle"
            :width="40"
            :percentage="item.value"
            :color="item.color"
            :stroke-width="4"
          >
            <p :style="pgStyle">{{ item.value }}%</p>
          </el-progress>
          <img v-if="!item.type" :src="item.icon" alt="" class="list_icon" />
          <p v-if="!item.type" class="item_value">{{ item.value }}</p>
          <p class="item_key">{{ item.key }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps([
  "cardName",
  "cardData",
  "cardbg",
  "propsWidth",
  "wrap",
]);
console.log("props------", props);
const cardStyle = ref({
  background: `url(${props.cardbg})`,
  backgroundSize: "cover",
  width: props.propsWidth || "100%",
  // display:'inline-block'
});

const pgStyle = ref({
  color: "yellow",
  fontSize: "10px",
  textAlign: "center",
  width: "40px",
});

const getSpan = (i) => {
  let a = 8;
  if (!!props.wrap) {
    a = 8;
  } else {
    a = 24 / props.cardData.length;
  }
  return a;
};
</script>

<style lang="scss">
.arrow_icon {
  width: 0.1rem;
  height: 0.1rem;
  margin-right: 10px;
}
.card_list {
  text-align: center;
  // padding: 10px;
  margin-bottom: 2vh;
  .item_value {
    font-size: 10px;
    color: yellow;
    // padding: 2vh 0;
  }
  .list_icon {
    width: 4vh;
    height: 5vh;
  }
  .item_key {
    font-size: 8px;
    color: #fff;
  }
  .right_arrow_key {
    color: #3a8be4;
    font-size: 10px;
    font-weight: 900;
    padding: 0;
    margin: 0;
  }
  .right_arrow_name {
    color: #fff;
    font-size: 8px;
  }
  .padding_container {
    padding: 0 0 10px 0;
  }
}
</style>
