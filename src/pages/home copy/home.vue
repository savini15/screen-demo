<template>
  <div class="content_container">
    <!--上部 -->
    <el-row :gutter="20" type="flex" style="height:100%">
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
            <template v-slot:circleCharts>
              <circle-charts
                v-if="item.circlecharts"
                :chartData="item.chartData"
              ></circle-charts>
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
              :props-height="item.height"
            >
              <template v-slot:circleCharts>
                <circle-charts
                  v-if="item.circlecharts"
                  :chartData="item.chartData"
                ></circle-charts>
              </template>

              <!-- linecharts -->
              <template v-slot:linecharts>
                <line-charts
                  v-if="item.linecharts"
                  :chartData="item.lineData"
                  :catax="item.catax"
                ></line-charts>
              </template>
            </list-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// import ScrollTable from "@/components/scrollTable/index.vue";
import "./home.scss";
import { reactive, ref, onMounted, computed, watch } from "vue";
import { lawData } from "../../network/api.js";
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
    cardName: "本月服务",
    // height: "auto",
    wrap: true,
    span: 6,
    data: [
      {
        icon: "src/assets/images/shiti.png",
        key: "实体",
        value: 933,
      },
      {
        icon: "src/assets/images/internet.png",
        key: "网络",
        value: 933,
      },
      {
        icon: "src/assets/images/tele.png",
        key: "热线",
        value: 1170,
      },
      {
        icon: "src/assets/images/gongzheng.png",
        key: "公证",
        value: 933,
      },
      {
        icon: "src/assets/images/manager.png",
        key: "律师",
        value: 933,
      },
      {
        icon: "src/assets/images/fayuanan.png",
        key: "法援",
        value: 1170,
      },
    ],
  },
  {
    span: 6,
    // height: "calc(100% - .11rem)",
    height: "auto",
    cardName: "服务数量类型分析",
    slot: true,
    circlecharts: true,
    cardData: [],
    chartData: [],
  },
  {
    span: 6,
    height: "calc(100% - .11rem)",
    // height: "auto",
    cardName: "法律援助案件类型",
    slot: true,
    circlecharts: true,
    cardData: [],
    chartData: [],
  },
]);
const cardListRight = ref([
  {
    span: 6,
    // height: "calc(100% - .11rem)",
    cardName: "法律援助对象",
    slot: true,
    circlecharts: true,
    cardData: [],
    chartData: [],
  },
  {
    span: 6,
    cardName: "法律援助月度分析",
    slot: true,
    linecharts: true,
    lineData: [],
    catax: [],
  },
]);

const cardListMid = [];

const refresh = async (code) => {
  const data = await lawData(code || "610000");
  createData(cardList, data);
  createData(cardListRight, data);
};
onMounted(async () => {
  await refresh(null);
});
const createData = (data, res) => {
  res["本月服务"] = res["服务数量类型分析"] = _.assign(
    res["服务内容"],
    res["服务方式"]
  );

  console.log("res---", res);
  _.forEach(data.value, (i, key) => {
    const obj = mappingKeys[i.cardName];
    const list = res[i.cardName];
    console.log("cardName", i.cardName);
    if (i.circlecharts) {
      i.chartData = [];
      const pies = _.keys(obj);
      _.forEach(pies, (p) => {
        i.chartData.push({ name: obj[p], value: list[p] || 0 });
      });
    }
    //linecharts

    if (i.linecharts && res.qslist && !_.isEmpty(res.qslist)) {
      i.lineData = [];
      const source = _.orderBy(res.qslist);
      const series = _.filter(_.keys(source[0]), (i) => i != "time");
      console.log("series===", series);
      const catax = _.orderBy(_.uniq(_.map(source, "time")));
       i.catax = catax;
      _.forEach(series, (p) => {
        const list = _.map(source, p);
        _.forEach(list, (l) => {
          l = 9 //l ? Number(l) : 0;
        });
        i.lineData.push({
          type: "line",
          stack: "Total",
          name: mappingKeys.qslist[p],
          data: [19,74,60,12,49]//list,
        });
      });
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
