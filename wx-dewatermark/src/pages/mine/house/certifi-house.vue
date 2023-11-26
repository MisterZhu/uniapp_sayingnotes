<template>
  <view class="container">
    <view class="result-box">
					<text>社区：瀚宇天悦湾2号院</text>
				</view>
    <uni-card is-full :is-shadow="false">
      <text class="uni-h6">请选择正确的房号、并上传购房合同（房号页面）照片或其他证明信息证明是该小区业主，也可联系客服（我的->帮助中心->联系客服）说明情况</text>
    </uni-card>
    <uni-section title="房屋信息" sub-title="请选择你购房合同中对应的房号" type="line" padding style="height: calc(100vh - 100px);">
      <uni-data-picker placeholder="请选择房号" popup-title="请选择房屋信息" :localdata="classes" v-model="selectedClass"
        @change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened"
        @popupclosed="onpopupclosed"></uni-data-picker>
    </uni-section>
    <uni-section title="上传图片" sub-title="请上传合同(房号页面)照片或其他能证明你是业主身份的照片" type="line" padding
      style="height: calc(100vh - 100px);">
      <view class="example-body">
        <uni-file-picker limit="1" title=""></uni-file-picker>
      </view>
    </uni-section>
    <uni-section title="手机号" subTitle="用于绑定该小程序" type="line" padding>
      <uni-easyinput class="uni-mt-5" trim="all" v-model="phoneNum" placeholder="请输入手机号"
        @input="inputAction"></uni-easyinput>
    </uni-section>
    <view class="divider"></view>
    <!-- 添加按钮 -->
    <!-- <button class="server-btn" open-type="contact" :bindcontact="handleItemClick">联系客服</button> -->
    <button class="server-btn" @click="handleItemClick">新增</button>

    <view class="divider"></view>

  </view>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import jsonData from "@/static/floor.json"
import { onLoad } from '@dcloudio/uni-app';
import type { CommunityItem } from '@/public/decl-type';

const selectedClass = ref(' '); // 存储选择的班级
const classes = ref<Array<any>>([]); // 用于存储本地JSON数据
const phoneNum = ref(''); // 存储选择的班级
let communityModel = ref<CommunityItem | null>(null)

// 接收参数
onLoad(options => {
  // @ts-ignore
  communityModel.value = JSON.parse(decodeURIComponent(options.communityModel as string)) as CommunityItem
  console.log(`communityModel onLoad: ${communityModel.value.detail_name}`);
});
const handleItemClick = (itemModel: any) => {
  // uni.navigateTo({
  //   url: '/pages/mine/house/select-community'
  // })
  uni.switchTab({
	url: '/pages/mine/mine'
});
}
// 异步加载本地JSON数据
onMounted(() => {
  classes.value = jsonData; // 将JSON数据赋值给classes
});

const onnodeclick = (e: any) => {
  console.log(e);
};
const inputAction = (e: any) => {
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
  
<style lang="scss" scoped>

.result-box {
		text-align: start;
		padding: 10px 15px;
		font-size: 14px;
    font-weight: 400;
	}
.example-body {
  padding: 10px;
  padding-top: 0;
}

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
  height: 10px;
  /* 分割线的高度 */
  background-color: transparent;
  /* 分割线的颜色 */
  margin-top: 0px;
  /* 分割线与上方元素的间隔 */
}

.server-btn {
  display: flex;
  justify-content: center;
  height: 40px;
  line-height: 40px;
  /* 等于按钮高度 */
  background-image: linear-gradient(to bottom, $uni-color-gradient0, $uni-color-gradient1);
  color: $uni-color-fff;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 22px;
  margin-left: 22px;

}
</style>
  