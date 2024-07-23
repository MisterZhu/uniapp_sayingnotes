<template>
    <view v-if="popupStore.isVisible" class="popup-mask" @click="hidePopup">
      <view class="popup" @click.stop>
        <view class="popup-content">
          <!-- Add your content here -->
          <view class="bottom-content">
            <button class="cancel-btn" @click="cancelRecording">取消</button>
            <text class="center-text">{{ formattedTime }}/3:00</text>
            <button class="finish-btn" @click="finishRecording">完成</button>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, watch, onUnmounted } from 'vue';
  import  { usePopupStore } from "@/stores/popup-store";
  
  const popupStore = usePopupStore();
  
  const formattedTime = ref('00:00');
  const recording = ref(false);
  let interval = null;
  const startTime = ref(0);
  const tempFilePath = ref('');
  
  const hidePopup = () => {
    console.log('hidePopup', 1);
  
    popupStore.hidePopup();
  
    recording.value = false;
    formattedTime.value = '00:00';
    startTime.value = 0;
    tempFilePath.value = '';
  
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };
  // Watch for changes in the visibility prop
  watch(() => popupStore.isVisible, (newVal) => {
    if (newVal) {
      startRecording();
    }
  });
  const startRecording = () => {
    console.log('RstartRecording', 1);
  
  
    if (recording.value) return;
  
    recording.value = true;
    popupStore.startRecording();
  
    startTime.value = 0;
  
    const recorderManager = uni.getRecorderManager();
    recorderManager.start({
      duration: 180000, // 3 minutes
      format: 'mp3'
    });
  
    recorderManager.onStop((res) => {
      console.log('Recording stopped', res);
      tempFilePath.value = res.tempFilePath;
      hidePopup();
      popupStore.finishRecording();
  
    });
  
    recorderManager.onError((err) => {
      console.error('Recording error', err);
      hidePopup();
      popupStore.resetRecording();
  
    });
  
    interval = setInterval(() => {
      if (!recording.value) {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        return;
      }
  
      startTime.value += 1;
      const minutes = Math.floor(startTime.value / 60);
      const seconds = startTime.value % 60;
  
      if (startTime.value >= 180) { // More than 3 minutes
        recorderManager.stop();
      }
  
      // formattedTime.value = ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds};
      formattedTime.value = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
    }, 1000);
  };
  
  const cancelRecording = () => {
  
    console.log('cancelRecording', 1);
  
    // if (!recording.value) return;
  
    const recorderManager = uni.getRecorderManager();
    recorderManager.stop();
  
    // recorderManager.onStop((res) => {
    //   console.log('Recording paused', res);
    //   tempFilePath.value = res.tempFilePath;
    //   recording.value = false;
    // });
  
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    popupStore.stopRecording();
  
    hidePopup();
  
  };
  const finishRecording = () => {
    console.log('finishRecording', 1);
  
    if (!recording.value) return;
  
    const recorderManager = uni.getRecorderManager();
    recorderManager.stop();
  
    recorderManager.onStop((res) => {
      console.log('Recording paused', res);
      tempFilePath.value = res.tempFilePath;
      recording.value = false;
  
      // Play recorded audio
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.src = res.tempFilePath;
      innerAudioContext.play();
    });
  
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    popupStore.finishRecording();
  
  }
  // Cleanup on component unmount
  onUnmounted(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
  </script>
  
  <style>
  .popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999; /* Ensure mask is above all elements */
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  
  .popup-content {
    width: 100%;
    height: 80%;
    background: #fff;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    padding: 40rpx;
    box-sizing: border-box;
    overflow-y: auto;
  }
  
  .close-button {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
  }
  
  .popup {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85%;
    background-color: #fff;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    z-index: 1000;
    box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.15);
  }
  
  .bottom-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 80rpx;
    padding: 20rpx;
    width: calc(100% - 80rpx);
    height: 80rpx !important;
    position: absolute;
    bottom: 100rpx;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    background-color: rgb(26, 25, 29);
  }
  
  .cancel-btn {
    background-color: #666666;
    color: #ffffff;
    border: none;
    border-radius: 40rpx;
    width: 180rpx !important;
    height: 80rpx !important;
    position: absolute;
    left: 20rpx;
    top: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .finish-btn {
    background-color: #dd765c;
    color: #ffffff;
    border: none;
    border-radius: 40rpx;
    width: 180rpx !important;
    height: 80rpx !important;
    position: absolute;
    right: 20rpx;
    top: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .center-text {
    text-align: center;
    width: 240rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20rpx;
    line-height: 80rpx;
    color: #ffffff;
  }
  </style>