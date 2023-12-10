<template>
  <view class="container">
    <view class="result-box">
      <text>社区：{{ communityModel?.detail_name }}</text>
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
      <view>
        <uni-file-picker file-mediatype="image" mode="grid" file-extname="png,jpg" :limit="1" @progress="progress"
          @success="success" @fail="fail" @select="select" />
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
import { onLoad } from '@dcloudio/uni-app';
import type { CommunityItem, UserInfoModel } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import { common_key } from '@/public/common';

const selectedClass = ref(' ');
const classes = ref<Array<any>>([]); // 用于存储本地JSON数据
const phoneNum = ref('');
let communityModel = ref<CommunityItem | null>(null)
let imageValue = ref('');
const QiniuData = {    //这里是直接绑定data的值
  key: "", //图片名字处理
  token: "", //七牛云token
}
let userInfo = ref<UserInfoModel>()

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

// 接收参数
onLoad(options => {
  // @ts-ignore
  communityModel.value = JSON.parse(decodeURIComponent(options.communityModel as string)) as CommunityItem
  console.log(`communityModel onLoad: ${communityModel.value.detail_name}`);
  getLocalUserInfo();

});
const handleItemClick = (itemModel: any) => {
  if (!selectedClass.value.trim()) { // 检查是否为空或者只包含空格
    uni.showToast({
      title: '请选择房号',
      icon: 'none',
      duration: 2000,
    });
    return;
  }
  if (!imageValue.value.trim()) { // 检查是否为空或者只包含空格
    uni.showToast({
      title: '请上传图片',
      icon: 'none',
      duration: 2000,
    });
    return;
  }

  if (!phoneNum.value.trim()) { // 检查是否为空或者只包含空格
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
    let origRoom = selectedClass?.value ?? '';
    var room = origRoom.slice(0, origRoom.lastIndexOf('-')) + '0' + origRoom.slice(origRoom.lastIndexOf('-') + 1);
    const requestData = {
      community: communityModel.value?.detail_name,
      community_id: communityModel.value?.ID,
      room: room,
      telephone: phoneNum?.value ?? '',
      state: 1,
      img_url: imageValue.value,
      user_id: userInfo.value?.user_id ?? '',
    };
    const res: any = await RequestApi.AddApply(requestData)
    uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })

    if (res.code === 200) {
      // 延时一秒执行的操作
      setTimeout(() => {
        // 在这里写需要延时执行的代码
        // uni.$emit('isMyHouseRefresh', 1)
        // uni.navigateBack({
        //   delta: 2, // 返回的页面数，1 表示返回上一页
        // });
        uni.switchTab({
          url: '/pages/index/index', // 返回的页面数，1 表示返回上一页
        });
      }, 1000);

    } else {
    }
  } catch (error) {
    console.error(error)
    uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
  }
}
// 异步加载本地JSON数据
onMounted(() => {
  classes.value = uni.getStorageSync(common_key.k_cachedJsonData); // 将JSON数据赋值给classes
});

const onnodeclick = (e: any) => {
  console.log('6666onnodeclick');
  console.log(e);
};
const inputAction = (e: any) => {
  console.log('inputAction');

  console.log(e);
};
const onpopupopened = (e: any) => {
  console.log('popupopened');
};

const onpopupclosed = (e: any) => {
  console.log('popupclosed');
};

const onchange = (e: any) => {
  const value = e.detail.value
  console.log('change $value');
  console.log(value);

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
  