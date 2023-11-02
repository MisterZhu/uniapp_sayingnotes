  
<script setup lang="ts">
import type { Analysis } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import type { PropType } from 'vue';


const props = defineProps({
    analyModel: {
        type: Object as PropType<Analysis>,
        required: true,
    },
});

const copyHandle = async () => {

    uni.setClipboardData({
        // @ts-ignore
        data: props.analyModel.origin_url,
        success() {
            uni.showToast({
                title: '复制成功'
            })
        }
    })
}
// MARK: 解析链接
async function requestAnalysisUrl(url: string) {
    try {
        const res: any = await RequestApi.HomeAnalysis({ "url": url })
        console.log("res = " + res)
        if (res.code === 200) {
            // analyModel = res.data
            // 跳转到二级页面并传递参数
            uni.navigateTo({
                url: '/pages/index/analysis-result?analyModel=' + encodeURIComponent(JSON.stringify(res.data))
            })
        } else {
            uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
        }
    } catch (error) {
        console.error(error)
        uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
    }
}

const handleSubmit = async () => {
    if (props.analyModel.origin_url != '') {
        const str = props.analyModel.origin_url
        if (str.includes('http://') || str.includes('https://')) {
            requestAnalysisUrl(str ?? '')
        } else {
            uni.showToast({ title: '输入的链接格式不正确', icon: 'none', duration: 2000 })
        }
    } else {
        uni.showToast({ title: '请输入要解析的链接', icon: 'none', duration: 2000 })
    }
}
</script>

<template>
    <view class="custom-component">
        <view class="label-container">
            <view class="left-section">
                <view class="house-label">房屋</view>
                <text class="component-title">瀚宇天悦湾2号院</text>
            </view>
            <view class="house-right">认证中</view>
        </view>
        <text class="component-text">2号楼1单元27层2702室</text>
        <view class="divider"></view>

    </view>
</template>
  
<style lang="scss" scoped>
.custom-component {
    padding: 0 15px;
    /* 左右边距为15像素 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.label-container {
    display: flex;
    justify-content: space-between;
    /* 将左右两侧分开 */
    align-items: center;
    /* 垂直居中对齐 */
    width: 100%;
    margin-top: 5px;

}

.left-section {
    display: flex;
    /* 让 "房屋" 和标题在同一行 */
    align-items: center;
    /* 垂直居中对齐 "房屋" 和标题 */
}

.house-label {
    border: 1px solid $uni-theme-btn-color;
    /* 1px边框，颜色为橙色 */
    border-radius: 4px;
    /* 圆角为10px */
    background: transparent;
    /* 背景为透明 */
    padding: 0px 5px;
    /* 控制文本的内边距，使其有空间 */
    margin-top: 12px;
    /* 上方间距 */
    margin-bottom: 8px;
    /* 下方间距 */
    font-weight: normal;
    /* 文本加粗 */
    color: $uni-theme-btn-color;
    /* 文本颜色为白色 */
    font-size: 12px;
}

.house-right {
    border-radius: 4px;
    /* 圆角为10px */
    background: rgba(255, 166, 0, 0.1);
    /* 背景为透明 */
    padding: 4px 5px;
    /* 控制文本的内边距，使其有空间 */
    font-weight: normal;
    /* 文本加粗 */
    color: $uni-theme-btn-color;
    /* 文本颜色为白色 */
    font-size: 14px;
    margin-top: 2px;
}

.component-title {
    margin-left: 8px;
    margin-top: 5px;
}


.component-text {
    margin-bottom: 5px;
    margin-top: 2px;

    color: $uni-color-666;
    /* 文本颜色为白色 */
    font-size: 14px;

    /* component-title 和 component-text 之间的间隔 */
}

.divider {
    width: 100%;
    /* 横向分割线 */
    height: 1px;
    /* 分割线的高度 */
    background-color: #eee;
    /* 分割线的颜色 */
    margin-top: 5px;
    /* 分割线与上方元素的间隔 */
}</style>
  