
<template >
    <div class='card_list' >
            <el-row class="padding_container">
                <el-icon class="right_arrow_key"><ArrowRightBold/></el-icon>
                <el-icon class="right_arrow_key"><ArrowRightBold/></el-icon>
                <span class="right_arrow_name">{{cardName}}</span>
            </el-row>
  
        <el-row gutter="20">
            <el-col :span="8" v-for="(item, index) in list" :key="index" style="text-align:center">
               <component :is="item.icon" color="#7efdad" width="50%"></component>
               <p class="item_value"> {{item.value}}</p>
               <p class="item_key"> {{item.key}}</p>
            </el-col>
        </el-row >
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { Edit, View as IconView } from '@element-plus/icons-vue'
const cardName = ref('测试卡片')
const list = ref([
 {
    icon:Edit,
    key:'行政人员',
    value:123
 },
 {
    icon:IconView,
    key:'行政人员',
    value:123
 },
 {
    icon:Edit,
    key:'行政人员',
    value:123
 },
   
])
</script>


<style lang="scss" >
    .card_list{
        border: 1px solid #1bb4f9;
        box-shadow: #1bb4f9 0px 0px 5px 1px inset;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
        .item_value{
          font-size:14px;
          color:yellow;
          padding: 5px 0;
        }
        .item_key{
          font-size:8px;
          color:#fff
        }
        .right_arrow_key{
            color:#3a8be4;
            font-size: 10px;
            font-weight: 900;
            padding: 0;
            margin: 0;
        }
        .right_arrow_name{
            color:#fff;
            font-size: 10px;
        }
        .padding_container{
            padding: 0 0 10px 0;
        }
    }

</style>