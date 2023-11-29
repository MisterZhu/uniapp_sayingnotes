
// common.ts
export const common_url = {
    home_head_bg: 'https://qiniu.aimissu.top/common_img/home_head_bg.png',
    home_renter_icon5: 'https://qiniu.aimissu.top/common_img/home_renter_icon5.png',
    home_lessor_icon5: 'https://qiniu.aimissu.top/common_img/home_lessor_icon5.png',
    home_parking_head: 'https://qiniu.aimissu.top/common_img/home_parking_head.png',
} as const;

export const common_key = {
    k_local_token: 'local_token',
    k_local_user_info: 'local_user_info',
    k_DefaultCommunityId: 'DefaultCommunityId',
    k_DefaultCommunityName: 'DefaultCommunityName',
} as const;

// 转译日期格式
 const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  }

// 导出函数集合
export const timeDis = {
  formatDate,
};