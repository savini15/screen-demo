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
              <el-row v-if="item.rate">
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
            <public-select></public-select>
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
            <circle-charts
              v-if="item.circlecharts"
              :chartData="item.chartData"
            ></circle-charts>
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
import { reactive, ref, onMounted, computed, watch } from "vue";
import { indexData } from "../../network/api.js";
import mappingKeys from "@/utils/apiData/mappingKeys.js";
import { useStore } from "vuex";
const store = useStore();
console.log("store-----", store);
const areaCode = computed(() => {
  //返回的是ref对象
  return store.state.areaCode;
});

watch(areaCode, (newValue, oldValue) => {
  console.log("区域选择 修改了", newValue, oldValue);
  refresh(newValue);
});
import * as _ from "lodash";

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
        value: 0,
      },
      {
        icon: "src/assets/images/yellowarrow.png",
        key: "本年度制定(修改)",
        value: 0,
      },
      {
        icon: "src/assets/images/greycancel.png",
        key: "本年度废止",
        value: 0,
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
        value: 0,
        name: "复议总数",
        color: "yellow",
        data: [
          {
            total: 0,
            name: "已审结",
            rate: "0",
            color: "#4892fb",
            index: 1,
          },
          {
            total: 0,
            name: "审理中",
            rate: "0",
            color: "#7dfbb2",
          },
        ],
      },
      {
        value: 0,
        name: "应诉总数",
        color: "yellow",
        data: [
          {
            total: 0,
            name: "胜诉",
            rate: "0",
            color: "#fe6d74",
            index: 1,
          },
          {
            total: 0,
            name: "败诉",
            rate: "0",
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
            total: 0,
            name: "已持有行政执法员证件数",
            rate: "0",
            color: "#4892fb",
            index: 1,
          },
          {
            total: 0,
            name: "审理中",
            rate: "0",
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
        value: 0,
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
        value: 0,
      },
      {
        icon: "src/assets/images/internet.png",
        key: "网络",
        value: 0,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 0,
      },
    ],
  },
  {
    cardName: "律师业务",
    data: [
      {
        icon: "src/assets/images/manager.png",
        key: "律师",
        value: 0,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "律所",
        value: 0,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 0,
      },
    ],
  },
  {
    cardName: "公证办理",
    data: [
      {
        icon: "src/assets/images/manager.png",
        key: "公证员",
        value: 0,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "公证所",
        value: 0,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 0,
      },
    ],
  },
  {
    cardName: "司法鉴定",
    data: [
      {
        icon: "src/assets/images/manager.png",
        key: "司法鉴定人",
        value: 0,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "司法鉴定机构",
        value: 0,
      },
      {
        icon: "src/assets/images/document.png",
        key: "本年度案件",
        value: 0,
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
    chartData: [],
  },
  {
    span: 3,
    height: "calc(100% - .11rem)",
    cardName: "仲裁服务",
    slot: true,
    circlecharts: true,
    cardData: [],
    chartData: [],
  },
  {
    span: 3,
    height: "calc(100% - .1rem)",
    cardName: "法律援助案件",
    slot: true,
    circlecharts: true,
    cardData: [],
    chartData: [],
  },
  {
    cardName: "基础工作",
    wrap: true,
    span: 6,
    data: [
      {
        icon: "src/assets/images/gril.png",
        key: "司法所工作人员",
        value: 0,
      },
      {
        icon: "src/assets/images/manager.png",
        key: "基层法律服务工作者",
        value: 0,
      },
      {
        icon: "src/assets/images/shakehands.png",
        key: "人民调解员",
        value: 0,
      },
      {
        icon: "src/assets/images/housestair.png",
        key: "司法所",
        value: 0,
      },
      {
        icon: "src/assets/images/buildings.png",
        key: "基层法律服务所",
        value: 0,
      },
      {
        icon: "src/assets/images/peopledesk.png",
        key: "人民调解组织",
        value: 0,
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
        value: 0,
      },
      {
        icon: "src/assets/images/huanxing.png",
        key: "缓刑",
        value: 0,
      },
      {
        icon: "src/assets/images/zan.png",
        key: "暂予监外执行",
        value: 0,
      },
      {
        icon: "src/assets/images/prisonpeople.png",
        key: "管制",
        value: 0,
      },
      {
        icon: "src/assets/images/jiashi.png",
        key: "假释",
        value: 0,
      },
    ],
  },
]);
const refresh = async (code) => {
  const data = await indexData(code || "610000");
  createData(cardList, data);
  createData(cardListMid, data);
  createData(cardListRight, data);
};
onMounted(async () => {
  await refresh(null);
});
const createData = (data, res) => {
  _.forEach(data.value, (i, key) => {
    const obj = mappingKeys[i.cardName];
    const list = res[i.cardName];
    if (i.circlecharts) {
      i.chartData = [];
      const pies = _.keys(obj);
      _.forEach(pies, (p) => {
        i.chartData.push({ name: obj[p], value: list[p] || 0 });
      });

      console.log("440====", i);
    }
    _.forEach(i.data, (item) => {
      const mapkey = _.findKey(obj, (o) => o == item.key);
      item.value = list[mapkey] || 0;
    });
    if (i.slot) {
      _.forEach(i.slotData, (item) => {
        const totalName = _.findKey(obj, (o) => o == item.name);
        item.total = list[totalName] || 0;
        _.forEach(item.data, (s) => {
          const mapkey = _.findKey(obj, (o) => o == scrollTo.name);
          s.total = list[mapkey] || 0;
          s.rate = item.total ? (s.total / item.total).toFixed(2) : 0;
        });
      });
    }
  });
};
</script>
