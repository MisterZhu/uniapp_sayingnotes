<template>
  <view class="container">
    <uni-card :is-shadow="false" is-full>
			<text class="uni-h6">所填个人信息（手机号和微信号），只允许本小区实名认证通过的业主查看，可放心填写</text>
		</uni-card>
    <uni-card :is-shadow="false">
      <uni-easyinput :inputBorder="false" type="textarea" v-model="baseFormData.introduction"
        placeholder="请输入车位详细介绍（例如：车位在几号楼下哪个区）" />
      <view class="example-body">
        <uni-file-picker limit="1" title=""></uni-file-picker>
      </view>
    </uni-card>
    <view class="example">
      <uni-forms ref="baseForm" :modelValue="baseFormData" label-position="left">

        <uni-forms-item label="租金" required>
          <uni-data-select v-model="value" :localdata="range" @change="onchange" :clear="false"  placeholder="请选择" ></uni-data-select>
        </uni-forms-item>

        <uni-forms-item label="手机号" required>
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入联系方式" />
        </uni-forms-item>

        <uni-forms-item label="微信号" >
          <uni-easyinput v-model="baseFormData.name" placeholder="（选填项）可让租客加微信联系" />
        </uni-forms-item>

        <uni-forms-item label="是否包含理费" required>
          <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
        </uni-forms-item>

        <uni-forms-item label="能否还价" required>
          <uni-data-checkbox v-model="baseFormData.hobby" :localdata="hobbys" />
        </uni-forms-item>

      </uni-forms>
    </view>
  </view>
  <button class="server-btn" @click="handleItemClick">发布</button>
  <view class="divider"></view>

</template>


<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

// 基础表单数据
let baseFormData = {
  name: '',
  age: '',
  introduction: '',
  sex: 2,
  hobby: [5],
  datetimesingle: 1627529992399
};

// 单选数据源
let sexs = [{
  text: '包含',
  value: 0
}, {
  text: '不包含',
  value: 1
}, {
  text: '可协商',
  value: 2
}];
// 多选数据源
let hobbys = [{
  text: '可协商',
  value: 0
}, {
  text: '一口价',
  value: 1
}];
const value = 10;
const range = [
  { value: 0, text: "600元/年" },
  { value: 1, text: "700元/年" },
  { value: 2, text: "800元/年" },
  { value: 2, text: "900元/年" },
  { value: 2, text: "1000元/年" },
  { value: 2, text: "1100元/年" },
  { value: 2, text: "1200元/年" },
  { value: 2, text: "1300元/年" },
  { value: 2, text: "1400元/年" },
  { value: 2, text: "1500元/年" },
  { value: 2, text: "1600元/年" },
  { value: 2, text: "1700元/年" },
  { value: 2, text: "1800元/年" },
  { value: 2, text: "1900元/年" },
  { value: 2, text: "2000元/年" },
  { value: 2, text: "2100元/年" },
  { value: 2, text: "2200元/年" },
  { value: 2, text: "2300元/年" },
  { value: 2, text: "2400元/年" },
  { value: 2, text: "2500元/年" },
  { value: 2, text: "2600元/年" },
  { value: 2, text: "2700元/年" },
  { value: 2, text: "2800元/年" },
  { value: 2, text: "2900元/年" },
  { value: 2, text: "3000元/年" },

];

const dynamicLists: any[] = [];
let dynamicRules = {
  email: {
    rules: [{
      required: true,
      errorMessage: '域名不能为空'
    }, {
      format: 'email',
      errorMessage: '域名格式错误'
    }]
  }
};
onLoad(options => {
  // @ts-ignore


});
const handleItemClick = (itemModel: any) => {


}
const onchange = (e: any) => {
  console.log('change');
};

</script>




<style lang="scss">
.divider {
  width: 100%;
  /* 横向分割线 */
  height: 50px;
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
  margin-top: 32px;
}
.custom-margin {
  padding-left: 15px;
  padding-right: 15px;
}

.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}
</style>

