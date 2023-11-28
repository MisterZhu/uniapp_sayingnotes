

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
        url: '/static/home/home_carport_icon6.png',
        text: '车位出租',
        badge: '1',
        type: "success"
    },
    {
        url: '/static/home/home_carport_icon5.png',
        text: '车位买卖',
        badge: '2',
        type: "warning"
    },
    {
        url: '/static/home/home_sale_icon1.png',
        text: '卖闲置',
        badge: '3',
        type: "warning"
    }
    // ,
    // {
    //   url: '/static/home/home_carport_icon3.png',
    //   text: '房屋买卖',
    //   badge: '4',
    //   type: "warning"
    // }
]
const isXiala = ref(false)
const jiage = ref("1000元/年")

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
const generateRichTextContent = (annualRent: string) => {
  // 从 annualRent 中分离数字和单位
  const matchResult = annualRent.match(/(\d+)([^\d]+)/);
  if (matchResult) {
    const [amount, unit] = matchResult.slice(1);
    // 使用分隔后的数据构建 richTextContent
    return `<div style="color: red;"><span style="font-weight: 500; font-size: 24px;">${amount}</span><span style="font-size: 14px;">${unit}</span></div>`;
  } else {
    // 如果没有匹配结果，可以选择返回默认值或者空字符串
    return '';
  }
};
</script>

<template>
    <!-- 轮播图 -->
    <view class="swiper-container">
        <swiper class="custom-swiper" autoplay="true" interval="5000" circular="true" indicator-dots="true"
            indicator-color="#ffffff" indicator-active-color="#FF6C00">
            <swiper-item v-for="(image, index) in images" :key="index" class="rounded-swiper-item">
                <image :src="image" class="full-width-image"></image>
            </swiper-item>
        </swiper>
    </view>
    <!-- 介绍 -->
    <view class="text-container">
        <text class="left-text">2号院地下车位便宜出租了！</text>
    </view>
    <!-- 价格 -->
    <view class="text-container1">
        <rich-text :nodes="generateRichTextContent(jiage)"></rich-text>
    </view>
</template>

<style lang="scss" scoped>
.swiper-container {
    margin-top: 0px;
    /* 上下左右各 20px 的边距 */
    margin-left: 0px;
    /* 上下左右各 20px 的边距 */
    margin-right: 0px;
    /* 上下左右各 20px 的边距 */
}

.full-width-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text-container {
    margin: 18px 20px 10px 20px;
}

.left-text {
    font-size: 24px;
    font-weight: 500;
    color: #333;
}

.text-container1 {
    margin: 5px 20px 10px 20px;
}

</style>