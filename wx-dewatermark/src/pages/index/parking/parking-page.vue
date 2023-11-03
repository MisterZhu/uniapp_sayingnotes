

<script setup lang="ts">
import type { Analysis } from '@/public/decl-type';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref, watch } from 'vue'

import ParkLessor from "./parking-widget/park-lessor.vue";
import ParkLender from "./parking-widget/park-lender.vue";

let analyModel = ref<Analysis | null>(null)
let items2 = ['出租', '求租']
let items = ['出售', '求购']

var current = ref(0)
let activeColor = '#FF6C00'
let styleType = 'button'

let styles = [{
  value: 'button',
  text: '按钮',
  checked: true
},
{
  value: 'text',
  text: '文字'
}
]

//接收参数
onLoad(options => {
  // @ts-ignore
  analyModel.value = JSON.parse(decodeURIComponent(options.analyModel as string)) as Analysis
  console.log(`analysis onLoad: ${analyModel.value.title}`);

});
watch(
  () => analyModel,
  (newValue) => {
    console.log(`analysis watch video: ${newValue.value?.video}`);
    console.log(`analysis watch images: ${newValue.value?.images}`);
  },
  { immediate: true }
);
const onClickItem = (e: { currentIndex: number; }) => {

  if (current.value != e.currentIndex) {
    current.value = e.currentIndex;
    console.log('current is now', current.value);
  }
}
// 根据analyModel.value.video是否有值来判断展示items或者items2
const itemsToShow = computed(() => {
  return analyModel.value?.video ? items : items2;
})

// 根据analyModel.value.video是否有值来判断展示
const videoToShow = computed(() => {
  return analyModel.value?.video ? true : false;
})
const photosToShow = computed(() => {
  return analyModel.value?.images ? true : false;
})
</script>

<template>
  <view>
    <view class="uni-common-mt">
      <uni-segmented-control :current="current" :values="itemsToShow" :style-type="styleType" :active-color="activeColor"
        @clickItem="onClickItem" />
    </view>
    <view class="content">
      <view class="video-container" v-show="current === 0">
        <ParkLessor :coverSrc="analyModel?.images" />
      </view>
      <view v-show="current === 1">
        <view class="video-container">
          <ParkLender :coverSrc="analyModel?.cover" />
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss">
// .uni-common-mt {
//   padding: 5px 0;
//   position: fixed;
//   z-index: 2;
//   width: 100%;
//   background-color: #fff;
//   /* 可根据需要调整样式，例如颜色、高度、文字大小等 */
// }

// .content {
//   /* #ifndef APP-NVUE */
//   // display: flex;
//   /* #endif */
//   justify-content: center;
//   align-items: center;
//   margin-top: 40px; /* 根据需要调整顶部间距 */
//   height: 300px;
//   text-align: center;
// }

.uni-common-mt {
  padding: 20rpx 140rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #F5F5F5;
}

.content {
  /* #ifndef APP-NVUE */
  // display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
  padding-top: 80rpx; /* 添加额外的上内边距来避免被遮挡 */
  height: 600rpx;
  text-align: center;
  background-color: #F5F5F5;

}

// .uni-common-mt {
//   padding: 5px 110px;
//   position: fixed;
// }

// .content {
//   /* #ifndef APP-NVUE */
//   // display: flex;
//   /* #endif */
//   justify-content: center;
//   align-items: center;
//   height: 300px;
//   text-align: center;
// }

.uni-padding-wrap {
  padding: 10rpx 140rpx 30rpx 140rpx;
}

.video-container {
  margin: 16rpx;
}

.video-container .my-video {
  height: 400rpx;
  border-radius: 10rpx;
}
</style>