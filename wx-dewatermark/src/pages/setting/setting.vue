<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import { reactive, ref, watch } from 'vue';
import BackNavbar from '../common/normal-navbar.vue';
import { common_url } from '@/public/common';
import type { MineItemModel } from '@/public/decl-type';

import MineItem from './widget/mine-item.vue';
import MineHeader from './widget/mine-header.vue';
const props = defineProps({
  coverSrc: String
});
const size = 20
let page = 0
const indexType = ref(1);
let menu_top = ref<string>('')

const itmeAry = <MineItemModel[]>[
    {
      left_img: "/static/mine/mine_secunity1.png",
        left_title: "隐私政策",
        right_img: "/static/mine/mine-next-999.png",
        right_title: "",
        line_shou: true,
        head_shou: false,
        share_shou: false,
        radius_type: 1,

    },
    {
      left_img: "/static/mine/mine_agreement.png",
        left_title: "用户协议",
        right_img: "/static/mine/mine-next-999.png",
        right_title: "",
        line_shou: false,
        head_shou: false,
        share_shou: false,
        radius_type: 2,

    },
    {
      left_img: "/static/mine/mine_fankui.png",
        left_title: "建议反馈",
        right_img: "/static/mine/mine-next-999.png",
        right_title: "",
        line_shou: false,
        head_shou: true,
        share_shou: false,
        radius_type: 3,
    },
]
//接收参数
onShow(() => {
  let that = this
  // 移除之前的事件监听器
  uni.$off('isUsedRefresh');
  uni.$on('isUsedRefresh', function (data) {
    console.log('3监听到事件来自返回的参数：' + data);
    if (data === 1) {
      console.log('3 isUsedRefresh' + data);
    }
    // TODO 下面执行刷新的方法
  })
});
onLoad(options => {
  // @ts-ignore
  uni.setNavigationBarTitle({
      title: ''
    });

});


const handleButtonClick = () => {
  // Assuming 'uni' is a valid object that can call 'navigateTo'
  uni.navigateTo({
    url: '/pages/index/used/publish-used',
  });
};

watch(
  () => props.coverSrc,
  (newValue) => {
    console.log(`title watch coverSrc: ${newValue}`);
  },
  { immediate: true }
);
const handleItemClick = (itemModel: any) => {
    console.log('clicked item:', itemModel.left_title)
    switch (itemModel.left_title) {
        case '隐私政策':
            uni.navigateTo({
                url: '/pages/mine/set-pages/user-privacy'
            })
            break;
        case '用户协议':
            uni.navigateTo({
                url: '/pages/mine/set-pages/user-protocol'
            })
            break;
        case '建议反馈':
            uni.navigateTo({
                url: '/pages/mine/set-pages/user-feedback'
            })
            break;
        default:
            break;
    }
}
</script>

<template>
  <BackNavbar
    :backgroundColor="'rgba(0, 0, 0, 0)'"
    :leftIcon="common_url.common_back"
  >
  </BackNavbar>
  <view class="container">
        <view class="header">
            <MineHeader></MineHeader>
        </view>
        <view class="group">
            <MineItem v-for="(item, index) in itmeAry" :key="index" :item-model="item" @click="handleItemClick" />
        </view>

    </view>
</template>

<style lang="scss" scoped>
.group {
  margin-top: 20px; /* 在 group 元素上添加上边距 */
}
.container {
    background-color: $uni-color-f5f;
    height: 100vh;
}


</style>
