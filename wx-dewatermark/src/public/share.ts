import { isUrl } from "@/utils/string-utils";
import { common_key } from "./common";

const share = {

	// 分享到好友
	onShareAppMessage() {
		const currentPage = getCurrentPages().pop();
		console.log(`route =: ${currentPage?.route}`);
		switch (currentPage?.route) {
			case 'pages/index/shops/shop-detail-page':
			case 'pages/index/parking/parking-detail-page':
				let img = 'https://qiniu.aimissu.top/notes/1024.png';
				let local_img = uni.getStorageSync(common_key.k_detail_img);
				if(isUrl(local_img)){
					img = local_img;
				}
			
				console.log('------------------detail----onShareAppMessage');
				return {
					title: uni.getStorageSync(common_key.k_detail_title), // 分享标题
					path: currentPage?.route + '?detail_id=' + uni.getStorageSync(common_key.k_detail_id), // 默认为当前页面路径
					imageUrl: img// 默认为当前页面的截图
				}
			default:
				console.log('------------------normal----onShareAppMessage');
				return {
					title: '【语录笔记】AI录音新体验，抢先体验黑科技', // 分享标题
					path: '/pages/index/index?open_id=' + uni.getStorageSync(common_key.k_local_open_id), // 默认为当前页面路径
					imageUrl: 'https://qiniu.aimissu.top/notes/1024.png' // 默认为当前页面的截图
				}
		}
	},
	// 分享到朋友圈
	onShareTimeline() {
		const currentPage = getCurrentPages().pop();
		switch (currentPage?.route) {
			case 'pages/index/parking/parking-detail-page':
				let img = 'https://qiniu.aimissu.top/notes/1024.png';
				let local_img = uni.getStorageSync(common_key.k_detail_img);
				if(isUrl(local_img)){
					img = local_img;
				}

				console.log('------------------detail----onShareAppMessage');
				return {
					title: uni.getStorageSync(common_key.k_detail_title), // 分享标题
					path: 'pages/index/parking/parking-detail-page?detail_id=' + uni.getStorageSync(common_key.k_detail_id), // 默认为当前页面路径
					imageUrl: img // 默认为当前页面的截图
				}
			default:
				console.log('-----------------normal-----onShareTimeline');

				return {
					title: '【语录笔记】AI录音新体验，抢先体验黑科技', // 分享标题
					path: '/pages/index/index?open_id=' + uni.getStorageSync(common_key.k_local_open_id), // 默认为当前页面路径
					imageUrl: 'https://qiniu.aimissu.top/notes/1024.png' // 默认为当前页面的截图
				}
		}

	}

}
export default share;
