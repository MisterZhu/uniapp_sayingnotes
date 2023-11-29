<!-- cus-picker.vue -->

<template>
    <div class="my-picker">
      <div class="mask" @click="closePicker"></div>
      <div class="picker-container">
        <div class="header">
          <span @click="closePicker">取消</span>
          <span>选择社区</span>
          <span @click="confirmSelection">确定</span>
        </div>
        <div class="picker-body">
          <div class="picker-list" ref="pickerList">
            <div v-for="(item, index) in communityAry" :key="index" @click="selectItem(index)">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';
  interface CommunityItem {
    id: string;
    name: string;
  }
  
  const { communityAry } = defineProps(['communityAry']);
  const selectedCommunity = ref<CommunityItem | null>(null);
  
  const closePicker = () => {
    // @ts-ignore
    emit('close');
  };
  
  const confirmSelection = () => {
    // @ts-ignore
    emit('confirm', selectedCommunity.value?.name);
    closePicker();
  };
  
  const selectItem = (index: number) => {
    selectedCommunity.value = communityAry[index];
  };
  
  onMounted(() => {
    // Do something on component mount
  });
  
  onBeforeUnmount(() => {
    // Do something before component unmount
  });
  </script>
  
  <style scoped>
  /* Your styles go here */
  </style>
  