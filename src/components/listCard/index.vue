<template>
  <div class="card_list" :style="cardStyle">
    <el-card class="box-card">
      <template #header>
        <div class="card-header-box" :style="headerStyle"></div>
        <div class="card-header-icon">
          <img src="@/assets/images/arrowright.png" alt="" />
        </div>
        <div class="card-header" @click="goDetail()">
          {{ cardName }}
        </div>
      </template>
      <template #default>
        <div class="card-body">
          <slot name="rate"></slot>
          <slot name="circleCharts"></slot>
          <slot name="linecharts"></slot>
          <el-row :gutter="20">
            <el-col
              :span="getSpan()"
              v-for="(item, index) in cardData"
              :key="index"
            >
              <el-progress
                v-if="item.type"
                type="circle"
                :width="95"
                :percentage="item.value"
                :color="item.color"
                :stroke-width="4"
              >
                <p :style="pgStyle">{{ item.value }}%</p>
              </el-progress>
              <img
                v-if="!item.type"
                :src="item.icon"
                alt=""
                class="list_icon"
              />
              <p v-if="!item.type" class="item_value">{{ item.value }}</p>
              <p class="item_key">{{ item.key }}</p>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps([
  "cardName",
  "cardData",
  "cardbg",
  "propsWidth",
  "propsHeight",
  "wrap",
]);
console.log("props------", props);
const cardStyle = ref({
  background: `url(${props.cardbg})`,
  backgroundSize: "cover",
  width: props.propsWidth || "100%",
  height: props.propsHeight || "auto",
  // paddingRight: "0.08rem",
});

const pgStyle = ref({
  color: "yellow",
  fontSize: "10px",
  textAlign: "center",
  width: "40px",
});

const headerStyle = ref({
  width: `${props.cardName.length / 10 + 0.25}rem`,
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
const goDetail = () => {
  console.log("props 95------", props.cardPath);
  // 在组件中调用 router.push() 来进行路由跳转
  router.push({ name: "law" }); // '/path' 表示要跳转到的目标路由地址
};
</script>

<style lang="scss">
.card_list {
  text-align: center;
  margin-bottom: 0.1rem;

  .item_value {
    padding-top: 0.05rem;
    font-size: 10px;
    color: yellow;
  }

  .list_icon {
    width: 0.18rem;
    height: auto;
  }

  .item_key {
    padding-top: 0.01rem;
    font-size: 0.05rem;
    color: #9fd1ea;
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
    font-size: 14px;
  }
}

.el-card {
  width: 100%;
  height: 100%;
  position: relative;
  border: none;
  box-shadow: none;
  background: none;
  border-left: 0.01rem solid;
  border-bottom: 0.01rem solid;
  border-radius: 0.01rem;
  border-image: linear-gradient(to right, #008790, #6d8d40, #163897) 1;
  clip-path: inset(0 round 0.01rem);
}
.card-header {
  padding-top: 0.05rem;
  width: 100%;
  position: relative;
  bottom: 0;
  left: 0.1rem;
  overflow: hidden;
  z-index: 2;
  color: #ffffff;
  font-size: 0.08rem;
}

.el-card__header {
  height: 0.15rem;
  position: relative;
  padding: 0;
  bottom: 0;
  border-bottom: none;
  text-align: left;
  padding-left: 0.08rem;
}
.card-header-icon {
  width: 0.25rem;
  height: 0.14rem;
  line-height: 0.16rem;
  border-top: 0.01rem solid #23a1c4;
  border-left: 0.01rem solid #23a1c4;
  left: 0.02rem;
  top: 0.02rem;
  position: absolute;
  text-align: left;
  z-index: 2;
  img {
    width: 0.08rem;
    height: auto;
    margin-left: 0.05rem;
  }
}

.card-header-box {
  content: "";
  display: block;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: -0.01rem;
  width: 1rem;
  border-right: 0.014rem solid;
  border-top: 0.01rem solid;
  border-image: linear-gradient(to right, #23a1c4, #507a4f) 1;
  // clip-path: inset(0 round 0.01rem);
  background-color: #1a215a;
  transform-origin: 0 100%;
  transform: skewX(45deg);
}

.card-header-box::after {
  content: "";
  display: block;
  z-index: 1;
  position: absolute;
  top: 0;
  right: -0.1rem;
  bottom: 0.02rem;
  width: 0.01rem;
  background-color: #23a1c4;
}
.card-header-box::before {
  content: "";
  display: block;
  z-index: 1;
  position: absolute;
  top: 0;
  right: -0.07rem;
  bottom: 0.02rem;
  width: 0.025rem;
  background-color: #23a1c4;
}

.card_title_text {
  z-index: 2;
}
.card-body {
  height: 100%;
}
.el-card__body {
  position: relative;
  top: -1;
  height: calc(100% - 0.15rem);
  width: 100%;
  padding: 0.15rem;
  overflow: hidden;
}

.el-card__body::before {
  content: "";
  height: 100%;
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: -1px;
  background: #1a215a;
  border-right: 1px solid;
  border-top: 1px solid;
  border-image: linear-gradient(to right, #008790, #6d8d40, #163897) 1;
  clip-path: inset(0 round 0.02rem);
}

.el-card__body::after {
  content: "";
  display: block;
  position: absolute;
  top: -0.01rem;
  right: -0.1rem;
  width: 0.1rem;
  height: 0.1rem;
  border-left: 0.012rem solid;
  background-color: #1d2667;
  border-image: linear-gradient(to right, #1d3f8f, #173289) 1;
  clip-path: inset(0 round 0.01rem);
  transform-origin: 0 100%;
  transform: skewX(45deg);
}
</style>
