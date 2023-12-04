const share = {

	// 分享到好友
	onShareAppMessage() {
		return {
			title: '院落闲置角--小区业主车位租售、闲置物品交易平台~', // 分享标题
			path: '/pages/index/index?open_id=' + uni.getStorageSync('local_open_id'), // 默认为当前页面路径
			imageUrl: 'https://qiniu.aimissu.top/common_img/xianzhijiao_shareicon.png' // 默认为当前页面的截图
		}
	},
	// 分享到朋友圈
	onShareTimeline() {
		return {
			title: '院落闲置角--小区业主车位租售、闲置物品交易平台~', // 分享标题
			path: '/pages/index/index?open_id=' + uni.getStorageSync('local_open_id'), // 默认为当前页面路径
			imageUrl: 'https://qiniu.aimissu.top/common_img/xianzhijiao_shareicon.png' // 默认为当前页面的截图
		}
	}

}
export default share;
