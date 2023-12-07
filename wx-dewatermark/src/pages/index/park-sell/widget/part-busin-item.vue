  
<script setup lang="ts">
import type { ParkItem } from '@/public/decl-type';
import type { PropType } from 'vue';
import { common_url , timeDis} from '@/public/common';
import { placeImgWithType } from "@/utils/string-utils";


const props = defineProps({
  analyModel: {
    type: Object as PropType<ParkItem>,
    required: true,
  },
});
const handleItemClick = () => {
  // Emit the custom 'itemClick' event and pass 'analyModel' as payload
  console.log(`Item clicked: ${props.analyModel}`);

  // Assuming 'uni' is a valid object that can call 'navigateTo'
  // uni.navigateTo({
  //   url: '/pages/index/parking/parking-detail-page',
  // });
  uni.navigateTo({
    url: `/pages/index/parking/parking-detail-page?parkModel=${encodeURIComponent(JSON.stringify(props.analyModel))}`
  });
};
const generateRichTextContent = (annualRent: string) => {
  // 从 annualRent 中分离数字和单位
  const matchResult = annualRent.match(/(\d+(?:\.\d+)?)([^\d]+)/);
  if (matchResult) {
    const [amount, unit] = matchResult.slice(1);

    // 使用分隔后的数据构建 richTextContent
    return `<div style="color: red;"><span style="font-weight: 500; font-size: 20px;">${amount}</span><span style="font-size: 12px;">${unit}</span></div>`;
  } else {
    // 如果没有匹配结果，可以选择返回默认值或者空字符串
    return '';
  }
};
const imgError = () =>{
  if(props.analyModel.posts_type === 3){
    props.analyModel.img_url = common_url.home_parking_chushou;
  }else if (props.analyModel.posts_type === 4){
    props.analyModel.img_url = common_url.home_parking_qiugou;
  }else if (props.analyModel.posts_type === 5){
    props.analyModel.img_url = common_url.home_used_icon;
  }
}
</script>

<template>
  <view class="component-wrapper" @click="handleItemClick">
    <view class="left-custom-view">
      <image class="left-image" :src="analyModel.img_url ? analyModel.img_url : placeImgWithType(analyModel.posts_type)"
      @error="imgError" mode="aspectFill"></image>
    </view>
    <view class="right-custom-view">
      <view class="top-content">
        <text class="left-text">{{ props.analyModel.title }}</text>
        <view class="right-custom-view-image">
          <image class="right-image"
            :src="analyModel.posts_type === 4 ? common_url.home_park_buy_icon : common_url.home_park_sell_icon"
            mode="aspectFill"></image>
        </view>
      </view>
      <view class="bottom-content">
        <!-- 下侧内容 -->
        <view class="custom-view">
          <rich-text :nodes="generateRichTextContent(analyModel.annual_rent)"></rich-text>
        </view>
        <view class="custom-view">
          <!-- 根据 negotiable 显示文本 -->
          <text v-if="analyModel.negotiable" class="left-text2">可小刀</text>

          <!-- 展示CreatedAt，使用 formatDate 方法转译 -->
          <text class="right-text">{{ timeDis.formatDate(analyModel.CreatedAt) }}</text>
        </view>
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

// .left-text {
//   flex: 1;
//   /* 自动占用剩余空间 */
//   font-size: 12px;
//   color: #333333;
//   white-space: nowrap;
//   overflow: hidden;
//   -webkit-line-clamp: 2;
//   /* 设置最大显示行数 */
//   -webkit-box-orient: vertical;
//   word-break: break-all; /* 可以让文本根据需要自动换行 */

// }
.left-text {
  // 显示两行，超过的省略号
  font-size: 16px;
  color: #333333;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* 添加左对齐样式 */
  text-align: left;
}

.right-custom-view-image {
  width: 66rpx;
  height: 66rpx;
  margin: 5px 10px 10px 10px;
}

.right-image {
  width: 33px;
  height: 33px;
}

// .bottom-content {
//   display: flex;
//   // flex-direction: column-reverse;
//   /* 垂直反向排列 */
//   margin-bottom: 10px;
// }
.bottom-content {
  display: flex;
  // justify-content: flex-start; /* 将子元素靠右对齐 */
  align-items: flex-start;
  /* 将子元素靠下对齐 */
  flex-direction: column;
  /* 设置子元素从上到下排列 */
  margin-bottom: 0px;
}


.custom-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-right: 0px;
  width: calc(100vw - 288rpx);

}

.left-text1 {
  /* 样式设置，如字体大小、颜色等 */
  color: #5CC289;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(92, 194, 137, 0.2);
  /* 背景色，透明度 0.2 */
  border-radius: 3px;
  /* 圆角 5px */
  padding: 2px 3px;
  /* 内边距 5px */
}

.left-text2 {
  /* 样式设置，如字体大小、颜色等 */
  color: #5CC289;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(92, 194, 137, 0.2);
  /* 背景色，透明度 0.2 */
  border-radius: 3px;
  /* 圆角 5px */
  padding: 2px 3px;
  /* 内边距 5px */
  margin-left: 5px;
}

.left-text3 {
  /* 样式设置，如字体大小、颜色等 */
  color: #999999;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(153, 153, 153, 0.2);
  /* 背景色，透明度 0.2 */
  border-radius: 3px;
  /* 圆角 5px */
  padding: 2px 3px;
  /* 内边距 5px */
  margin-left: 5px;

}

.right-text {
  flex: 1;

  /* 样式设置，如字体大小、颜色等 */
  color: #475467;
  font-size: 12px;
  margin-right: 10px;
  text-align: right;
  /* 文本右对齐 */

}
</style>
  