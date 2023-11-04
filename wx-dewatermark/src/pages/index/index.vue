

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RequestApi } from "@/public/request"
import type { Analysis, UserInfoModel } from '@/public/decl-type';
import { onLoad, onShow } from '@dcloudio/uni-app';

const top = ref(0);

const inputValue = ref<string>('')
const hidePasteBtn = ref<boolean>(false)
let userInfo = ref<UserInfoModel>()
let analyModel = ref<Analysis>()

let openid = uni.getStorageSync('openid')
const inviter_openid = ref<string>('')
const images = ["/static/home/home_head_bg.png", "/static/home/home_head_bg.png", "/static/home/home_head_bg.png"]
const list = [
  {
    url: '/static/home/home_carport_icon4.png',
    text: '车位出租',
    badge: '1',
    type: "success"
  },
  {
    url: '/static/home/home_carport_icon.png',
    text: '车位买卖',
    badge: '99',
    type: "warning"
  },
  {
    url: '/static/home/home_carport_icon.png',
    text: '房屋出租',
    badge: '99',
    type: "warning"
  },
  {
    url: '/static/home/home_carport_icon3.png',
    text: '房屋买卖',
    badge: '99',
    type: "warning"
  }
]
const isXiala = ref(false)
const option = [
  { lable: 2, value: "天悦湾2号院" },
  { lable: 3, value: "天悦湾3号院" },
  { lable: 1, value: "天悦湾1号院" },
  { lable: 5, value: "天悦湾5号院" },
  { lable: 6, value: "天悦湾6号院" },
  { lable: 7, value: "天悦湾7号院" },
  { lable: 8, value: "天悦湾8号院" },
]
const optionIndex = ref<string>('天悦湾2号院')

// MARK: 注册&获取用户信息
async function requestUserInfoWithCode(code: string) {
  const res: any = await RequestApi.UserLogin({ "code": code, "inviter_id": inviter_openid })
  console.log(res)
  console.log("local_token = " + res.token)
  uni.setStorageSync('local_token', res.token)
  uni.setStorageSync('local_user_info', JSON.stringify(res.data));
  userInfo.value = res.data
}
const getLocalUserInfo = () => {
  var uInfo = JSON.parse(uni.getStorageSync('local_user_info'));
  console.log("userInfo = " + `${uInfo}`)
  if (uInfo) {
    userInfo.value = uInfo;
  }
}

//获取openid
function getUserInfo() {
  uni.login({
    success: (res) => {
      requestUserInfoWithCode(res.code)
    }
  })
}
getUserInfo()

onShow(() => {
  console.log("App Show");
  getLocalUserInfo()
});
//接收参数
onLoad(options => {
  if (options) {
    // 处理逻辑
    console.log(`index onLoad:`, options);
    inviter_openid.value = options.open_id
  }
});

const changeAction = (e: any) => {
  // let {
  //   index
  // } = e.detail
  const index = e.detail.index;

  console.log(index);

  uni.showToast({
    title: `点击第${index}个宫格`,
    icon: 'none'
  })
  uni.navigateTo({
    url: '/pages/index/parking/parking-page'
  })

}
const selectIsXiala = (e: any) => {
  isXiala.value = !isXiala.value
  console.log(`dianji :`, isXiala.value);

}
const xuanzeMoban = (_label: any, _value: any) => {
  uni.showToast({
    title: `点击了 ${_value}`,
    icon: 'none'
  })
  optionIndex.value = _value
  isXiala.value = false

}

onMounted(() => {
  hidePasteBtn.value = !!inputValue.value

  let menu_but = uni.getStorageSync('SafeAreaInsetTop')
  top.value = menu_but + 4;

  // top.value = uni.getStorageSync('SafeAreaInsetTop')
  console.log(`onMounted:`, top.value);

})

</script>

