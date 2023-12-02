<template>
  <div class="content_container">
    <!--上部 -->
    <el-row :gutter="20" type="flex">
      <el-col :span="6">
        <el-row style="height: 100%">
          <list-card
            :cardName="item.cardName"
            :cardData="item.data"
            :cardbg="item.bk"
            v-for="(item, index) in cardList"
            :key="index"
            :wrap="item.wrap"
            :propsWidth="item.width"
            :props-height="item.height"
          >
            <template v-slot:rate>
              <el-row :gutter="20" style="padding: 10px" v-if="item.rate">
                <el-col
                  :span="24 / item.slotData.length"
                  :key="p"
                  v-for="(i, p) in item.slotData"
                >
                  <count-rate :data="i"></count-rate>
                </el-col>
              </el-row>
            </template>
          </list-card>
        </el-row>
      </el-col>
      <el-col :span="12">
        <list-card :cardName="cardMap.cardName" :propsHeight="cardMap.height">
          <template v-slot:rate>
            <public-select @optionChange="optionChange"></public-select>
            <city-map></city-map>
          </template>
        </list-card>
      </el-col>
      <el-col :span="6">
        <div class="count-resource q1" style="height: 100%">
          <div class="com-screen-content2" style="height: 100%">
            <list-card
              style="height: calc(25% - 0.1rem)"
              :cardName="item.cardName"
              :cardData="item.data"
              :cardbg="item.bk"
              v-for="(item, index) in cardListRight"
              :key="index"
              :wrap="item.wrap"
            ></list-card>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 底部 -->
    <el-row :gutter="20" type="flex">
      <el-col
        :span="item.span"
        v-for="(item, index) in cardListMid"
        :key="index"
      >
        <list-card
          :cardName="item.cardName"
          :cardData="item.data"
          :cardbg="item.bk"
          :key="index"
          :wrap="item.wrap"
          :props-height="item.height"
        >
          <template v-slot:circleCharts>
            <circle-charts v-if="item.circlecharts"></circle-charts>
          </template>
        </list-card>
        <div style="clear: both"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// import ScrollTable from "@/components/scrollTable/index.vue";
