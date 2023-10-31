  
<script setup lang="ts">
import type { Analysis } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { ref, type PropType } from 'vue';
const isSelected = ref(false);


const props = defineProps({
    analyModel: {
        type: Object as PropType<Analysis>,
        required: true,
    },
});
const toggleSelection = () => {
    isSelected.value = !isSelected.value;
    uni.navigateTo({
    url: '/pages/mine/house/certifi-house'
  })
}

</script>

<template>
    <view class="custom-component" @click="toggleSelection">
        <view class="selection-button" :class="{ selected: isSelected }"></view>
        <view class="content">
            <text class="component-title">瀚宇天悦湾2号院</text>
            <text class="component-text">荥阳市兴华路与龙岗南路交叉口西北侧</text>
        </view>
    </view>
    <view class="divider"></view>

</template>

<style lang="scss" scoped>
.custom-component {
    padding: 0 15px;
    display: flex;
    flex-direction: row; /* 水平排列 */
    justify-content: space-between; /* 水平分散对齐 */
    align-items: center; /* 垂直居中对齐 */
    cursor: pointer;
}

.selection-button {
    width: 15px;
    height: 15px;
    margin-right: 15px; /* 调整选择按钮与标题的距离 */
    border: 1px solid #ccc; /* 未选中时的边框颜色 */
    border-radius: 50%; /* 使按钮成圆形 */
    transition: background-color 0.3s, border-color 0.3s;
}

.selection-button.selected {
    background-color: orange; /* 选中时的背景色 */
    border-color: orange; /* 选中时的边框颜色 */
}

.content {
    flex: 1; /* 填充剩余空间 */
    display: flex;
    flex-direction: column; /* 垂直排列标题和内容 */
}

.component-title {
    margin-top: 12px;
    margin-bottom: 5px;
    font-size: 16px;
    color: $uni-theme-text-color;
}

.component-text {
    margin-bottom: 12px;
    font-size: 14px;
    color: $uni-theme-text-333;
}

.divider {
    width: 100%;
    height: 1px;
    background-color: #ddd;
    margin-top: 5px;
}
</style>