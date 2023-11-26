

<script setup lang="ts">
import type { Analysis, CommunityItem } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { reactive, ref, watch } from 'vue';
import communityItem from "./house-widget/community-item.vue";

// let analyAry = ref([] as Analysis[])
let analyAry = reactive({
  data: [] as CommunityItem[]
})
const size = 20
let page = 0

const handleItemClicked = (index: number) => {
  console.log(`Item clicked at index ${index}`);
  analyAry.data.forEach((item, i) => {
    item.selectState = i === index;
  });
  var model = analyAry.data[index];
  // Your logic here
  // uni.navigateTo({
  //   url: '/pages/mine/house/certifi-house'
  // })
  uni.navigateTo({
    url: `/pages/mine/house/certifi-house?communityModel=${encodeURIComponent(JSON.stringify(model))}`
  });
};
// MARK: 解析记录
async function requestAnalyList(callback: () => void) {
  try {
    const res: any = await RequestApi.CommunityList({ "page": page, "size": size })
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
  analyAry.data = [] as CommunityItem[]
  // 2. 重新发起请求
  requestAnalyList(() => uni.stopPullDownRefresh())
});

// 触底的事件
onReachBottom(() => {
  console.log('触底的事件');
  page++
  requestAnalyList(() => { })
});
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
  <view v-show="analyAry.data.length > 0" class="history_item">
    <communityItem v-for="(item, index) in analyAry.data" :key="index" :analy-model="item"
    @item-click="handleItemClicked(index)"
      ></communityItem>
  </view>
  <view v-show="analyAry.data.length <= 0" class="history_item">
    <text class="center-text">暂无解析记录~</text>
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
</style>