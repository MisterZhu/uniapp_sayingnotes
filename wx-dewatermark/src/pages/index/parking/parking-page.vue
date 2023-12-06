

<script setup lang="ts">
import type { Analysis } from '@/public/decl-type';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { computed, ref, watch } from 'vue'
import { GlobalData, UserInfo } from '@/public/common';

import ParkLessor from "./parking-widget/park-lessor.vue";
import ParkLender from "./parking-widget/park-renter.vue";

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
const horizontal = 'right';
const vertical = 'bottom';
const direction = 'vertical';

const pattern = {
  color: '#7A7E83',
  backgroundColor: '#fff',
  selectedColor: '#007AFF',
  buttonColor: '#007AFF',
  iconColor: '#fff'
};
const content = [{
  iconPath: '/static/home/home_lessor_icon2.png',
  selectedIconPath: '/static/home/home_lessor_icon2.png',
  text: '出租',
  active: false
},
{
  iconPath: '/static/home/home_renter_icon2.png',
  selectedIconPath: '/static/home/home_renter_icon2.png',
  text: '求租',
  active: false
}
]
const chuzu = ref(null);
const qiuzu = ref(null);


const selectItem = (e: any) => {
  const index = e.index;
  console.log(UserInfo.value.state);

  // console.log(`dianji :`, index);
  // uni.showToast({
  //   title: `点击第${index}个宫格`,
  //   icon: 'none'
  // })
  if (UserInfo.value.state === 0) {
    uni.showModal({
      title: '温馨提示',
      content: '您还没有进行房屋认证，为了保证发布信息的真实性，请先去申请房屋认证，通过以后才可以发布信息',
      showCancel: false, // 不展示取消按钮
      confirmText: "去认证", // 确认按钮文字 
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/mine/house/select-community'
          })
        }
      }
    });
  } else if (UserInfo.value.state === 1) {
    uni.showModal({
      title: '温馨提示',
      content: '您的房屋认证申请还未通过审核，您可以联系客服，催促客服快速审核',
      // showCancel: false, // 不展示取消按钮
      cancelText: "取消",
      confirmText: "联系客服", // 确认按钮文字 
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/mine/help-center'
          })
        } else if (res.cancel) {

        }
      }
    });

  } else {
    if (UserInfo.value.default_community_id != GlobalData.select_community_id) {
      uni.showModal({
        title: '温馨提示',
        content: `您当前浏览社区为“${GlobalData.select_community}”，但是您认证的社区为“${UserInfo.value.default_community}”，将跳转到您所认证的社区发布页`,
        showCancel: false, // 不展示取消按钮
        confirmText: "知道了", // 确认按钮文字 
        success: function (res) {
          if (res.confirm) {
            if (index == 0) {
              uni.navigateTo({
                url: '/pages/index/parking/publish-lease'
              })
            } else {
              uni.navigateTo({
                url: '/pages/index/parking/publish-require'
              })
            }
          }
        }
      });
    } else {
      if (index == 0) {
        uni.navigateTo({
          url: '/pages/index/parking/publish-lease'
        })
      } else {
        uni.navigateTo({
          url: '/pages/index/parking/publish-require'
        })
      }
    }
  }

}
const fabClick = () => {
  // uni.showToast({
  //   title: '点击了悬浮按钮',
  //   icon: 'none'
  // })
}
onShow(() => {
  let that = this
  // 移除之前的事件监听器
  uni.$off('isPageRefresh');
  uni.$on('isPageRefresh', function (data) {
    console.log('1监听到事件来自返回的参数：' + data);
    // TODO 下面执行刷新的方法
  })
});
//接收参数
onLoad(options => {
  // @ts-ignore
  // analyModel.value = JSON.parse(decodeURIComponent(options.analyModel as string)) as Analysis
  // console.log(`analysis onLoad: ${analyModel.value.title}`);

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

    // 直接在组件引用上调用 setCurrentPage 方法
    if (current.value === 0) {
      if (qiuzu.value !== null) {
        (qiuzu.value as { setCurrentPage: (arg: boolean) => void }).setCurrentPage(true);
        // qiuzu.value.setCurrentPage(true);
      }
      if (chuzu.value !== null) {
        (chuzu.value as { setCurrentPage: (arg: boolean) => void }).setCurrentPage(false);
      }

    } else if (current.value === 1) {
      if (chuzu.value !== null) {
        (chuzu.value as { setCurrentPage: (arg: boolean) => void }).setCurrentPage(true);
      }
      if (qiuzu.value !== null) {
        (qiuzu.value as { setCurrentPage: (arg: boolean) => void }).setCurrentPage(false);
      }

    }

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
        <ParkLessor ref="chuzu" :coverSrc="analyModel?.images" />
      </view>
      <view v-show="current === 1">
        <view class="video-container">
          <ParkLender ref="qiuzu" :coverSrc="analyModel?.cover" />
        </view>
      </view>
    </view>
  </view>
  <uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
    @trigger="selectItem" @fabClick="fabClick"></uni-fab>
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
  padding-top: 100rpx;
  /* 添加额外的上内边距来避免被遮挡 */
  text-align: center;
  background-color: #F5F5F5;

}

// .video-container {
//   margin: 16rpx;
// }
</style>