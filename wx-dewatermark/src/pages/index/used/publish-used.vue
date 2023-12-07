<template>
    <view class="container">
     
      <uni-card :is-shadow="false">
        <uni-easyinput :inputBorder="false" type="textarea" v-model="baseFormData.title"
          :placeholder="dynamicPlaceholder" />
        <view>
          <uni-file-picker file-mediatype="image" mode="grid" file-extname="png,jpg" :limit="1" @progress="progress"
            @success="success" @fail="fail" @select="select" />
        </view>
      </uni-card>
      <view class="example">
        <uni-forms ref="baseForm" :modelValue="baseFormData" label-position="left">
          <view class="container2">
            <uni-forms-item label="价格" required>
              <view class="container3">
                <input class="uni-input" type="number"  v-model="aryText3" placeholder="请输入价格" />
                <text class="info">元</text>
              </view>
            </uni-forms-item>
          </view>
          <uni-forms-item label="价格能否协商" required>
            <uni-data-checkbox v-model="aryIndex2" :localdata="seleAry2" @change="negotiableChange" />
          </uni-forms-item>
          <uni-forms-item label="手机号" required>
            <uni-easyinput v-model="baseFormData.telephone" placeholder="请输入联系方式" />
          </uni-forms-item>
  
          <uni-forms-item label="微信号">
            <uni-easyinput v-model="baseFormData.wei_xin" placeholder="（选填项）可让邻里加微信联系" />
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
  import { GlobalData, UserInfo } from '@/public/common';
  
  
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
  const aryText2 = ref('');
  const aryText3 = ref('');
  
  let imageValue = ref('');
  
  const QiniuData = {    //这里是直接绑定data的值
    key: "", //图片名字处理
    token: "", //七牛云token
  }
  
  const dynamicLists: any[] = [];
  const indexType = ref('');
  
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
  
  getUpToken(() => { })
  onLoad(options => {
    // @ts-ignore
    // console.log(options.index);
    // indexType.value = options?.index;
    // if (indexType.value === '3') {
    //   uni.setNavigationBarTitle({
    //     title: '出售车位'
    //   });
    // } else if (indexType.value === '4') {
    //   uni.setNavigationBarTitle({
    //     title: '购买车位'
    //   });
    // }
  
  });
  // 计算属性，根据 indexType 的值返回不同的 placeholder
  const dynamicPlaceholder = computed(() => {
    return '请输入闲置物品的基本介绍';
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
  
    if (!aryText3.value) {
      uni.showToast({
        title: '请选填写价格',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    console.log("aryText3.value:", aryText3.value);
  
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
  const sendCode = () => {
  }
  // MARK: 
  async function publishLeasePosts() {
  
    try {
      console.log("UserInfo.value.room e:", UserInfo.value.default_room);
  
      const loudongAry = UserInfo.value.default_room.split('-'); // 使用空格作为分隔符
      let loudongStr = '';
      if (loudongAry.length > 0) {
        loudongStr = '-' + loudongAry[0] + '幢';
      }
      const requestData = {
        title: baseFormData.title,
        telephone: baseFormData.telephone,
        wei_xin: baseFormData.wei_xin,
        in_maintenance: !!aryIndex1,
        negotiable: !!aryIndex2,
        posts_type: 5, // Modify this based on your data structure
        state: 0, // Modify this based on your data structure
        annual_rent: aryText3.value + '元',
        img_url: imageValue.value,
        user_id: UserInfo.value?.user_id,
        community_id: UserInfo.value.community_id,
        address: UserInfo.value.default_community + loudongStr,
        // Add other fields based on your data structure
      };
      const res: any = await RequestApi.AddPosts(requestData)
      uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
  
      if (res.code === 200) {
        // 延时一秒执行的操作
        setTimeout(() => {
          // 在这里写需要延时执行的代码
          uni.$emit('isUsedRefresh', 1)
  
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
  const rentChange = (e: any) => {
    // aryIndex3.value = e;
    console.log("rentChange e:", e);
    console.log("aryIndex3.value:", aryIndex3.value);
    console.log("aryText3.value:", aryText3.value);
  
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
  
  inputText {
    min-height: 76rpx;
    border: 1rpx solid #dadbde;
    font-size: 36rpx;
    padding-left: 20rpx;
    border-radius: 8rpx;
    margin-left: 25rpx;
    margin-top: 20rpx;
  }
  
  .btn {
    margin-top: 20rpx;
    margin-left: 25rpx;
  }
  
  .container2 {
    display: flex;
    align-items: center;
    // padding: 10px;
    // border: 1px solid #ccc;
    // border-radius: 10px;
  }
  
  .container3 {
    display: flex;
    align-items: center;
    // padding: 10px;
    // border: 1px solid #ccc;
    // border-radius: 10px;
  }
  
  .title {
    flex: 1;
    /* 填充剩余空间 */
    text-align: right;
    margin-right: 10px;
  }
  
  .uni-input {
    flex: 1;
    /* 填充剩余空间 */
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
  }
  
  .info {
    flex: 1;
    /* 填充剩余空间 */
    text-align: left;
    margin-left: 10px;
  }
  </style>
    
    