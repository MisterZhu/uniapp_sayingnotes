

<script setup lang="ts">
import type { Analysis } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { reactive, ref, watch } from 'vue';
// import historyItem from '@/pages/history/history-widget/history-item.vue';
import houseItem from "./house-widget/house-item.vue";
// let analyAry = ref([] as Analysis[])
let analyAry = reactive({
  data: [] as Analysis[]
})
const size = 3
let page = 0
// MARK: 解析记录
async function requestAnalyList(callback: () => void) {
  try {
    const res: any = await RequestApi.AnalyHistory({ "page": page, "size": size })
    if (typeof callback === 'function') {
      callback();
    }
    if (res.code === 200) {
      if (page === 0) {
        analyAry.data = res.data
        console.log('0')

      } else {
        console.log('>0')

        analyAry.data = [...analyAry.data, ...res.data]
      }
    } else {
      uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
    }
  } catch (error) {
    callback && callback()
    console.error(error)
    uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
  }
}

requestAnalyList(() => { })

// 下拉刷新的事件
onPullDownRefresh(() => {
  console.log('下拉刷新的事件');
  // 1. 重置关键数据
  page = 0
  analyAry.data = [] as Analysis[]
  // 2. 重新发起请求
  requestAnalyList(() => uni.stopPullDownRefresh())
});
const handleItemClick = (itemModel: any) => {
  uni.navigateTo({
    url: '/pages/mine/house/certifi-house'
  })
}
// 触底的事件
// onReachBottom(() => {
//   console.log('触底的事件');
//   page++
//   requestAnalyList(() => { })
// });
watch(
  () => analyAry,
  (newValue) => {
    analyAry = newValue
    console.log(`history watch images: ${newValue}`);
  },
  { immediate: true }
);
</script>

<template>
  <view class="container">
    <view class="divider"></view>

    <view class="list-page">
      <view v-show="analyAry.data.length > 0" class="history_item">
        <houseItem v-for="(item, index) in analyAry.data" :key="index" :analy-model="item"></houseItem>
      </view>
    </view>
    <view v-show="analyAry.data.length <= 0" class="history_item">
      <text class="center-text">暂无解析记录~</text>
    </view>
    <!-- 添加按钮 -->
    <view class="button-container">
      <button class="custom-button" @click="handleItemClick">新增</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.center-text {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $uni-color-666;
}

.list-page {

  border-radius: 5px;
  /* 四边圆角为5像素 */
  // padding: 15px; /* 上、左、右边距为15像素 */
  margin-left: 15px;
  margin-right: 15px;

  /* 自适应高度，至少占满整个视口高度 */
  background-color: #fff;
  // height: 80%;
}

.container {
  background-color: $uni-color-f5f;
  height: 100vh;
  /* 分割线的高度 */

}

.divider {
  width: 100%;
  /* 横向分割线 */
  height: 15px;
  /* 分割线的高度 */
  background-color: $uni-color-f5f;
}

// .button-container {
//   margin-top: 115px;
//   margin-left: 15%;
//   width: 70%;
//   height: 35px;
//   line-height: 35px;
//   text-align: center;
//   color: black;
//   background-color: orange;
//   border-radius: 5px;
//   font-size: 14px;

// }
.button-container {
  position: absolute;
  bottom: 40px;
  left: 50px;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-button {
  height: 54px;
  background-color: $uni-theme-btn-color;
  color: #fff;
  border-radius: 10px;
  text-align: center;
  line-height: 54px;
  width: 100%;
  cursor: pointer;
}</style>