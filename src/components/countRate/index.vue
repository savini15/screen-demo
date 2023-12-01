<template>
  <div>
    <el-row style="padding: 5px" v-if="info.name">
      <span style="font-size: 10px; color: #fff">{{ info.name }}:</span>
      <span :style="fontStyle(info)">{{ info.total }}</span>
    </el-row>
    <el-row>
      <span v-for="i in info.data" :key="i" :style="getStyle(i)"></span>
    </el-row>
    <el-row style="padding: 5px">
      <el-col :span="12" v-for="i in info.data" :key="i">
        <p
          :class="{ leftItem: i.index, rightItem: !i.index }"
          :style="fontStyle(i)"
        >
          {{ i.name }}{{ i.total }}
        </p>
        <p
          :class="{ leftItem: i.index, rightItem: !i.index }"
          :style="fontStyle(i)"
        >
          {{ i.rate }}%
        </p>
      </el-col>
    </el-row>
  </div>
</template>

import { color } from "echarts";
<script setup lang="ts">
import { ref } from "vue";
import * as _ from "lodash";
const props = defineProps(["data"]);
console.log("props0000", props);
const getStyle = (i) => {
  const border = i.index
    ? {
        borderRadius: "5px",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
      }
    : {
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
      };
  return _.assign(
    {
      background: i.color,
      display: "inline-block",
      width: `${i.rate}%`,
      height: "2vh",
    },
    border
  );
};

const fontStyle = (i) => {
  return {
    color: i.color,
    fontSize: "10px",
  };
};
const info = props.data;
</script>

<style lang="scss">
.com_item {
  display: inline-block;
}
.leftItem {
  text-align: left;
}
.rightItem {
  text-align: right;
}
</style>
