<template>
    <view class="container">
      <uni-card is-full :is-shadow="false">
        <text class="uni-h6">标签组件多用于商品分类、重点内容显示等场景。</text>
      </uni-card>
      <view class="divider"></view>

      <uni-section title="房屋信息" type="line" padding style="height: calc(100vh - 100px);">
        <uni-data-picker
          placeholder="请选择房号"
          popup-title="请选择房屋信息"
          :localdata="classes"
          v-model="selectedClass"
          @change="onchange"
          @nodeclick="onnodeclick"
          @popupopened="onpopupopened"
          @popupclosed="onpopupclosed"
        ></uni-data-picker>
      </uni-section>
    </view>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import  jsonData  from  "@/static/floor.json"

  const selectedClass = ref(' '); // 存储选择的班级
  const classes = ref<Array<any>>([]); // 用于存储本地JSON数据
  
  // 异步加载本地JSON数据
  onMounted(() => {
    classes.value = jsonData; // 将JSON数据赋值给classes
  });
  
  const onnodeclick = (e: any) => {
    console.log(e);
  };
  
  const onpopupopened = (e: any) => {
    console.log('popupopened');
  };
  
  const onpopupclosed = (e: any) => {
    console.log('popupclosed');
  };
  
  const onchange = (e: any) => {
    console.log('change');
  };
  </script>
  
  <style>
  .uni-h6 {
    font-size: 13px;
    font-weight: normal;
    color: #FF6C00;
  }
  
  .data-pickerview {
    height: 400px;
    border: 1px #e5e5e5 solid;
  }
  
  .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #EBEEF5;
  }
  .divider {
    width: 100%;
    /* 横向分割线 */
    height: 1px;
    /* 分割线的高度 */
    background-color: #fff;
    /* 分割线的颜色 */
    margin-top: 5px;
    /* 分割线与上方元素的间隔 */
}
  </style>
  