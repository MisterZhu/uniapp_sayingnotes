<template>
  <view class="container">
    <uni-card :is-shadow="false" is-full>
      <view class="example-body">
        <text class="uni-h6">所填个人信息（手机号和微信号），只允许本小区实名认证通过的业主查看，可放心填写</text>
      </view>
    </uni-card>
    <uni-card :is-shadow="false">
      <uni-easyinput :inputBorder="false" type="textarea" v-model="baseFormData.title"
        placeholder="请输入车位详细介绍（例如：车位在几号楼下哪个区）" />
      <view>
        <uni-file-picker file-mediatype="image" mode="grid" file-extname="png,jpg" :limit="1" @progress="progress"
          @success="success" @fail="fail" @select="select" />
      </view>
    </uni-card>
    <view class="example">
      <uni-forms ref="baseForm" :modelValue="baseFormData" label-position="left">

        <uni-forms-item label="租金" required>
          <uni-data-select v-model="aryIndex3" :localdata="seleAry3" @change="rentChange" :clear="false"
            placeholder="请选择"></uni-data-select>
        </uni-forms-item>
        <uni-forms-item label="是否包含理费" required>
          <uni-data-checkbox v-model="aryIndex1" :localdata="seleAry1" @change="maintenanceChange" />
        </uni-forms-item>

        <uni-forms-item label="价格能否协商" required>
          <uni-data-checkbox v-model="aryIndex2" :localdata="seleAry2" @change="negotiableChange" />
        </uni-forms-item>
        <uni-forms-item label="手机号" required>
          <uni-easyinput v-model="baseFormData.telephone" placeholder="请输入联系方式" />
        </uni-forms-item>

        <uni-forms-item label="微信号">
          <uni-easyinput v-model="baseFormData.wei_xin" placeholder="（选填项）可让租客加微信联系" />
        </uni-forms-item>

      </uni-forms>
    </view>
  </view>
  <button class="server-btn" @click="handleItemClick">发布</button>
  <view class="divider"></view>
</template>


<script setup lang="ts">
import type { UserInfoModel } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';


// 基础表单数据
let baseFormData = {
  title: '', // 
  telephone: '', // 联系方式，对应后端的 Telephone
  wei_xin: '', // 微信号
  // in_maintenance: false, // 是否在维护中，对应后端的 InMaintenance
  // negotiable: false, // 价格是否可协商，对应后端的 Negotiable
  // annual_rent: '', // 租金，对应后端的 AnnualRent
  // img_url: '',
  // 其他字段根据后端模型添加
};


// 单选数据源
let seleAry1 = [{
  text: '包含',
  value: 0
}, {
  text: '不包含',
  value: 1
}];
// 多选数据源
let seleAry2 = [{
  text: '可协商',
  value: 0
}, {
  text: '一口价',
  value: 1
}];

const aryIndex1 = ref();
const aryIndex2 = ref();
const aryIndex3 = ref();
let aryText1 = ref('');
const aryText2 = ref('');
const aryText3 = ref('');

let imageValue = ref('');
const QiniuData = {    //这里是直接绑定data的值
  key: "", //图片名字处理
  token: "", //七牛云token
}
const seleAry3 = [
  { value: 25, text: "600元/年" },
  { value: 0, text: "600元/年" },
  { value: 1, text: "700元/年" },
  { value: 2, text: "800元/年" },
  { value: 3, text: "900元/年" },
  { value: 4, text: "1000元/年" },
  { value: 5, text: "1100元/年" },
  { value: 6, text: "1200元/年" },
  { value: 7, text: "1300元/年" },
  { value: 8, text: "1400元/年" },
  { value: 9, text: "1500元/年" },
  { value: 10, text: "1600元/年" },
  { value: 11, text: "1700元/年" },
  { value: 12, text: "1800元/年" },
  { value: 13, text: "1900元/年" },
  { value: 14, text: "2000元/年" },
  { value: 15, text: "2100元/年" },
  { value: 16, text: "2200元/年" },
  { value: 17, text: "2300元/年" },
  { value: 18, text: "2400元/年" },
  { value: 19, text: "2500元/年" },
  { value: 20, text: "2600元/年" },
  { value: 21, text: "2700元/年" },
  { value: 22, text: "2800元/年" },
  { value: 23, text: "2900元/年" },
  { value: 24, text: "3000元/年" },
];
let userInfo = ref<UserInfoModel>()

const dynamicLists: any[] = [];

