

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RequestApi } from "@/public/request"
import type { ParkItem, UserInfoModel } from '@/public/decl-type';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { timeDis } from '@/public/common';

const top = ref(0);

const inputValue = ref<string>('')
const hidePasteBtn = ref<boolean>(false)
let userInfo = ref<UserInfoModel>()
    let parkModel = ref<ParkItem | null>(null)

let openid = uni.getStorageSync('openid')
const inviter_openid = ref<string>('')
const images = ["/static/home/home_head_bg.png", "/static/home/home_head_bg.png", "/static/home/home_head_bg.png"]

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
// 接收参数
onLoad(options => {
  // @ts-ignore
  parkModel.value = JSON.parse(decodeURIComponent(options.parkModel as string)) as CommunityItem
  console.log(`parkModel onLoad: ${parkModel.value?.title}`);
  getLocalUserInfo();

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
const copyHandle = async () => {

    uni.setClipboardData({
        // @ts-ignore
        data: jiage.value,
        success() {
            uni.showToast({
                title: '复制成功'
            })
        }
    })
}

const handleSubmit = async () => {

}
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
        <text class="left-text">{{parkModel?.title}}</text>
    </view>
    <!-- 价格 -->
    <view class="text-container1">
        <rich-text :nodes="generateRichTextContent(jiage)"></rich-text>
    </view>
    <!-- 标签 -->
    <view class="custom-view">
        <!-- 根据 in_maintenance 显示文本 -->
        <text v-if="parkModel?.in_maintenance" class="left-text1">含管理费</text>

        <!-- 根据 negotiable 显示文本 -->
        <text v-if="parkModel?.negotiable" class="left-text2">可小刀</text>

        <!-- 固定显示的文本 -->
        <text class="left-text3">年租</text>

        <!-- 展示CreatedAt，使用 formatDate 方法转译 -->
        <text class="right-text">{{ timeDis.formatDate(parkModel?.CreatedAt ?? '') }}</text>
    </view>
    <view class="component-footer">
        <!-- 两个按钮，右对齐 -->
        <!-- <view class="copy-btn" @click="copyHandle()">复制链接</view>
        <view class="component-button" @click="handleSubmit()">重新解析</view> -->
        <view class="copy-btn" @click="copyHandle()">
            <span class="line1">Mister***zhu</span>
            <span class="line2">复制微信号</span>
        </view>

        <view class="component-button" @click="handleSubmit()">
            <span class="line1">186****8871</span>
            <span class="line2">拨打手机号</span>
        </view>
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


.custom-view {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0px;
    margin-right: 20px;
    margin-left: 20px;

    width: calc(100vw - 80rpx);

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

/* 组件底部样式，包括两个按钮 */
/* 组件底部样式，包括两个按钮 */
// .component-footer {
//     display: flex;
//     justify-content: space-between; /* 使用 space-between 让两个按钮分别位于容器的两端 */
//     padding: 18px;
// }

/* 按钮样式 */
.component-button,
.copy-btn {
    flex: 1;
    /* 让两个按钮平分剩余的宽度 */
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
}

// .component-button {
//     margin-left: 10px; /* 设置按钮之间的间距 */
//     background-color: $uni-color-theme;
//     color: $uni-color-fff;
// }

// .copy-btn {
//     margin-right: 10px; /* 设置按钮之间的间距 */
//     background-color: $uni-color-f8f;
//     color: $uni-color-333;
//     border: 1px solid $uni-color-ccc;
// }
/* 按钮样式 */
.component-footer {
    display: flex;
    justify-content: space-between;
    padding: 18px;
}

.copy-btn,
.component-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
}

.copy-btn {
    flex: 1;
    margin-right: 8px;
    /* 设置按钮之间的间距 */
    background-color: $uni-color-f8f;
    color: $uni-color-333;
    border: 1px solid $uni-color-gradient1;


}

.component-button {
    flex: 1;
    margin-left: 8px;
    /* 设置按钮之间的间距 */
    background-color: $uni-color-gradient1;
    color: $uni-color-fff;
}

/* 文字样式 */
.copy-btn span,
.component-button span {
    font-size: 14px;
    color: $uni-color-333;
    margin-bottom: 6px;
    /* 调整两行文字之间的间距 */
}

/* 第一行文字样式 */
.copy-btn .line1{
    color: $uni-color-gradient1;
    /* 设置第一行文字的颜色 */
    font-size: 15px;
    /* 设置第一行文字的大小 */
    font-weight: 500;

}

.component-button .line1 {
    color: $uni-color-fff;
    /* 设置第一行文字的颜色 */
    font-size: 15px;
    font-weight: 500;
    /* 设置第一行文字的大小 */
}

/* 第二行文字样式 */
.copy-btn .line2{
    color: $uni-color-gradient1;
    /* 设置第二行文字的颜色 */
    font-size: 12px;
    /* 设置第二行文字的大小 */
}
.component-button .line2 {
    color: $uni-color-fff;
    /* 设置第二行文字的颜色 */
    font-size: 12px;
    /* 设置第二行文字的大小 */
}
</style>