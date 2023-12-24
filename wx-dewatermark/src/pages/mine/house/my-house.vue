

<script setup lang="ts">
import type { Analysis, ApplyItem, UserInfoModel } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app';
import { reactive, ref, watch } from 'vue';
// import historyItem from '@/pages/history/history-widget/history-item.vue';
import houseItem from "./house-widget/house-item.vue";
import { GlobalData, UserInfo } from '@/public/common';
import { includesZhu } from "@/utils/string-utils";

// let analyAry = ref([] as Analysis[])
let applyAry = reactive({
  data: [] as ApplyItem[]
})
const size = 3
let page = 0
let userInfo = ref<UserInfoModel>()

//接收参数
onShow(() => {
  let that = this
  // 移除之前的事件监听器
  uni.$off('isMyHouseRefresh');
  uni.$on('isMyHouseRefresh', function (data) {
    console.log('3监听到事件来自返回的参数：' + data);
    if (data === 1) {
      console.log('3 requestPostsList' + data);
      requestApplyList(() => {
        // TODO 下面执行刷新的方法
      });
    }
    // TODO 下面执行刷新的方法
  })
});

// MARK: 解析记录
async function requestApplyList(callback: () => void) {

  try {
    const res: any = await RequestApi.ApplyList({ "page": page, "size": size, 'user_id': userInfo.value?.user_id })
    if (typeof callback === 'function') {
      callback();
    }
    if (res.code === 200) {
      if (page === 0) {
        applyAry.data = res.data
        console.log('0')

      } else {
        console.log('>0')

        applyAry.data = [...applyAry.data, ...res.data]
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
const getLocalUserInfo = () => {
  var uInfo = JSON.parse(uni.getStorageSync('local_user_info'));
  console.log("userInfo = " + `${uInfo}`)
  if (uInfo) {
    userInfo.value = uInfo;
    requestApplyList(() => { })
    console.log("GlobalData.checking:", GlobalData.checking);

  }
}
getLocalUserInfo()

// 下拉刷新的事件
onPullDownRefresh(() => {
  console.log('下拉刷新的事件');
  // 1. 重置关键数据
  page = 0
  applyAry.data = [] as ApplyItem[]
  // 2. 重新发起请求
  requestApplyList(() => uni.stopPullDownRefresh())
});
const handleItemClick = (itemModel: any) => {
  if (UserInfo.value.state === 2) {
    uni.showModal({
      title: '温馨提示',
      content: '您已经成功认证了房屋，不能再添加房屋，如需修改，请联系客服',
      cancelText: "取消",
      confirmText: "联系客服", // 确认按钮文字 
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/mine/help-center'
          })
        }
      }
    });
  } else if (UserInfo.value.state === 1) {
    uni.showModal({
      title: '温馨提示',
      content: '您已经申请了房屋认证，正在审核中，如需加急，请联系客服',
      cancelText: "取消",
      confirmText: "联系客服", // 确认按钮文字 
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/mine/help-center'
          })
        }
      }
    });
  } else {
    uni.navigateTo({
      url: '/pages/mine/house/select-community'
    })
  }

}
// 触底的事件
// onReachBottom(() => {
//   console.log('触底的事件');
//   page++
//   requestAnalyList(() => { })
// });
watch(
  () => applyAry,
  (newValue) => {
    applyAry = newValue
    console.log(`history watch images: ${newValue}`);
  },
  { immediate: true }
);
</script>

<template>
  <view class="container">
    <view class="divider"></view>

    <view class="list-page">
      <view v-show="applyAry.data.length > 0" class="history_item">
        <houseItem v-for="(item, index) in applyAry.data" :key="index" :analy-model="item"></houseItem>
      </view>
    </view>
    <view v-show="applyAry.data.length <= 0" class="history_item">
      <text class="center-text">暂无房屋申请记录~</text>
    </view>
    <!-- 添加按钮 -->
    <view class="button-container">
      <button v-show="includesZhu(GlobalData.curent_title)" class="custom-button" @click="handleItemClick">新增</button>
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

.button-container {
  position: absolute;
  bottom: 50px;
  left: 50px;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-button {
  height: 40px;
  background-image: linear-gradient(to bottom, $uni-color-gradient0, $uni-color-gradient1);
  color: #fff;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  width: 100%;
  font-size: 16px;

  cursor: pointer;
}
</style>