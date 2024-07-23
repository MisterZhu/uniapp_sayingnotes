<template>
    <scroll-view class="content-view" :style="contentStyle" scroll-y @scrolltolower="onReachBottom"
      :refresher-triggered="isRefreshing" @refresherrefresh="handleRefresherRefresh" refresher-enabled="true"
      refresher-threshold="70" refresher-default-style="black" refresher-background="#fff">
      <!-- 这里可以添加滚动内容 -->
      <analyItem v-for="(item, index) in popupStore.analyAry.data" :key="index" :analy-model="item"></analyItem>

    </scroll-view>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { usePopupStore } from "@/stores/popup-store";
  import { useGlobalStore } from '@/stores/global';
  import analyItem from '@/pages/home/widget/analy-item.vue';

  const popupStore = usePopupStore();
  const isRefreshing = ref(false);
  var topIconDistance = ref(87);
  
  const contentStyle = computed(() => ({
    width: '100%',
    height: `calc(100vh - ${topIconDistance.value}px)`,
    marginTop: `${topIconDistance.value}px`,
    backgroundColor: '#FFFFFF'
  }));
  
  const handleRefresherRefresh = () => {
    console.log('下拉刷新');
    isRefreshing.value = true;
    setTimeout(() => {
      isRefreshing.value = false;
      uni.stopPullDownRefresh();
    }, 2000);
  };
  
  const onReachBottom = () => {
    console.log('触底加载更多');
    setTimeout(() => {
      // 添加触底加载更多逻辑
    }, 2000);
  };
  
  onMounted(() => {
    const globalStore = useGlobalStore();
    topIconDistance = computed(() => globalStore.topIconDistance + globalStore.statusBarHeight);
  });
  </script>
  
  <style scoped lang="scss">
  .content-view {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
  </style>
  