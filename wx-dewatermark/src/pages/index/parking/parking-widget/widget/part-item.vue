  
<script setup lang="ts">
import type { ParkItem } from '@/public/decl-type';
import type { PropType } from 'vue';


const props = defineProps({
  analyModel: {
    type: Object as PropType<ParkItem>,
    required: true,
  },
});


</script>

<template>
  <view class="component-wrapper">
    <view class="left-custom-view">
      <image class="left-image" src="/static/home/home_head_bg.png" mode="aspectFill"></image>
    </view>
    <view class="right-custom-view">
      <view class="top-content">
        <text class="left-text">2号楼车负一层车位便宜出租</text>
        <view class="right-custom-view-image">
          <image class="right-image" src="/static/home/home_renter_icon.png" mode="aspectFill"></image>
        </view>
      </view>
      <view class="bottom-content">
        <!-- 下侧内容 -->
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.component-wrapper {
  margin: 20rpx 24rpx;
  height: 240rpx;
  border-radius: 5px;
  background-color: $uni-color-fff;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.left-custom-view {
  width: 240rpx;
  height: 240rpx;
}
.left-image {
  width: 200rpx;
  height: 200rpx;
  margin: 20rpx;
  border-radius: 16rpx;
}

.right-custom-view {
  // flex: 1;
  width: calc(100vw - 288rpx);
  height: 200rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-top: 10px;
}

.left-text {
  flex: 1;
  /* 自动占用剩余空间 */
  font-size: 16px;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* 设置最大显示行数 */
  -webkit-box-orient: vertical;
}
.right-custom-view-image{
  width: 66rpx;
  height: 66rpx;
  margin: 10px;
}
.right-image {
  width: 33px;
  height: 33px;
}

.bottom-content {
  /* 根据需要设置样式 */
}</style>
  