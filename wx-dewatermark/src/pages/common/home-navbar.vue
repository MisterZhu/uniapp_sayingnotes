<template>
  <view class="custom-nav-bar" :style="{ backgroundColor: backgroundColor , height: topIconDistance + 'px'}">
    <view class="nav-bar-left" @tap="onLeftIconClick">
        <image class="nav-bar-icon" :src="leftIcon" :style="{ width: '28px', height: '28px', paddingTop: '8px' ,paddingLeft: '10px' ,paddingRight: '10px',paddingBottom: '6px'}"/>
      </view>
    </view>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useGlobalStore } from '../../stores/global'
  
  export default defineComponent({
    props: {
      backgroundColor: {
        type: String,
        default: '#ffffff'
      },
      leftIcon: {
        type: String,
        required: true
      },
      statusBarH: {
      type: Number,
      default: 0
    },
      topIconDistance: {
        type: Number,
        default: 0
      }
    },
    setup(_props, { emit }) {
      const globalStore = useGlobalStore()
      const topIconDistance = computed(() => globalStore.topIconDistance)
    const statusBarH = computed(() => globalStore.statusBarHeight)
  
      const onLeftIconClick = () => {
        console.log('leftIconClick', 1)
        emit('leftIconClick')
      }
  
      return {
        topIconDistance,
        statusBarH,
        onLeftIconClick
      }
    }
  })
  </script>
  
  <style lang="scss">
 .custom-nav-bar {
  flex-direction: column-reverse;
  align-items: flex-start; /* 子组件在左侧对齐 */
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  color: #000;
  z-index: 1000;
  padding: 0;
  box-sizing: border-box;
}

.nav-bar-left {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
  
  </style>
  