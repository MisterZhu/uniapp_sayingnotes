import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { RequestApi } from "../public/request";
import type { ParkItem } from '../public/decl-type';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    isVisible: false,
    isRecording: false,
    isFinished: false,
    analyAry: reactive({ data: [] as ParkItem[] }),
    page: 0,
    size: 20
  }),
  actions: {
    showPopup() {
      this.isVisible = true;
    },
    hidePopup() {
      this.isVisible = false;
    },
    startRecording() {
      this.isRecording = true;
    },
    stopRecording() {
      this.isRecording = false;
    },
    finishRecording() {
      this.isFinished = true;
    },
    resetRecording() {
      this.isFinished = false;
      this.isRecording = false;
    },
    addParkItem(item: ParkItem) {
      if (!this.analyAry) {
        this.analyAry = reactive({ data: [] });
      }
      this.analyAry.data.push(item);
      // 手动触发更新
      this.analyAry.data = [...this.analyAry.data];
    },
    async requestPostsList(callback?: () => void) {
      console.log('----------222--------');

      try {
        const res: any = await RequestApi.ShopsList({ "page": this.page, "size": this.size });
        if (typeof callback === 'function') {
          callback();
        }

        if (res.code === 200) {
          if (this.page === 0) {
            this.analyAry.data = res.data;
            console.log('0');
          } else {
            console.log('>0');
            this.analyAry.data = [...this.analyAry.data, ...res.data];
          }
        } else {
          uni.showToast({ title: res.msg, icon: 'none', duration: 2000 });
        }
      } catch (error) {
        if (callback) {
          callback();
        }
        console.error(error);
        uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 });
      }
    },
    onPullDownRefresh() {
      console.log('下拉刷新的事件');
      // 1. 重置关键数据
      this.page = 0;
      this.analyAry.data = [] as ParkItem[];
      // 2. 重新发起请求
      this.requestPostsList(() => uni.stopPullDownRefresh());
    },
    onReachBottom() {
      console.log('触底的事件');
      this.page++;
      this.requestPostsList();
    }
  }
});
