

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RequestApi } from "@/public/request"
import type { Analysis, UserInfoModel } from '@/public/decl-type';
import { onLoad, onShow } from '@dcloudio/uni-app';

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

const change = (e: any) => {
  console.log(e);

  uni.showToast({
    title: `点击第个宫格`,
    icon: 'none'
  })
}



onMounted(() => {
  hidePasteBtn.value = !!inputValue.value
})

</script>

<template>
  <swiper :style="{ height: '220px' }" autoplay="true" interval="5000" circular="true" indicator-dots="true"
    indicator-color="#ffffff" indicator-active-color="#ff0000">
    <swiper-item v-for="(image, index) in images" :key="index">
      <image :src="image" class="full-width-image"></image>
    </swiper-item>
  </swiper>
  <view class="diamond">
    <uni-grid :show-border="false"  :column="4" :highlight="true" @change="change">
      <uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
        <view class="grid-item-box" style="background-color: #fff;">
          <image :src="item.url" class="image" mode="aspectFill" />
          <text class="text">{{ item.text }}</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
  
</template>

<style lang="scss" scoped>
.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}
	.diamond {
		margin-top: 10px;
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
		padding: 15px 0;
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
  padding: 15px 0;
}

.full-width-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>