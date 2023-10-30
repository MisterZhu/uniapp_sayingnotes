<template>
    <view>
      <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange"
        :value="multiIndex" :range="multiArray">
        <view class="picker">
          {{ multiArray[0][multiIndex[0]] }} > {{ multiArray[1][multiIndex[1]] }}
        </view>
      </picker>
    </view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const multiArray = ref([[], []]);
  const multiIndex = ref([0, 0]);
  const array = ref([
    {
      id: 0,
      name: '大类1',
      children: [
        {
          id: 10,
          name: '小类1'
        },
        {
          id: 11,
          name: '小类11'
        }
      ]
    },
    {
      id: 1,
      name: '大类2',
      children: [
        {
          id: 20,
          name: '小类2'
        }
      ]
    }
  ]);
  const oneId = ref(0);
  const twoId = ref(0);
  
  const initData = () => {
    const arrOne = array.value.map(item => {
      return item.name;
    });
    const arrTwo = array.value[0].children.map(item => {
      return item.name;
    });
    multiArray.value[0] = arrOne;
    multiArray.value[1] = arrTwo;
    oneId.value = array.value[0].id;
    twoId.value = array.value[0].children[0].id;
  };
  
  const bindMultiPickerColumnChange = (e) => {
    if (e.detail.column === 0) {
      initSelect(e.detail.value);
      multiIndex.value[0] = e.detail.value;
    } else if (e.detail.column === 1) {
      multiIndex.value[1] = e.detail.value;
      twoId.value = array.value[multiIndex.value[0]].children[multiIndex.value[1]].id;
    }
  };
  
  const initSelect = (index) => {
    oneId.value = array.value[index].id;
    multiIndex.value[1] = 0;
    multiArray.value[1] = [];
    if (array.value[index].children.length === 0) {
      twoId.value = "";
    } else {
      const arrTwo = array.value[index].children.map(item => {
        return item.name;
      });
      multiArray.value[1] = arrTwo;
      twoId.value = array.value[index].children[0].id;
    }
  };
  
  const bindMultiPickerChange = (e) => {
    console.log(oneId.value);
    console.log(twoId.value);
    // 处理选中后的逻辑...
  };
  
  onMounted(() => {
    // 在组件加载后调用 getType() 以初始化数据
    // getType();
    setTimeout(() => {
      initData();
    }, 1000);
  });
  
  const getType = () => {
    // 清场请求类型数据
    uni.request({
      url: 'https://xxxxxxxx/station/getTypeGoods',
      success: (res) => {
        console.log(res.data);
        array.value = res.data.types.map((item, index) => {
          return {
            ...item,
            children: res.data.goods[index]
          };
        });
        console.log('array', array.value);
      }
    });
  };
  </script>
  
  <style>
  .uni-picker-tips {
    font-size: 12px;
    color: #666;
    margin-bottom: 15px;
    padding: 0 15px;
    /* text-align: right; */
  }
  </style>
  