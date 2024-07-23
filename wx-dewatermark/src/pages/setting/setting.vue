<script setup lang="ts">
import type { ParkItem } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { onLoad, onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app';
import { reactive, ref, watch } from 'vue';
import shopItem from '@/pages/index/shops/widget/shop-item.vue';
import BackNavbar from '../common/normal-navbar.vue';

const props = defineProps({
  coverSrc: String
});
// let analyAry = ref([] as Analysis[])
let analyAry = reactive({
  data: [] as ParkItem[]
})
const size = 20
let page = 0
const indexType = ref(1);

//接收参数
onShow(() => {
  let that = this
  // 移除之前的事件监听器
  uni.$off('isUsedRefresh');
  uni.$on('isUsedRefresh', function (data) {
    console.log('3监听到事件来自返回的参数：' + data);
    if (data === 1) {
      console.log('3 isUsedRefresh' + data);

      requestPostsList(() => {
        // TODO 下面执行刷新的方法
      });
    }
    // TODO 下面执行刷新的方法
  })
});
onLoad(options => {
  // @ts-ignore
  uni.setNavigationBarTitle({
      title: '666666'
    });
  requestPostsList(() => { })

});
// MARK: 解析记录
async function requestPostsList(callback: () => void) {
  console.log('----------222--------');

  try {
    const res: any = await RequestApi.ShopsList({ "page": page, "size": size, "posts_type": indexType.value,})
    if (typeof callback === 'function') {
      callback();
    }

    if (res.code === 200) {
      if (page === 0) {
        analyAry.data = res.data
        console.log('0')

      } else {
        console.log('>0')

        analyAry.data = [...analyAry.data, ...res.data]
      }
    } else {
      uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
    }
  } catch (error) {
    callback && callback()
    console.error(error)
    uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
  }
}


// 下拉刷新的事件
onPullDownRefresh(() => {
  console.log('下拉刷新的事件');
  // 1. 重置关键数据
  page = 0
  analyAry.data = [] as ParkItem[]
  // 2. 重新发起请求
  requestPostsList(() => uni.stopPullDownRefresh())
});
const handleButtonClick = () => {
  // Assuming 'uni' is a valid object that can call 'navigateTo'
  uni.navigateTo({
    url: '/pages/index/used/publish-used',
  });
};

// 触底的事件
onReachBottom(() => {
  console.log('触底的事件');
  page++
  requestPostsList(() => { })
});
watch(
  () => props.coverSrc,
  (newValue) => {
    console.log(`title watch coverSrc: ${newValue}`);
  },
  { immediate: true }
);

// Method to add a new local item
const addNewItem = () => {
  const newItem: ParkItem = {
    ID: Date.now(),
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
    DeletedAt: '',
    in_maintenance: false,
    negotiable: false,
    state: 1,
    posts_type: indexType.value,
    user_id: 'user123',
    telephone: '1234567890',
    wei_xin: 'wx123',
    title: 'New Park Item',
    img_url: 'https://qiniu.aimissu.top/common_img/home_head_bg.png',
    annual_rent: '1000',
    address: '123 Park St'
  };
  analyAry.data.push(newItem);
};
// 下拉刷新的事件
onPullDownRefresh(() => {
  console.log('下拉刷新的事件');
  const newItem: ParkItem = {
    ID: Date.now(),
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
    DeletedAt: '',
    in_maintenance: false,
    negotiable: false,
    state: 1,
    posts_type: indexType.value,
    user_id: 'user123',
    telephone: '1234567890',
    wei_xin: 'wx123',
    title: 'New Park Item',
    img_url: 'https://qiniu.aimissu.top/common_img/home_head_bg.png',
    annual_rent: '1000',
    address: '123 Park St'
  };
  analyAry.data.push(newItem);
  uni.stopPullDownRefresh();
});
// 触底的事件
onReachBottom(() => {
  console.log('触底的事件');
  const newItem: ParkItem = {
    ID: Date.now(),
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
    DeletedAt: '',
    in_maintenance: false,
    negotiable: false,
    state: 1,
    posts_type: indexType.value,
    user_id: 'user123',
    telephone: '1234567890',
    wei_xin: 'wx123',
    title: 'New Park Item',
    img_url: 'https://qiniu.aimissu.top/common_img/home_head_bg.png',
    annual_rent: '1000',
    address: '123 Park St'
  };
  analyAry.data.push(newItem);
});
</script>

<template>
  <!-- <BackNavbar
    :backgroundColor="'rgba(0, 0, 0, 0)'"
    :leftIcon="'https://qiniu.aimissu.top/notes/common_back_icon.png'"
  >
  </BackNavbar> -->
  <view v-show="analyAry.data.length > 0" >
    <shopItem v-for="(item, index) in analyAry.data" :key="index" :analy-model="item"></shopItem>
  </view>
  <view v-show="analyAry.data.length <= 0">
    <button @click="addNewItem" class="center-button">Add New Item</button>
  </view>
</template>

<style lang="scss" scoped>


.text {
  font-size: 14px;
  /* 文字大小 */
}

.center-button {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
</style>
