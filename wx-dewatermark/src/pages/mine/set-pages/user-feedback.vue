<script lang="ts" setup>
import { RequestApi } from '@/public/request';
import { ref } from 'vue';
import { GlobalData, UserInfo } from '@/public/common';

let feedback = ref<string>('')

const submitFeedback = () => {


  if (!feedback.value) {
    uni.showToast({
      title: '请输入建议和反馈内容',
      icon: 'none',
      duration: 2000,
    });
    return;
  }
  publishFeedback();


}
async function publishFeedback() {
  try {
    const requestData = {
      content: feedback.value,
      user_id: UserInfo.value?.user_id,
    };
    const res: any = await RequestApi.AddFeedback(requestData)
    uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
    if (res.code === 200) {
      // 延时一秒执行的操作
      setTimeout(() => {
        // 在这里写需要延时执行的代码
        uni.navigateBack({
          delta: 1, // 返回的页面数，1 表示返回上一页
        });
      }, 1000);

    } else {
    }
  } catch (error) {
    console.error(error)
    uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
  }
}
</script>

<template>
  <view class="feedback-container">
    <form>
      <view class="form-group">
        <label for="suggestion">您的建议和反馈：</label>
        <textarea id="suggestion" v-model="feedback" placeholder="请输入您的建议与反馈"></textarea>
      </view>
      <view class="form-group">
        <button type="submit" class="submit-button" @click.prevent="submitFeedback()">提交反馈</button>
      </view>
    </form>
  </view>
</template>

<style lang="scss" scoped>
.feedback-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}

form {
  margin: 0;
  padding: 0;
}

.form-group {
  flex: 1;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

label {
  display: block;
  margin-bottom: 10px;
}

textarea {
  height: 200px;
  resize: none;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}

.submit-button {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: none;
  background-color: #007aff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

html,
body {
  margin: 0;
  padding: 0;
}
</style>