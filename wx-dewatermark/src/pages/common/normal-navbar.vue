<template>
    <view class="custom-nav-bar" :style="{ backgroundColor: backgroundColor }">
      <view class="nav-bar-left" @tap="onLeftIconClick">
        <image class="nav-bar-icon" :src="leftIcon" :style="{ width: '28px', height: '28px', marginTop: topIconDistance + 'px', marginLeft: '5px' ,marginRight: '10px',marginBottom: '10px',paddingTop:'30px'}" />
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
      topIconDistance: {
        type: Number,
        default: 0
      }
    },
    setup(_props, { }) {
      const globalStore = useGlobalStore()
      const topIconDistance = computed(() =>  globalStore.menuTop + 12)
      console.log('topIconDistance', topIconDistance)
  
      const onLeftIconClick = () => {
        console.log('leftIconClick', 1)
        uni.navigateBack({
          delta: 1, // 返回的页面数，1 表示返回上一页
        });

    }
  
      return {
        topIconDistance,
        onLeftIconClick
      }
    }
  })
  </script>
  
  <style lang="scss">
  .custom-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 48px; /* 导航栏默认高度 */
    display: flex;
    align-items: center;
    background-color: transparent;
    z-index: 1000;
    padding: 0 10px;
    box-sizing: border-box;
  }
  
  /* .nav-bar-left {
    background-color: blueviolet;
  
  } */
  .nav-bar-left {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  </style>
  