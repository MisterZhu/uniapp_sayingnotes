

<script setup lang="ts">
import type { ParkItem } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app';
import { reactive, ref, watch } from 'vue';
// import historyItem from '@/pages/history/history-widget/history-item.vue';
import historyItem from '@/pages/index/parking/parking-widget/widget/part-item.vue';
import { GlobalData, UserInfo } from '@/public/common';

const props = defineProps({
  coverSrc: String
});
// let analyAry = ref([] as Analysis[])
let analyAry = reactive({
  data: [] as ParkItem[]
})
const size = 20
let page = 0
let isCurrent = ref(false);
defineExpose({
  setCurrentPage(res: boolean){
    console.log('---------------qiu zu:' + res);

    isCurrent.value = res
  },
})
// MARK: 解析记录
async function requestPostsList(callback: () => void) {
  console.log('----------111--------');

  try {
    const res: any = await RequestApi.PostsList({ "page": page, "size": size, "posts_type": 2, "community_id": GlobalData.select_community_id  })
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

requestPostsList(() => { })

// 下拉刷新的事件
onPullDownRefresh(() => {
  console.log('下拉刷新的事件');
  // 1. 重置关键数据
  page = 0
  analyAry.data = [] as ParkItem[]
  // 2. 重新发起请求
  requestPostsList(() => uni.stopPullDownRefresh())
});
const handleItemClick = (itemModel: any) => {
  uni.navigateTo({
    url: '/pages/index/parking/parking-page'
  })
}
// 触底的事件
onReachBottom(() => {
  console.log('----------------求租触底的事件');
  page++
  requestPostsList(() => { })
});
// watch(
//   () => analyAry,
//   (newValue) => {
//     analyAry = newValue
//     console.log(`history watch images: ${newValue}`);
//   },
//   { immediate: true }
// );
//接收参数
onShow(() => {
  let that = this
  // 移除之前的事件监听器
  uni.$off('isRenterRefresh');
  uni.$on('isRenterRefresh', function (data) {
    console.log('2监听到事件来自返回的参数：' + data);
    // TODO 下面执行刷新的方法
    if (data === 1) {
      console.log('2 requestPostsList' + data);

      requestPostsList(() => {
        // TODO 下面执行刷新的方法
      });
    }
  })
  // var pages = getCurrentPages(); //获取所有页面的数组对象
  // var currPage = pages[pages.length - 1];
  // let url = currPage.route;
  // console.log('---------------求租页面监听 url = ' + url);
});
watch(
  () => props.coverSrc,
  (newValue) => {
    console.log(`title watch coverSrc: ${newValue}`);
  },
  { immediate: true }
);
</script>

<template>
  <view v-show="analyAry.data.length > 0" class="history_item">
    <historyItem v-for="(item, index) in analyAry.data" :key="index" :analy-model="item"></historyItem>
  </view>
  <view v-show="analyAry.data.length <= 0" class="history_item">
    <text class="center-text">暂无求租信息\n快去发布吧~</text>
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