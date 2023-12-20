

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RequestApi } from "@/public/request"
import type { ParkItem, UserInfoModel } from '@/public/decl-type';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { common_key, common_url, timeDis } from '@/public/common';
import { GlobalData, UserInfo } from '@/public/common';
import { shopPlaceImg, strAddStar } from "@/utils/string-utils";

const top = ref(0);

const inputValue = ref<string>('')
const hidePasteBtn = ref<boolean>(false)
let parkModel = ref<ParkItem | null>(null)
const inviter_detailid = ref<number>(0)

const images = ref<string[]>([])

// 接收参数
onLoad(options => {
    if (options) {
        if ((options.detail_id ?? '').trim().length === 0) {
            // @ts-ignore
            parkModel.value = JSON.parse(decodeURIComponent(options.parkModel as string)) as CommunityItem
            console.log(`parkModel onLoad title: ${parkModel.value?.title}`);
            console.log(`parkModel onLoad user_id: ${parkModel.value?.user_id}`);
            console.log(`UserInfo.value.user_id: ${UserInfo.value.user_id}`);
            console.log("UserInfo  = " + UserInfo.value.user_id)
            let arr = [];
            let myVar = parkModel?.value?.img_url ? parkModel?.value?.img_url : shopPlaceImg(parkModel?.value?.posts_type ?? 1);
            if (myVar.includes(",")) {
                arr = myVar.split(",");
            } else {
                arr = [myVar];
            }
            images.value = arr;
            console.log("images  = " + images.value)
            inviter_detailid.value = parkModel.value?.ID ?? 0;

        } else {
            inviter_detailid.value = Number(options.detail_id)
            onlyGetUserInfo();
        }
        requestPostsDet(() => {
            // TODO 下面执行刷新的方法
        });
        // 处理逻辑
        // console.log(`index onLoad:`, options);
        // inviter_openid.value = options.open_id
    }
});
// MARK: 仅仅获取用户信息
async function requestUserInfo(code: string) {
    const res: any = await RequestApi.UserLogin({ "code": code })
    console.log(res)
    console.log("local_token = " + res.token)
    uni.setStorageSync(common_key.k_local_open_id, res.open_id)
    uni.setStorageSync(common_key.k_local_token, res.token)
    uni.setStorageSync(common_key.k_local_user_info, JSON.stringify(res.data));
    GlobalData.token = res.token;
    //将后台返回的用户信息赋值给 UserInfo
    UserInfo.value = { ...UserInfo.value, ...res.data };
    console.log("UserInfo.value.state = " + UserInfo.value.state)
    console.log("UserInfo.value.user_id = " + UserInfo.value.user_id)

}
//获取openid
function onlyGetUserInfo() {
    uni.login({
        success: (res) => {
            requestUserInfo(res.code)
        }
    })
}
// MARK: 帖子详情
async function requestPostsDet(callback: () => void) {
    console.log('----------222--------');
    try {
        const res: any = await RequestApi.DetailShops({ "id": inviter_detailid.value })
        if (typeof callback === 'function') {
            callback();
        }
        if (res.code === 200) {
            parkModel.value = res.data
            let arr = [];
            let myVar = parkModel?.value?.img_url ? parkModel?.value?.img_url : shopPlaceImg(parkModel?.value?.posts_type ?? 1);
            if (myVar.includes(",")) {
                arr = myVar.split(",");
            } else {
                arr = [myVar];
            }
            images.value = arr;
            let img = '';
            if (arr.length > 0) {
                console.log('----------arr.length > 0--------');

                img = arr[0];
            }
            console.log(`----------img =: ${img}`);

            uni.setStorageSync(common_key.k_detail_img, img)
            uni.setStorageSync(common_key.k_detail_title, parkModel.value?.title)
            uni.setStorageSync(common_key.k_detail_id, parkModel.value?.ID.toString())

        } else {
            uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
        }
    } catch (error) {
        callback && callback()
        console.error(error)
        uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
    }
}
onMounted(() => {
    hidePasteBtn.value = !!inputValue.value

    let menu_but = uni.getStorageSync('SafeAreaInsetTop')
    top.value = menu_but;

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
const permissionVerify = () => {
    if (UserInfo.value.state === 0) {
        uni.showModal({
            title: '温馨提示',
            content: '您还没有进行房屋认证，发布者的联系方式只允许邻居查看，请先去进行房屋认证',
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
        return false;
    } else if (UserInfo.value.state === 1) {
        uni.showModal({
            title: '温馨提示',
            content: '您的房屋认证还未通过审核，您可以联系客服，催促客服快速审核，审核通过以后才可以获取发布者联系方式',
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
        return false;
    } else {
        return true;
    }
}
const copyHandle = async () => {
    // let pass = permissionVerify();
    // if (!pass) {
    //     return;
    // }
    uni.setClipboardData({
        // @ts-ignore
        data: parkModel?.wei_xin ?? '',
        success() {
            uni.showToast({
                title: `成功复制微信号：${parkModel?.value?.wei_xin ?? ''}`,
                icon: 'none',
                duration: 2000
            })
        }
    })
}
const handleDelete = async () => {
    uni.showModal({
        title: '温馨提示',
        content: '确定要删除这篇帖子吗？',
        cancelText: "取消", // 不展示取消按钮
        confirmText: "确定", // 确认按钮文字 
        success: function (res) {
            if (res.confirm) {
                deletePosts();
            } else if (res.cancel) {

            }
        }
    });

}
const handleSubmit = async () => {
    // let pass = permissionVerify();
    // if (!pass) {
    //     return;
    // }
    uni.makePhoneCall({
        phoneNumber: `${parkModel?.value?.telephone ?? ''}`,
        success: function () {
            console.log('拨打电话成功');
        },
        fail: function () {
            console.log('拨打电话失败');
        }
    });

}
const imgError = (e: any) => {
    switch (parkModel?.value?.posts_type) {
        case 1:
            images.value[e] = common_url.home_shop_jiazheng;
            break;
        case 2:
            images.value[e] = common_url.home_shop_zhuangxiu;

            break;
        case 3:
            images.value[e] = common_url.home_shop_huishou;

            break;
        default:

            break;
    }
}
// MARK: 
async function deletePosts() {
    try {
        console.log("UserInfo.value.room e:", UserInfo.value.default_room);

        const loudongAry = UserInfo.value.default_room.split('-'); // 使用空格作为分隔符
        let loudongStr = '';
        if (loudongAry.length > 0) {
            loudongStr = '-' + loudongAry[0] + '幢';
        }
        const requestData = {
            id: parkModel?.value?.ID,
            // Add other fields based on your data structure
        };
        const res: any = await RequestApi.DetPosts(requestData)
        uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })

        if (res.code === 200) {
            // 延时一秒执行的操作
            setTimeout(() => {
                uni.$emit('isLessorRefresh', 1)
                uni.$emit('isRenterRefresh', 1)
                uni.$emit('isSellRefresh', 1)
                uni.$emit('isBuyRefresh', 1)
                uni.$emit('isUsedRefresh', 1)
                uni.$emit('isMyPublishRefresh', 1)
                uni.navigateBack({
                    delta: 1, // 返回的页面数，1 表示返回上一页
                });
            }, 1000);

        } else {
        }
    } catch (error) {
        console.error(error)
        uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
    }
}




</script>

<template>
    <!-- 轮播图 -->
    <view class="swiper-container">
        <swiper class="custom-swiper" autoplay="true" interval="5000" circular="true" indicator-dots="true"
            indicator-color="#ffffff" indicator-active-color="#FF6C00" style="height: 280px">
            <swiper-item v-for="(image, index) in images" :key="index" class="rounded-swiper-item">
                <image :src="image" class="full-width-image" @error="imgError(index)" mode="aspectFill"></image>
            </swiper-item>
        </swiper>
    </view>
    <!-- 介绍 -->
    <view class="text-container">
        <text class="left-text">{{ parkModel?.title }}</text>
    </view>
    <!-- 价格 -->
    <!-- <view class="text-container1">
        <rich-text :nodes="generateRichTextContent(parkModel?.annual_rent ?? '')"></rich-text>
    </view> -->
    <!-- 标签 -->
    <view class="custom-view">
        <!-- 根据 in_maintenance 显示文本 -->
        <!-- <text v-if="parkModel?.in_maintenance" class="left-text1">含管理费</text> -->

        <!-- 根据 negotiable 显示文本 -->
        <!-- <text
            v-if="parkModel?.negotiable && (parkModel?.posts_type === 1 || parkModel?.posts_type === 3 || parkModel?.posts_type === 5)"
            class="left-text2">可小刀</text>
        <text v-if="parkModel?.negotiable && (parkModel?.posts_type === 2 || parkModel?.posts_type === 4)"
            class="left-text2">可协商</text>

        <text v-if="!parkModel?.negotiable" class="left-text2">一口价</text> -->

        <!-- 固定显示的文本 -->
        <!-- <text v-if="parkModel?.posts_type === 1 || parkModel?.posts_type === 2" class="left-text3">年租</text> -->

        <!-- 展示CreatedAt，使用 formatDate 方法转译 -->
        <text class="right-text">{{ timeDis.formatDate(parkModel?.CreatedAt ?? '') }}</text>
    </view>

    <!-- 位置 -->
    <!-- <view class="item-container">
        <image class="addre-icon" src="/static/home/home_address_icon.png"></image>
        <text class="addre-text">{{ parkModel?.address }}</text>
    </view> -->
    <!-- 删除按钮 -->
    <view v-if="(parkModel?.user_id ?? '') === UserInfo.user_id" class="single-btn-bg">
        <!-- 判断是否为当前用户 -->
        <view class="delete-btn" @click="handleDelete">
            删除
        </view>
    </view>

    <view v-else-if="(parkModel?.user_id ?? '') !== UserInfo.user_id && parkModel?.wei_xin" class="component-footer">
        <!-- copy-btn 按钮 -->
        <view class="copy-btn" @click="copyHandle">
            <span class="line1">{{ strAddStar(parkModel?.wei_xin ?? '') }}</span>
            <span class="line2">复制微信号</span>
        </view>
        <!-- component-button 按钮 -->
        <view class="component-button" @click="handleSubmit">
            <span class="line1">{{ strAddStar(parkModel?.telephone ?? '') }}</span>
            <span class="line2">拨打手机号</span>
        </view>
    </view>
    <view v-else class="component-footer">
        <!-- 默认情况下展示 component-button 按钮 -->
        <view class="component-button" @click="handleSubmit">
            <span class="line1">{{ strAddStar(parkModel?.telephone ?? '') }}</span>
            <span class="line2">拨打手机号</span>
        </view>
    </view>
    <!-- 分享 -->
    <view class="single-btn-bg">
        <!-- 判断是否为当前用户 -->
        <button class="share-btn" open-type="share">
            分享到微信群/好友
        </button>
    </view>
</template>

<style lang="scss" scoped>
/* 样式部分 */
.item-container {
    display: flex;
    align-items: center;
    padding: 20px 10px 10px 12px;
    /* 设置间距 */
}

.addre-icon {
    width: 40rpx;
    /* 设置图标大小 */
    height: 40rpx;
    margin-left: 10rpx;
    /* 设置图标和文本之间的间距 */
}

.addre-text {
    font-size: 14px;
    /* 设置文本字体大小 */
    color: #333;
    /* 设置文本字体颜色 */
    margin-left: 5rpx;
    /* 设置图标和文本之间的间距 */
}

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
}

// ::v-deep .full-width-image {
// 	height: 100%;
// 	width: 100%;
// 	img {
// 		height: 100%;
// 		width: 100%;
// 		object-fit: contain;
// 	}
// }
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



/* 按钮样式 */
.component-button,
.copy-btn {
    flex: 1;
    /* 让两个按钮平分剩余的宽度 */
    padding: 10px 10px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
}

/* 按钮样式 */
.component-footer {
    display: flex;
    justify-content: center;
    /* 居中对齐 */
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

/* 组件底部样式，dan个按钮 */
.single-btn-bg {
    display: flex;
    justify-content: center;
    padding: 0 18px;
    margin-top: 12px;
}

.delete-btn {
    /* 根据实际需求调整样式 */
    flex: 1;
    height: 50px;
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: red;
    color: white;
    border-radius: 8px;
}

.share-btn {
    /* 根据实际需求调整样式 */
    flex: 1;
    height: 50px;
    align-items: center;
    justify-content: center;
    display: flex;
    // padding-top: 16px;
    background-color: $uni-color-gradient1;
    color: white;
    border-radius: 8px;
}

.copy-btn {
    flex: 1;
    margin-right: 12px;
    /* 设置按钮之间的间距 */
    background-color: $uni-color-f8f;
    color: $uni-color-333;
    border: 1px solid $uni-color-gradient1;
}

.component-button {
    flex: 1;
    // margin-left: 8px;
    /* 设置按钮之间的间距 */
    background-color: $uni-color-gradient1;
    color: $uni-color-fff;
}

/* 文字样式 */
.delete-btn .copy-btn span,
.component-button span {
    font-size: 14px;
    color: $uni-color-333;
    margin-bottom: 6px;
    /* 调整两行文字之间的间距 */
}

/* 第一行文字样式 */
.copy-btn .line1,
.component-button .line1 {
    font-size: 15px;
    font-weight: 500;
}

/* 第二行文字样式 */
.copy-btn .line2,
.component-button .line2 {
    font-size: 12px;
}
</style>