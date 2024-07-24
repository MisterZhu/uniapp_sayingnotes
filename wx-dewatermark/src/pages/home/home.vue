<template>
  <view :class="['home', hasAnalyAryData ? 'home-with-data' : 'home-no-data']">
    <HomeNavbar :backgroundColor="navbarBackgroundColor" :leftIcon="common_url.menu_icon"
      @leftIconClick="handleLeftIconClick">
    </HomeNavbar>

    <!-- 展示HomeScroll组件 -->
    <HomeScroll v-if="hasAnalyAryData" />

    <!-- 添加一个悬浮按钮 -->
    <view class="custom-button" @click="onButtonTap">
      <image class="button-icon" :src="common_url.voice_icon"></image>
      <text class="button-text">记录一下</text>
    </view>
    <!-- 弹出框 -->
    <BottomPopup />

  </view>
</template>

<script setup>
import { watch, ref, onMounted, computed } from 'vue';
import HomeNavbar from '../common/home-navbar.vue';
import BottomPopup from '../common/bottom-popup.vue';
import HomeScroll from '../common/home-scroll.vue';

import { common_key, GlobalData, UserInfo } from '@/public/common';
import { RequestApi } from "@/public/request";
import { usePopupStore } from "@/stores/popup-store";
import { onShow, onLoad } from '@dcloudio/uni-app';
import { useGlobalStore } from '../../stores/global'
import { common_url, timeDis } from '@/public/common';

const popupStore = usePopupStore();
const inviter_openid = ref < string > ('')
var topIconDistance = ref < number > (87)
const isRefreshing = ref(false);

const contentStyle = computed(() => ({
  width: '100%',
  height: `calc(100vh - ${topIconDistance.value}px)`,
  marginTop: `${topIconDistance.value}px`,
  backgroundColor: '#FFFFFF'
}));

const handleLeftIconClick = () => {
  console.log('Left icon clicked');
  uni.navigateTo({
    url: '/pages/setting/setting'
  });
};
// MARK: 注册&获取用户信息
async function requestUserInfoWithCode(code) {
  const res = await RequestApi.UserLogin({ "code": code, "inviter_id": inviter_openid })
  console.log(res)
  console.log("------set local_token = " + res.token)
  uni.setStorageSync(common_key.k_local_open_id, res.open_id)
  uni.setStorageSync(common_key.k_local_token, res.token)
  uni.setStorageSync(common_key.k_local_user_info, JSON.stringify(res.data));

  GlobalData.token = res.token;
  //将后台返回的用户信息赋值给 UserInfo
  UserInfo.value = { ...UserInfo.value, ...res.data };
  console.log("UserInfo.value.state = " + UserInfo.value.state)
  console.log("UserInfo.value.default_room e:", UserInfo.value.default_room);
}
//获取openid
function onlyGetUserInfo() {
  uni.login({
    success: (res) => {
      console.log("res.code:", res.code);

      requestUserInfoWithCode(res.code)
    }
  })
}
const onButtonTap = () => {
  console.log("onButtonTap:", 1);

 

  // let token = uni.getStorageSync(common_key.k_local_token)
  // if (token) {
  //   console.log('Test click event triggered');
  //   popupStore.showPopup();
  // } else {
  //   onlyGetUserInfo()
  // }
};
onMounted(() => {


  let token = uni.getStorageSync(common_key.k_local_token)
  if (token) {
    popupStore.requestPostsList();
  }
});
//接收参数
onLoad(options => {
  const globalStore = useGlobalStore()
  topIconDistance = computed(() => globalStore.topIconDistance + globalStore.statusBarHeight)
  console.log(`topIconDistance:------`, topIconDistance.value);

  if (options) {
    // 处理逻辑
    console.log(`index onLoad:`, options);
    inviter_openid.value = options.open_id
  }
});
const handleRefresherRefresh = () => {
  console.log('下拉刷新');
  isRefreshing.value = true;
  setTimeout(() => {
    // items.value = [...Array(20)].map((_, i) => ({ id: i, text: `Item ${i + 1}` }));
    popupStore.addParkItem({
    ID: 1,
    CreatedAt: '2024-07-22T00:00:00Z',
    UpdatedAt: '2024-07-22T00:00:00Z',
    DeletedAt: '',
    in_maintenance: false,
    negotiable: true,
    state: 1,
    posts_type: 1,
    user_id: 'user123',
    telephone: '1234567890',
    wei_xin: 'weixin123',
    title: 'Example Park Item',
    img_url: 'https://qiniu.aimissu.top/notes/play_icon.png',
    annual_rent: '我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改',
    address: '地址 我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修地址 我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修地址 我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修地址 我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修改我要求对这个组件布局进行修'
  });
    isRefreshing.value = false;
    uni.stopPullDownRefresh();
  }, 2000);
};

const onReachBottom = () => {
  console.log('触底加载更多');
  setTimeout(() => {
    // const lastId = items.value.length;
    // items.value = [...items.value, ...[...Array(20)].map((_, i) => ({ id: lastId + i, text: `Item ${lastId + i + 1}` }))];
  }, 2000);
};

// Watch for changes in the isVisible state
watch(() => popupStore.isVisible, (newVal) => {
  if (!newVal) {
    console.log('Popup has been hidden');
    // Perform any additional actions here
  }
});

// Watch for changes in the isRecording state
watch(() => popupStore.isRecording, (newVal) => {
  if (newVal) {
    console.log('Recording has started');
    // Perform any additional actions here
  } else {
    console.log('Recording has stopped');
  }
});

// Watch for changes in the isFinished state
watch(() => popupStore.isFinished, (newVal) => {
  if (newVal) {
    console.log('Recording has finished');
    // Perform any additional actions here
  }
});
// Watch for changes in the analyAry.data state
watch(() => popupStore.analyAry.data, (newVal) => {
  console.log('analyAry.data has changed:', newVal);

});
// Computed property to check if analyAry has data
const hasAnalyAryData = computed(() => {
  return popupStore.analyAry.data.length > 0;
});

// Computed property for navbar background color
const navbarBackgroundColor = computed(() => {
  return hasAnalyAryData.value ? '#FFFFFF' : 'rgba(0, 0, 0, 0)';
});

</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.home-no-data {
  background: url('https://qiniu.aimissu.top/notes/bg_launch.png') no-repeat center center fixed;
  background-size: cover;
}

.home-with-data {
  background-color: #FFFFFF;
}

.bg-image {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.custom-button {
  background-color: rgb(202, 100, 52);
  color: white;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-top: 20rpx;
  padding-bottom: 20rpx;

  position: fixed;
  bottom: 120rpx;
  /* 距离底部的距离 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  /* 确保按钮在scroll-view上方 */
}

.button-icon {
  width: 60rpx;
  height: 60rpx;
  margin-right: 10rpx;
}

.button-text {
  font-size: 32rpx;
}

.data-list {
  display: flex;
  flex-direction: column;
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
}

.data-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.data-image {
  width: 80rpx;
  height: 80rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.data-title {
  font-size: 28rpx;
  font-weight: bold;
}

.data-address {
  font-size: 24rpx;
  color: #666;
}
</style>