async function getUpToken(callback: () => void) {
  try {
    const res: any = await RequestApi.QiniuToken(null)
    if (typeof callback === 'function') {
      callback();
    }
    if (res.code === 200) {
      const token = res.data
      console.log(token)
      QiniuData.token = token
    } else {
      uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
    }
  } catch (error) {
    callback && callback()
    console.error(error)
    uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
  }
}
const getLocalUserInfo = () => {
  var uInfo = JSON.parse(uni.getStorageSync('local_user_info'));
  console.log("userInfo = " + `${uInfo}`)
  if (uInfo) {
    userInfo.value = uInfo;
  }
}
getUpToken(() => { })
onLoad(options => {
  // @ts-ignore
  getLocalUserInfo();
});
const handleItemClick = (itemModel: any) => {
  if (!baseFormData.title) {
    uni.showToast({
      title: '请输入介绍',
      icon: 'none',
      duration: 2000,
    });
    return;
  }
  // if (!imageValue.value) {
  //   uni.showToast({
  //     title: '请上传图片',
  //     icon: 'none',
  //     duration: 2000,
  //   });
  //   return;
  // }

  if (!aryIndex3.value) {
    uni.showToast({
      title: '请选择租金',
      icon: 'none',
      duration: 2000,
    });
    return;
  }
  console.log("aryIndex3.value:", aryIndex3.value);
  console.log("aryText3.value:", aryText3.value);
  seleAry3.forEach((item) => {
    if (item.value === aryIndex3.value) {
      aryText3.value = item.text;
    }
  });
  console.log("aryText3.value:", aryText3.value);

  if (!aryText1.value) {
    uni.showToast({
      title: '请选择是否包含管理费',
      icon: 'none',
      duration: 2000,
    });
    return;
  }
  if (!aryText2.value) {
    uni.showToast({
      title: '请选择是否可协商',
      icon: 'none',
      duration: 2000,
    });
    return;
  }

  if (!baseFormData.telephone) {
    uni.showToast({
      title: '请填写手机号',
      icon: 'none',
      duration: 2000,
    });
    return;
  }
  publishLeasePosts();
}
// MARK: 
async function publishLeasePosts() {

  try {
    const requestData = {
      title: baseFormData.title,
      telephone: baseFormData.telephone,
      wei_xin: baseFormData.wei_xin,
      in_maintenance: !!aryIndex1,
      negotiable: !!aryIndex2,
      posts_type: 1, // Modify this based on your data structure
      state: 0, // Modify this based on your data structure
      annual_rent: aryText3.value,
      img_url: imageValue.value,
      user_id: userInfo.value?.user_id ?? '',
      // Add other fields based on your data structure
    };
    const res: any = await RequestApi.AddPosts(requestData)

    if (res.code === 200) {
      uni.$emit('isLessorRefresh', 1)
      uni.navigateBack({
        delta: 1, // 返回的页面数，1 表示返回上一页
      });
    } else {
      uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
    }
  } catch (error) {
    console.error(error)
    uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
  }
}
const rentChange = (e: any) => {
  // aryIndex3.value = e;
  console.log("rentChange e:", e);
  console.log("aryIndex3.value:", aryIndex3.value);
  console.log("aryText3.value:", aryText3.value);

};
const maintenanceChange = (e: any) => {
  // aryIndex1.value = e.detail.value;
  console.log("maintenanceChange e:", e);
  console.log("aryIndex1.value:", aryIndex1.value);
  seleAry1.forEach((item) => {
    if (item.value === aryIndex1.value) {
      aryText1.value = item.text;
    }
  });
};
const negotiableChange = (e: any) => {
  // aryIndex2.value = e.detail.value;
  console.log("negotiableChange e:", e);
  console.log("aryIndex2.value:", aryIndex2.value);
  seleAry2.forEach((item) => {
    if (item.value === aryIndex2.value) {
      aryText2.value = item.text;
    }
  });
};
// 获取上传状态
const select = (e: any) => {
  console.log('选择文件：', e)
  const filePath = e.tempFilePaths[0];
  const fileName = e.tempFiles[0].name;
  console.log('文件名称：', fileName);
  QiniuData.key = `images/upload_pic_${new Date().getTime()}_${fileName}`;
  // 在这里执行上传逻辑，将 fileName 作为参数传递给上传函数
  uploadFile(filePath, fileName);
}
// 上传文件的函数，接收文件路径和文件名作为参数
const uploadFile = (filePath: string, fileName: string) => {
  uni.uploadFile({
    url: 'https://upload.qiniup.com/',
    filePath: filePath,
    name: 'file',
    formData: {
      'token': QiniuData.token,
      'key': QiniuData.key  // 使用获取的文件名作为 key
    },
    success: (uploadFileRes) => {
      console.log(uploadFileRes);
      imageValue.value = 'https://qiniu.aimissu.top/' + QiniuData.key;
    }
  });
}
// 获取上传进度
const progress = (e: any) => {
  console.log('上传进度：', e)
}
// 上传成功
const success = (e: any) => {
  console.log('上传成功')
}
// 上传失败
const fail = (e: any) => {
  console.log('上传失败：', e)
}
</script>




<style lang="scss">
.example-body {
  margin: 0px 10px;
}

/* 设置 uni-easyinput 的字体大小 */
.uni-easyinput {
  font-size: 24px;
  color: red;
}

.uni-h6 {
  font-size: 14px;
  color: #FF6C00;

}

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
  padding-left: 12px;
  padding-right: 12px;
}

.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 12px;
}

.button-group {
  margin-top: 12px;
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
  margin-left: 12px;
}
</style>