<template>
  <!-- 下拉菜单 -->
  <view class="xuanze" :style="{ '--top': top + 'px' }">
    <view class="text-container" @click="selectIsXiala">
      <view class="centered-content">
        <text class="text-title">{{ optionIndex }}</text>
        <image class="xuanze-image" src="/static/home/home_switch_icon.png"></image>
      </view>
    </view>

    <view class="xiala" v-show="isXiala">
      <view class="xiala-xuan" :class="[isXiala == true ? 'open' : 'close']">
        <view class="xiala-hang" v-for="(item, index) in option" :key="index"
          @click="xuanzeMoban(item.lable, item.value)">
          <text>{{ item.value }}</text>
        </view>
      </view>
    </view>
  </view>
  <!-- 轮播图 -->
  <view class="swiper-container">
    <swiper class="custom-swiper" autoplay="true" interval="5000" circular="true" indicator-dots="true"
      indicator-color="#ffffff" indicator-active-color="#FF6C00">
      <swiper-item v-for="(image, index) in images" :key="index" class="rounded-swiper-item">
        <image :src="image" class="full-width-image"></image>
      </swiper-item>
    </swiper>
  </view>
  <!-- 金刚区 -->
  <view class="diamond">
    <view class="card-wrapper">
      <uni-grid :show-border="false" :column="4" :highlight="true" @change="changeAction">
        <uni-grid-item v-for="(item, index) in list" :index="index" :key="index" clickable>
          <view class="grid-item-box" style="background-color: #fff;">
            <image :src="item.url" class="image" mode="aspectFill" />
            <text class="text">{{ item.text }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.swiper-container {
  margin-top: 90px;
  /* 上下左右各 20px 的边距 */
  margin-left: 12px;
  /* 上下左右各 20px 的边距 */
  margin-right: 12px;
  /* 上下左右各 20px 的边距 */
}

.custom-swiper {
  border-radius: 16rpx;
  /* 为 swiper 添加圆角，可根据需求调整半径值 */
}

.rounded-swiper-item {
  border-radius: 16rpx;
  /* 为 swiper 添加圆角，可根据需求调整半径值 */
}

.grid-item-box image {
  width: 40rpx;
  height: 40rpx;
}

.text {
  font-size: 28rpx;
  margin-top: 10rpx;
}

.diamond {
  margin: 22rpx;
  border-radius: 16px;
  /* 设置合适的半径值以实现圆角效果 */

}

.card-wrapper {
  background-color: #ffffff;
  border-radius: 16rpx;
  /* 为 swiper 添加圆角，可根据需求调整半径值 */
  /* 设置合适的半径值以实现圆角效果 */
  overflow: hidden;
  /* 隐藏卡片内容溢出部分 */
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* 可添加阴影效果以增强卡片外观 */
}


.grid-item-box {
  flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.full-width-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.xuanze {
  position: fixed;
  top: var(--top);
  left: 16rpx;
  // width: 200rpx;
  height: 64rpx;
  border-radius: 30rpx;
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid #ddd;
  padding: 0 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  z-index: 999;
}

.xuanze-image {
  width: 35rpx;
  height: 35rpx;
  object-fit: cover;
  padding-left: 8rpx;

}

.text-container {
  // max-width: 220rpx; /* 设置最大宽度 */
  white-space: nowrap;
  /* 保证文本不换行 */
  overflow: hidden;
  /* 隐藏溢出的内容 */
  // text-overflow: ellipsis; /* 显示省略号 */
  // text-overflow: clip; /* 默认值）：文本溢出时，将被修剪并丢失，不显示省略号 */
}

.centered-content {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
  justify-content: center;
  /* 水平居中对齐 */
}

.xuanze text {
  color: #111;
  font-weight: 400;
  /* 文本颜色 */
}

.xiala {
  position: absolute;
  bottom: -470rpx;
  left: 0;
  height: 460rpx;
  width: 300rpx;
  z-index: 999;

}

.xiala-xuan {
  border-radius: 10rpx;
  /* 设置四个角的半径为10px */
  height: 460rpx;
  /* 设置固定高度 */
  width: 300rpx;
  background-color: #f8f8f8;
  box-sizing: border-box;
  overflow-y: scroll;
  /* 启用垂直滚动条 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  z-index: 999;

}

.xiala-hang {
  height: 50rpx;
  width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  // align-items: center;
  justify-content: left;
  padding: 15rpx 20rpx;
}

.xiala-hang:last-child {
  border: 0rpx;
}

/* 显示或关闭动画*/
.open {
  animation: slideContentUp 0.1s linear both;
}

.close {
  animation: slideContentDown 0.1s linear both;
}

/* 动态设置高度 */
@keyframes slideContentUp {
  from {
    height: 0;
  }

  to {
    height: -460rpx;
  }
}

@keyframes slideContentDown {
  from {
    height: -460rpx;
  }

  to {
    height: 0;
  }
}</style>