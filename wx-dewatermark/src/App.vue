<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("111App Launch");

  // let menu_but = uni.getStorageSync('MenuButton')
  // if (!menu_but) {
  //   //获取胶囊按钮的坐标
  //   const res = uni.getMenuButtonBoundingClientRect()
  //   uni.setStorageSync('MenuButton', res)

  //   const temInfo = uni.getSystemInfoSync()
  //   let statusBarHeight = temInfo.statusBarHeight ?? 0
  //   uni.setStorageSync('SafeAreaInsetTop', (statusBarHeight - 20))

  // }
  // console.log(menu_but);

  uni.getSystemInfo({
    success: (res) => {
      // 获取手机顶部状态栏的高度
      const statusBarHeight = res.statusBarHeight || 0;
      uni.setStorageSync('SafeAreaInsetTop', statusBarHeight)
      console.log('SafeAreaInsetTop:', statusBarHeight);
      // 获取导航栏的高度（手机状态栏高度 + 胶囊高度 + 胶囊的上下间距）
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      const navBarHeight = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2;
      console.log(menuButtonInfo);
      // 计算顶部图标距离
      const topIconDistance = statusBarHeight + navBarHeight;

      // 打印顶部图标距离
      console.log('顶部图标距离:', topIconDistance);
      uni.setStorageSync('topIconDistance', topIconDistance)
    },
    fail: (err) => {
      console.error('获取系统信息失败:', err);
    },
  });



  // uni.getSystemInfo({
  //     success: (res) => {
  //       const query = uni.createSelectorQuery()
  //       query.select('.uni-icon-uniE904').boundingClientRect()
  //       query.exec((rects) => {
  //         const rightButtonRect = rects[0]
  //         const rightButtonTop = res.windowHeight - rightButtonRect.bottom
  //         const rightButtonRight = res.windowWidth - rightButtonRect.right
  //         console.log(`Right button top: ${rightButtonTop}px`)
  //         console.log(`Right button right: ${rightButtonRight}px`)
  //       })
  //     }
  //   })

});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
html,
body,
#app{
  widows: 100%;
  height: 100%;
}
page {
  background-color: #f5f5f5;
}

</style>
