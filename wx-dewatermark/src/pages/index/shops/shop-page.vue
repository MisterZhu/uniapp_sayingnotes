

<script setup lang="ts">
import type { ParkItem } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app';
import { reactive, ref, watch } from 'vue';
import shopItem from '@/pages/index/shops/widget/shop-item.vue';
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
//接收参数
onShow(() => {
  let that = this
  // 移除之前的事件监听器
  uni.$off('isUsedRefresh');
  uni.$on('isUsedRefresh', function (data) {
    console.log('3监听到事件来自返回的参数：' + data);
    if (data === 1) {
      console.log('3 isUsedRefresh' + data);

      requestPostsList(() => {
        // TODO 下面执行刷新的方法
      });
    }
    // TODO 下面执行刷新的方法
  })
});
// MARK: 解析记录
async function requestPostsList(callback: () => void) {
  console.log('----------222--------');

  try {
    const res: any = await RequestApi.ShopsList({ "page": page, "size": size, "posts_type": 1,})
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
const handleButtonClick = () => {
  // Assuming 'uni' is a valid object that can call 'navigateTo'
  uni.navigateTo({
    url: '/pages/index/used/publish-used',
  });
};

// 触底的事件
onReachBottom(() => {
  console.log('触底的事件');
  page++
  requestPostsList(() => { })
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
    <shopItem v-for="(item, index) in analyAry.data" :key="index" :analy-model="item"></shopItem>
  </view>
  <view v-show="analyAry.data.length <= 0" class="history_item">
    <text class="center-text">暂无服务商家~</text>
  </view>
  <view class="float-button" @click="handleButtonClick">
    <image class="icon" src="/static/home/home_used_publish3.png" />
    <text class="text">发布</text>
  </view>
</template>

<style lang="scss" scoped>
.center-text {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $uni-color-666;
  text-align: center;
}

.float-button {
  position: fixed;
  bottom: 70px;
  /* 距离底部的距离 */
  right: 30px;
  /* 距离右侧的距离 */
  background-color: #4CAF50;
  /* 按钮背景颜色 */
  color: #fff;
  /* 按钮文字颜色 */
  // padding: 20rpx;
  // margin: 10rpx;
  /* 按钮内边距 */
  border-radius: 120rpx;
  flex-direction: column; /* 设置为垂直方向排列 */
  justify-content: center; /* 设置垂直方向居中 */

  width: 120rpx; /* 设置宽度 */
  height: 120rpx; /* 设置高度 */
  /* 圆角 */
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 5rpx 10rpx rgba(0, 0, 0, 0.9);

}

.icon {
  width: 40rpx;
  /* 图标宽度 */
  height: 40rpx;
  /* 图标高度 */
  margin-bottom: 5rpx;
  /* 图标和文字之间的间距 */
}

.text {
  font-size: 14px;
  /* 文字大小 */
}</style>