import "./home.scss";
import { reactive, ref, onMounted } from "vue";
import { indexData } from "../../network/api.js";
const optionChange = (option) => {
  console.log("optionChange   =====", option);
  codeNo.value = option;
};
const codeNo = ref(null);
const cardMap = ref({
  cardName: "业务地图",
  height: "calc(100% - 20px)",
});
const cardList = ref([
  {
    cardName: "行政立法",
    height: "auto",
    data: [
      {
        icon: "src/assets/images/greenbook.png",
        key: "现行有效",
        value: 1170,
      },
      {
        icon: "src/assets/images/yellowarrow.png",
        key: "本年度制定(修改)",
        value: 1170,
      },
      {
        icon: "src/assets/images/greycancel.png",
        key: "本年度废止",
        value: 1170,
      },
    ],
  },
  {
    cardName: "行政复议",
    height: "auto",
    slot: true,
    slotNum: 2,
    rate: true,
    slotData: [
      {
        total: 1170,
        name: "复议总数",
        color: "yellow",
        data: [
          {
            total: 756,
            name: "已审结",
            rate: "64.7",
            color: "#4892fb",
            index: 1,
          },
          {
            total: 414,
            name: "审理中",
            rate: "35.3",
            color: "#7dfbb2",
          },
        ],
      },
      {
        total: 1170,
        name: "应诉总数",
        color: "yellow",
        data: [
          {
            total: 756,
            name: "胜诉",
            rate: "64.7",
            color: "#fe6d74",
            index: 1,
          },
          {
            total: 414,
            name: "败诉",
            rate: "35.3",
            color: "#56d7f9",
          },
        ],
      },
    ],
    data: [
      {
        key: "纠错率",
        value: 97,
        type: "progress",
      },
      {
        icon: "src/assets/images/yellowarrow.png",
        key: "行政争议调处总数",
        value: 943,
      },
      {
        // icon: "src/assets/images/greycancel.png",
        key: "调解率",
        value: 80,
        type: "progress",
      },
    ],
  },
  {
    cardName: "行政执法监督",
    width: "50%",
    height: "auto",
    rate: true,
    slot: true,
    slotNum: 1,
    slotData: [
      {
        total: "",
        name: "",
        color: "yellow",
        data: [
          {
            total: 756,
            name: "已持有行政执法员证件数",
            rate: "64.7",
            color: "#4892fb",
            index: 1,
          },
          {
            total: 414,
            name: "审理中",
            rate: "35.3",
            color: "#7dfbb2",
          },
        ],
      },
    ],
    // data: [],
  },
  {
    cardName: "行政规范性文件",
    width: "50%",
    height: "auto",
    slot: true,
    slotData: [],
    rate: true,
    data: [
      {
        icon: "src/assets/images/greenbook.png",
        key: "现行有效",
        value: 1170,
      },
    ],
  },
]);
const cardListRight = ref([
  {
    cardName: "公共法律服务平台数据",
    data: [
      {
        icon: "src/assets/images/tele.png",
        key: "热线",
        value: 1170,
      },
      {
        icon: "src/assets/images/internet.png",
        key: "网络",
        value: 1170,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 1170,
      },
    ],
  },
  {
    cardName: "律师业务",
    data: [
      {
        icon: "src/assets/images/manager.png",
        key: "律师",
        value: 1170,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "律所",
        value: 1170,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 1170,
      },
    ],
  },
  {
    cardName: "公证办理",
    data: [
      {
        icon: "src/assets/images/manager.png",
        key: "公证员",
        value: 1170,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "公证所",
        value: 1170,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 1170,
      },
    ],
  },
  {
    cardName: "司法鉴定",
    data: [
      {
        icon: "src/assets/images/manager.png",
        key: "司法鉴定人",
        value: 1170,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "司法鉴定机构",
        value: 1170,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 1170,
      },
    ],
  },
]);

const cardListMid = ref([
  {
    span: 6,
    height: "calc(100% - .11rem)",
    cardName: "人民调解案件总数",
    slot: true,
    circlecharts: true,
    cardData: [],
  },
  {
    span: 3,
    height: "calc(100% - .11rem)",
    cardName: "仲裁服务",
    slot: true,
    circlecharts: true,
    cardData: [],
  },
  {
    span: 3,
    height: "calc(100% - .11rem)",
    cardName: "法律援助案件",
    slot: true,
    circlecharts: true,
    cardData: [],
  },
  {
    cardName: "基层工作",
    wrap: true,
    span: 6,
    data: [
      {
        icon: "src/assets/images/bluepeoplebook.png",
        key: "在册人数",
        value: 1170,
      },
      {
        icon: "src/assets/images/canladerpeople.png",
        key: "缓刑",
        value: 1170,
      },
      {
        icon: "src/assets/images/zan.png",
        key: "暂予监外执行",
        value: 1170,
      },
      {
        icon: "src/assets/images/prisonpeople.png",
        key: "管制",
        value: 1170,
      },
      {
        icon: "src/assets/images/canladerpeople.png",
        key: "假释",
        value: 1170,
      },
    ],
  },
  {
    cardName: "社区矫正",
    wrap: true,
    span: 6,
    data: [
      {
        icon: "src/assets/images/bluepeoplebook.png",
        key: "在册人数",
        value: 1170,
      },
      {
        icon: "src/assets/images/canladerpeople.png",
        key: "缓刑",
        value: 1170,
      },
      {
        icon: "src/assets/images/zan.png",
        key: "暂予监外执行",
        value: 1170,
      },
      {
        icon: "src/assets/images/prisonpeople.png",
        key: "管制",
        value: 1170,
      },
      {
        icon: "src/assets/images/canladerpeople.png",
        key: "假释",
        value: 1170,
      },
    ],
  },
]);

onMounted(async () => {
  const data = await indexData("610017");
  console.log("407 home----", data);
});
</script>
