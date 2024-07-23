<script setup lang="ts">
import type { ParkItem } from '@/public/decl-type';
import type { PropType } from 'vue';
import { common_url, timeDis } from '@/public/common';
import { shopPlaceImg } from "@/utils/string-utils";

const props = defineProps({
  analyModel: {
    type: Object as PropType<ParkItem>,
    required: true,
  },
});

const handleItemClick = () => {
  console.log(`Item clicked: ${props.analyModel}`);
  uni.redirectTo({
    url: `/pages/home/edit-page?parkModel=${encodeURIComponent(JSON.stringify(props.analyModel))}`
  });
};

const imgError = () => {
  if (props.analyModel.posts_type === 1) {
    props.analyModel.img_url = common_url.home_shop_jiazheng;
  } else if (props.analyModel.posts_type === 2) {
    props.analyModel.img_url = common_url.home_shop_zhuangxiu;
  } else if (props.analyModel.posts_type === 3) {
    props.analyModel.img_url = common_url.home_shop_huishou;
  }
};
const handleTextClick = () => {
  console.log('展开按钮点击');
};
const handleIconClick = (iconType: number) => {
  console.log(`Icon clicked: ${iconType}`);
  // 根据 iconType 处理不同的逻辑
  // ...
  switch (iconType) {
        case 1://删除
            
            break;
        case 2://复制
            
            break;
        default://分享
            break;
    }
};
</script>

<template>
  <view class="component-wrapper" @click="handleItemClick">
    <!-- 第一排：row布局 -->
    <view class="top-row">
      <image class="top-icon" :src="analyModel.img_url ? analyModel.img_url : shopPlaceImg(analyModel.posts_type)" @error="imgError" mode="aspectFill"></image>
      <text class="top-title">{{ props.analyModel.title }}</text>
    </view>

    <!-- 第二排：row布局 -->
    <view class="bottom-row">
      <view class="left-vertical-line"></view>
      <view class="right-column">
        <text class="right-address">{{ props.analyModel.address }}</text>
        <!-- <text class="right-text-button" @click.stop="handleTextClick">展开</text> -->
        <view class="right-row">
          <text class="right-date">{{ timeDis.formatDate(analyModel.CreatedAt) }}</text>
          <view class="icon-buttons">
            <image class="icon" src="https://qiniu.aimissu.top/notes/menu_icon.png" @click="handleIconClick(1)"></image>
            <image class="icon" src="https://qiniu.aimissu.top/notes/menu_icon.png" @click="handleIconClick(2)"></image>
            <image class="icon" src="https://qiniu.aimissu.top/notes/menu_icon.png" @click="handleIconClick(3)"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.component-wrapper {
  margin: 20rpx 20rpx;
  // border-radius: 5px;
  background-color: $uni-color-fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // padding: 20rpx;
}

.top-row {
  display: flex;
  align-items: center;
  padding-top: 15rpx;
  padding-bottom: 15rpx;
  padding-left: 10rpx;
  padding-right: 10rpx;

}

.top-icon {
  width: 52rpx;
  height: 52rpx;
  margin-right: 20rpx;
}

.top-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #000;
}

.bottom-row {
  display: flex;
  align-items: flex-start;
}

.left-vertical-line {
  width: 2rpx;
  background-color: #999;
  margin-right: 35rpx;
  margin-left: 35rpx;
  align-self: stretch; // 使竖线填充父元素的高度
}

.right-column {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 92rpx); // 设置宽度为屏幕宽度减去 92rpx
  margin-left: 10rpx;

}

.right-address {
  font-size: 30rpx;
  color: #111;
  margin-bottom: 20rpx;

  text-align: left; /* 确保文本居左 */
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.right-text-button {
  font-size: 30rpx;
  color: #242b7c;
  margin-bottom: 10rpx;
  // padding: 20rpx;
  text-align: left; // 设置居左对齐
}
.right-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15rpx;

}

.right-date {
  font-size: 28rpx;
  color: #999;
}

.icon-buttons {
  display: flex;
  align-items: center;
  margin-right: 15rpx;

}

.icon {
  width: 52rpx;
  height: 52rpx;
  padding-left: 10rpx;
}
</style>
