<template>
  <el-select
    v-model="value"
    @change="optionChange()"
    clearable
    placeholder="Select"
    class="special-color"
  >
    <el-option
      v-for="item in options"
      :key="item.name"
      :label="item.name"
      :value="item.code"
    />
  </el-select>
</template>

<script setup>
import { ref } from "vue";
import apiRes from "@/utils/apiData/quyu.js";
import {useStore} from 'vuex' ;
const store = useStore()
const value = ref(null);
const options = apiRes.data;
let $emit = defineEmits(["optionChange"]);
const optionChange = () => {
  $emit("optionChange", value.value);
  store.commit('selectAreaChange', '新城区')
};
</script>

<style scoped lang="scss">
/* 修改下拉框的边框和宽度 */
.el-select {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999999;
  width: 100px !important;
  border: none;
  background-color: transparent !important;
}

/* 去除下拉框的阴影效果 */
.el-select-dropdown {
  box-shadow: none !important;
}

/* 修改下拉框选中项的背景色 */
.el-select-dropdown .el-select-dropdown__item.selected {
  background-color: transparent !important;
}
:deep .el-input__wrapper {
  background: RGBA(35, 50, 140, 0.6) !important;
  border: none !important;
  border-radius: 30px;
  height: 30px;
}
:deep .el-input .el-input__suffix-inner {
  background: url(@/assets/images/reversearrow.png) no-repeat;
  background-size: 12px 12px;
  width: 12px;
  height: 12px;
  margin-top: 5px;
  appearance: none;
}

:deep .el-icon svg {
  //隐藏原来箭头

  display: none;
}
:deep .el-input__inner {
  background-color: transparent;
  color: #1e83e1;
  font-size: 10px;
  // border: 1px solid #e43179;
}
.el-select__popper {
  border: none !important;
}
:deep .el-select-dropdown {
  font-size: 10px;
  // 若不将下拉框的背景颜色设置为：transparent，那么做不出来半透明的效果；

  // 因为其最终的显示为：下拉框有一个背景颜色且下拉框的字体有一个背景颜色，重叠后的效果展示；
  background: transparent !important;
  color: red !important;
  // border: 1px solid #23328C;
}
.el-select-dropdown__item {
  font-size: 10px;
  // line-height: 19px;
  color: #fff;
  // font-weight: 200;
  background-color: #23328c !important;
}
.el-select-dropdown__item:hover {
  background-color: rgba(0, 225, 219, 0.6) !important;
  color: #fff;
}
.el-select-dropdown__list {
  padding: 0;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}
</style>
