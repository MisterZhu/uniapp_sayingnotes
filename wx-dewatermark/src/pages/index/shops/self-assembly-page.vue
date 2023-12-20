<template>
  <view class="container">
    <view>
      <HelpItem v-for="(item, index) in itmeAry" :key="index" :item-model="item" @click="handleItemClick" />
    </view>
    <!-- <button class="server-btn" open-type="contact" :bindcontact="handleContact">联系客服</button>
      <view class="title_bg">
        <p class="right_title">客服在线时间：工作日 9:00-12:00 13:30-18:00 周末有时也在线</p>
      </view> -->


  </view>
</template>
    
<script setup lang="ts">
import type { MineItemModel, ParkItem } from "@/public/decl-type";
import HelpItem from "../../mine/help-widget/help-item.vue";
import { onMounted, reactive, ref } from "vue";
import { RequestApi } from "@/public/request";

const size = 20
let page = 0
let analyAry = reactive({
  data: [] as ParkItem[]
})
const itmeAry = ref<MineItemModel[]>([]);

// const itmeAry = ref<MineItemModel[]>([
//   {
//     left_img: "/static/mine/mine-up-999.png",
//     left_title: "如何发布帖子？",
//     right_img: "/static/mine/mine-down-999.png",
//     right_title: "首先你需要在首页，点击左上角的小区，切换到自己的小区，然后再点击自己需要的功能（例如车位出租），点击右下角悬浮按钮发布，发布之前需要先进行业主身份认证，提交认证信息以后，管理员会在24小时内进行审核，如果着急，可以直接联系客服，给客服发消息，进行加急处理",
//     line_shou: true,
//     head_shou: false,
//     share_shou: false,
//     radius_type: 3,

//   },
//   {
//     left_img: "/static/mine/mine-up-999.png",
//     left_title: "如果无法使用，或者出现问题怎么办？",
//     right_img: "/static/mine/mine-down-999.png",
//     right_title: "请点击下方的“联系客服”按钮进行反馈",
//     line_shou: true,
//     head_shou: false,
//     share_shou: false,
//     radius_type: 3,

//   },
// ])

requestPostsList(() => { })

const handleItemClick = (itemModel: any) => {
  const index = itmeAry.value.findIndex(item => item === itemModel)

  console.log('clicked item:', index)
  itemModel.share_shou = !itemModel.share_shou
  itmeAry.value[index] = itemModel
}
async function requestPostsList(callback: () => void) {
  console.log('----------222--------');

  try {
    const res: any = await RequestApi.ShopsList({ "page": page, "size": size, "posts_type": 4, })
    if (typeof callback === 'function') {
      callback();
    }

    if (res.code === 200) {
      if (page === 0) {
        // 如果是第一页，直接将 analyAry.data 映射到 itmeAry
        itmeAry.value = res.data.map((item: { img_url: any; title: any; annual_rent: any; }) => ({
          left_img: "/static/mine/mine-up-999.png",
          left_title: item.title,
          right_img: "/static/mine/mine-down-999.png",
          right_title: item.annual_rent,
          line_shou: true,
          head_shou: false,
          share_shou: false,
          radius_type: 3,
        }));
      } else {
        // 如果不是第一页，将新数据添加到 itmeAry
        itmeAry.value = [...itmeAry.value, ...res.data.map((item: { img_url: any; title: any; annual_rent: any; }) => ({
          left_img: "/static/mine/mine-up-999.png",
          left_title: item.title,
          right_img: "/static/mine/mine-down-999.png",
          right_title: item.annual_rent,
          line_shou: true,
          head_shou: false,
          share_shou: false,
          radius_type: 3,
        }))];
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
// 在 mounted 时打印设备信息
onMounted(() => {
  console.log(uni.getSystemInfoSync())
})

// 处理联系客服事件
const handleContact = (event: any) => {
  console.log(event)
}

</script>
<style lang="scss" scoped>
.container {
  background-color: $uni-color-f8f;
  height: 100vh;
  padding-top: 5px;
}

.server-btn {
  width: 100%;
  top: 30px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: $uni-color-fff;
  background-color: $uni-color-gradient0;
  font-size: 16px;
  border-radius: 0;
}

.title_bg {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 45px;
  margin-left: 30px;
  margin-right: 30px;

}

.right_title {
  font-size: 14px;
  color: $uni-color-999;
  text-align: start;
}
</style>