<template>
    <BackNavbar :backgroundColor="'rgba(255, 255, 255, 1)'"
        :leftIcon="'https://qiniu.aimissu.top/notes/common_back_icon.png'" :onLeftIconClick="customLeftIconClick">
    </BackNavbar>
    <view class="container" :style="contentStyle">
        <!-- 第一排：标题输入框 -->
        <view class="input-row">
            <input type="text" class="title-input" v-model="title" :maxlength="titleMaxLength" placeholder="请输入标题" />
        </view>

        <!-- 第二排：标题字节数统计 -->
        <view class="byte-counter">{{ titleByteLength }}/{{ titleMaxLength }}</view>
        <view class="divider"></view>

        <!-- 第三排：内容输入框 -->
        <view class="input-row2">
            <textarea class="content-input" v-model="content" :maxlength="contentMaxLength" placeholder="请输入内容"></textarea>

        </view>

        <!-- 第四排：内容字节数统计和保存按钮 -->
        <view class="footer">
            <view class="byte-counter2">{{ contentByteLength }}/{{ contentMaxLength }}</view>
            <span class="spacer"></span> <!-- 占用空间的 span -->
            <button class="save-button" @click="saveContent">保存</button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import type { ParkItem } from '@/public/decl-type';
import BackNavbar from '@/pages/common/normal-navbar.vue';
import { useGlobalStore } from '@/stores/global';

const title = ref<string>('');
const content = ref<string>('');

const titleMaxLength = 30; // 标题最多30个汉字
const contentMaxLength = 1500; // 内容最多1500个汉字
let parkModel = ref<ParkItem | null>(null);

// 获取顶部导航栏高度
var topIconDistance = ref(87);

const contentStyle = computed(() => ({
    width: '100%',
    display: 'flex',
    height: `calc(100vh - ${topIconDistance.value}px)`,
    marginTop: `${topIconDistance.value}px`,
    backgroundColor: '#FFFFFF',
}));

onMounted(() => {
    const globalStore = useGlobalStore();
    topIconDistance = computed(() => globalStore.topIconDistance + globalStore.statusBarHeight);
});
// 计算字节数
const getByteLength = (str: string) => {
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
};

// 计算标题字节数
const titleByteLength = computed(() => getByteLength(title.value));

// 计算内容字节数
const contentByteLength = computed(() => getByteLength(content.value));
// 接收参数
onLoad((options) => {
    if (options) {
        if ((options.detail_id ?? '').trim().length === 0) {
            // @ts-ignore
            parkModel.value = JSON.parse(decodeURIComponent(options.parkModel as string)) as ParkItem;
            console.log(`parkModel onLoad title: ${parkModel.value?.title}`);
            console.log(`parkModel onLoad user_id: ${parkModel.value?.user_id}`);
            title.value = parkModel.value?.title;
            content.value = parkModel.value?.address;
        } else {
            console.log('share detail_id = 没有收到参数');
        }
    }
});
// 保存内容
const saveContent = () => {
    // 保存逻辑，比如发送请求或存储到本地
    console.log('Title:', title.value);
    console.log('Content:', content.value);
    uni.showToast({
        title: '保存成功',
        icon: 'success',
    });
};
const customLeftIconClick = () => {
    console.log('Custom left icon click handler');
    // 自定义点击处理逻辑
    // uni.navigateBack({
    //     delta: 1, // 返回的页面数，1 表示返回上一页
    //   })
    // 使用 redirectTo 替代 navigateTo
    uni.redirectTo({
        url: '/pages/home/home',
    });
};
</script>

<style >
.container {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    box-sizing: border-box;
}

.input-row {
    margin-bottom: 20rpx;
    height: 80rpx;
    display: flex; /* 使用flex布局 */
    align-items: flex-start; /* 垂直对齐到顶部 */
    justify-content: center; /* 水平居中 */
}
.input-row2 {
    margin-bottom: 220rpx;
    flex-grow: 1; /* 占用剩余的空间 */

}
.title-input {
    border: none;
    font-size: 32rpx;
    color: #000;
    width: 100%; /* 根据需要设置宽度 */
    height: 100%; /* 根据需要设置高度 */
}

.content-input {
    border: none;
    border-radius: 4rpx;
    font-size: 30rpx;
    width: calc(100%); 
    height: 100%; /* 设置高度为100% */
    resize: none;
    color: #111;
    line-height: 1.5; /* 设置行高 */
    overflow: auto; /* 允许显示滚动条 */

}

.byte-counter {
    text-align: left; /* 修改对齐方式 */
    /* margin-bottom: 20rpx; */
    font-size: 28rpx;
    color: #999;
    height: 50rpx;

}
.byte-counter2 {
    text-align: left; /* 修改对齐方式 */
    margin-bottom: 20rpx;
    font-size: 28rpx;
    color: #999;
    height: 50rpx;

}
.divider {
    height: 1px; /* 分割线的高度 */
    background-color: #efefef; /* 分割线的颜色 */
    margin: 10rpx 0rpx 20rpx 0rpx; /* 分割线上下的间距 */
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    width: calc(100% - 40rpx); 

    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    background-color: #fff;
    height: 100rpx;

}

.spacer {
    flex-grow: 1; /* 占用中间空余的空间 */
}

.save-button {
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 40rpx;
    cursor: pointer;
    font-size: 32rpx; /* 字体大小 */
    font-weight: 600; /* 字体粗细，500为中等粗细 */
    line-height: 80rpx; /* 高度等于字体大小 */
    padding: 0 20rpx; /* 上下内边距为0，左右内边距为20rpx，调整左右间距 */
    width: 150rpx; /* 固定宽度 */
}

.save-button:active {
    background-color: #005bb5;
}
</style>
