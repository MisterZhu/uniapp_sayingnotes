<script setup lang="ts">
import type { MineItemModel, UserInfoModel } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { onShow } from '@dcloudio/uni-app';
import { onMounted, ref } from 'vue';
import MineItem from './mine-item.vue';
import { GlobalData , UserInfo} from '@/public/common';


let menu_top = ref<string>('')
let menu_height = ref<string>('')
let safeTop = ref<string>('')

const itmeAry = ref<MineItemModel[]>([
  {
    left_img: "/static/mine/mine_share2.png",
    left_title: "分享给好友",
    right_img: "/static/mine/mine-next-999.png",
    right_title: "",
    line_shou: true,
    head_shou: false,
    share_shou: true,
    radius_type: 3,
  },
]);

const getUserIn = () => {
    // var uInfo = JSON.parse(uni.getStorageSync('local_user_info'));
    console.log("userInfo = " + `${UserInfo}`)
    console.log("state = " + `${UserInfo.value.state}`)

    // if (UserInfo) {
    //     // userInfo.value = uInfo;
    //     var item = itmeAry.value[0];

    //     if (UserInfo.value?.state == 0) {
    //         item.right_title = '未认证';
    //         itmeAry.value[0] = item;
    //     } else if (UserInfo.value?.state == 1) {
    //         item.right_title = '认证中';
    //         itmeAry.value[0] = item;
    //     } else if (UserInfo.value?.state == 2) {
    //         item.right_title = '已认证';
    //         itmeAry.value[0] = item;
    //     } else if (UserInfo.value?.state == 3) {
    //         item.right_title = '认证失败';
    //         itmeAry.value[0] = item;
    //     }
    // } else {
    //     getUserInfo()
    // }
}
onShow(() => {
    console.log("mine-header Show");
    getUserIn()
});
async function requestUserInfoWithCode(code: string) {
    const res: any = await RequestApi.UserLogin({ "code": code })
    console.log(res)
    console.log("local_token = " + res.token)
    // userInfo.value = res.data;
    UserInfo.value = { ...UserInfo.value, ...res.data };
    GlobalData.token = res.token;

    console.log("state 1111= " + `${UserInfo.value.state}`)

    // var item = itmeAry.value[0];

    // if (UserInfo.value?.state == 0) {
    //     item.right_title = '未认证';
    //     itmeAry.value[0] = item;
    // } else if (UserInfo.value?.state == 1) {
    //     item.right_title = '认证中';
    //     itmeAry.value[0] = item;
    // } else if (UserInfo.value?.state == 2) {
    //     item.right_title = '已认证';
    //     itmeAry.value[0] = item;
    // } else if (UserInfo.value?.state == 3) {
    //     item.right_title = '认证失败';
    //     itmeAry.value[0] = item;
    // }
}

//获取openid
function getUserInfo() {
    uni.login({
        success: (res) => {
            requestUserInfoWithCode(res.code)
        }
    })
}
const copyHandle = async () => {

    uni.setClipboardData({
        data: UserInfo.value?.user_id,
        success() {
            uni.showToast({
                title: '复制成功'
            })
        }
    })
}
onMounted(() => {
    let menu_but = uni.getStorageSync('MenuButton')
    menu_top.value = menu_but.top + 'px'
    menu_height.value = menu_but.height + 'px'
    let SafeAreaInsetTop = uni.getStorageSync('SafeAreaInsetTop')
    safeTop.value = SafeAreaInsetTop.value + 'px'
    console.log("SafeAreaInsetTop = " + SafeAreaInsetTop);
    console.log("menu_height = " + menu_height.value);

})
const handleItemClick = (itemModel: any) => {
    console.log('clicked item:', itemModel.left_title)
    switch (itemModel.left_title) {
        case '我的房屋':
            uni.navigateTo({
                url: '/pages/mine/house/my-house'
            })
            break;
        default:
            break;
    }
}
</script>

<template>
    <view class="header">
        <view class="header__left">
            <image class="header__avatar" src="/static/mine/mine_head_icon.png" />
            <!-- <image class="vip_head_icon" src="/static/mine/mine_authen1.png" /> -->

            <view class="header__info">
                <!-- <text class="header__username">{{ UserInfo?.username }}</text> -->
                <text class="header__username">微信用户</text>

                <view class="header__userid-wrapper">
                    <!-- <text class="header__userid">ID: {{ UserInfo?.user_id }}</text> -->
                    <text class="header__userid">ID:1234567</text>
                    <!-- <image class="header__copy-icon" @click="copyHandle()" src="/static/mine/mine_head_copy.png" /> -->
                    <view class="clickable-area" @click="copyHandle">
                        <image class="header__copy-icon" src="/static/mine/mine_head_copy.png" />
                    </view>
                </view>
            </view>

        </view>
        <!-- <view class="header__tip">剩余解析次数：{{ userInfo?.query_count }}</view> -->
        <image class="header__background" src="/static/mine/mine_head_bg.png" mode="aspectFill"></image>
        <!-- <view class="header__bottom">
            <image class="vip__icon" @click="copyHandle()" src="/static/mine/mine_vip-icon.png" />
            <text class="vip__title">您还不是会员</text>
        </view> -->
        <view class="group">
            <MineItem :itemModel=itmeAry[0] @click="handleItemClick" />
        </view>
    </view>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 250px;
    padding: 0px;
    //   background: url('https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/nav-yiyu.png') center center / cover no-repeat;
    position: relative;
    /* 添加 position 属性，使得 header__bottom 为绝对定位 */

}

.header__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 240px;
    object-fit: cover;
    z-index: 0;
}

.group {
    position: absolute;
    /* 绝对定位，相对于 header 的位置 */
    bottom: 2px;
    /* 距离 header 底部的距离为 0 */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 51px;
    width: 100vw;
}

/* 让 MineItem 填满 .group 区域 */
.header__bottom {
    position: absolute;
    /* 绝对定位，相对于 header 的位置 */
    bottom: 2px;
    /* 距离 header 底部的距离为 0 */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 55px;
    width: 90vw;
    margin-left: 5vw;
    //   background-color: #ffffff; /* 背景色为白色，方便查看效果 */
    background-image: url("https://qiniu.aimissu.top/images/mine_vip_bg.png");
    background-size: cover;
}

.vip_head_icon {
    position: absolute;
    top: 138px;
    left: 52px;
    height: 20px;
    width: 20px;
}

.vip__icon {
    width: 34px;
    height: 20px;
    margin-left: 15px;
}

.vip__title {
    font-size: 14px;
    color: #f5ce32;
    margin-left: 8px;
    // font-weight: bold;

}

.header__left {
    display: flex;
    align-items: center;
    z-index: 10;

}

.header__avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    margin-left: 20px;
    border-radius: 50%;
}

.header__info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.header__username {
    font-size: 16px;
    color: #000;
    font-weight: bold;
    margin: 0;
}

.header__userid {
    font-size: 12px;
    color: $uni-color-000;
    font-weight: bold;
    margin: 0;
}

// .header__tip {
//     font-size: 12px;
//     color: $uni-color-000;
//     text-align: right;
//     margin-right: 12px;
//     flex: 1;
//     z-index: 10;

// }
.clickable-area {
    width: 25px;
    /* 定义一个足够大的宽度 */
    height: 25px;
    /* 定义一个足够大的高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 5px;

}

.header__copy-icon {
    width: 20px;
    height: 20px;
}

.header__userid-wrapper {
    display: flex;
    align-items: center;
    margin-top: 4px;
}
</style>
