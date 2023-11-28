<template>
  <div class="topRec_List">
    <dl>
      <dd>资源名称</dd>
      <dd>调用方</dd>
      <dd>调用时间</dd>
    </dl>
    <div class="maquee" @mouseenter="closeScroll" @mouseleave="openScroll">
      <ul ref="ul">
        <li>
          <div>审计局主要职责</div>
          <div>审计局</div>
          <div>08:20:26</div>
        </li>
        <li>
          <div>残联主要职责</div>
          <div>残联</div>
          <div>08:20:36</div>
        </li>
        <li>
          <div>委老干部局主要职责</div>
          <div>老干部局</div>
          <div>08:20:46</div>
        </li>
        <li>
          <div>公安局主要职责</div>
          <div>公安局</div>
          <div>08:20:56</div>
        </li>
        <li>
          <div>民政局主要职责</div>
          <div>民政局</div>
          <div>08:21:04</div>
        </li>
        <li>
          <div>交通运输局主要职责</div>
          <div>交通运输局</div>
          <div>08:21:07</div>
        </li>
        <li>
          <div>审计局主要职责</div>
          <div>审计局</div>
          <div>08:20:26</div>
        </li>
        <li>
          <div>残联主要职责</div>
          <div>残联</div>
          <div>08:20:36</div>
        </li>
        <li>
          <div>委老干部局主要职责</div>
          <div>老干部局</div>
          <div>08:20:46</div>
        </li>
        <li>
          <div>公安局主要职责</div>
          <div>公安局</div>
          <div>08:20:56</div>
        </li>
        <li>
          <div>民政局主要职责</div>
          <div>民政局</div>
          <div>08:21:04</div>
        </li>
        <li>
          <div>交通运输局主要职责</div>
          <div>交通运输局</div>
          <div>08:21:07</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const ul = ref<HTMLDivElement | null>(null);
const oul = () => ul.value as HTMLDivElement;
let timer = null;
// 开启滚动
const openScroll = () => {
  timer = setInterval(() => {
    if (Math.ceil(oul().scrollTop + oul().clientHeight) >= oul().scrollHeight) {
      oul().scrollTop=0;
    } else {
      oul().scrollTop=oul().scrollTop + 1;
    }
  }, 30);
};
// 关闭滚动
const closeScroll = () => {
  clearInterval(timer);
  timer = null;
};

onMounted(() => {
  openScroll();
});
</script>

<style lang="scss" scoped>
.topRec_List {
  dl,
  .maquee {
    width: 90%;
    margin: 0 auto;
    color: #f0ece2;
  }

  dl {
    display: flex;

    dd {
      text-align: left;
      border-bottom: 1px solid #1b96ee;
      color: #1b96ee;
      font-size: 7px;
      height: 20px;
      line-height: 20px;
    }

    dd:nth-child(1) {
      width: 50%;
    }

    dd:nth-child(2) {
      width: 30%;
    }

    dd:nth-child(3) {
      width: 20%;
    }
  }

  .maquee {
    height: 90px;
  }

  ul {
    width: 100%;
    height: 90px;
    overflow-y: scroll;
    overflow-x: hidden;
    // -ms-overflow-style: none;
    // overflow: -moz-scrollbars-none;
    // &::-webkit-scrollbar { width: 0 !important; }
    li {
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: left;
      font-size: 6px;
      color: #76dbd1;
      display: flex;

      div {
        color: #76dbd1;
      }

      div:nth-child(1) {
        width: 50%;
      }

      div:nth-child(2) {
        width: 30%;
      }

      div:nth-child(3) {
        width: 20%;
      }
    }
  }
}

/* 滚动条 */
::-webkit-scrollbar {
  z-index: 50;
  width: 3px;
  height: 3px;
  border: none;
  outline: none;
}
* {
  cursor: pointer;
}
::-webkit-scrollbar-track {
  background-color: rgba(206, 14, 14, 0);
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background-color: #1bb4f9;
  transition: all 0.2s;
  height: 20px;
}

:hover::-webkit-scrollbar-thumb {
  transition: all 0.2s;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to top, #00d9a2, #007af8);
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-corner {
  display: none;
}
</style>
