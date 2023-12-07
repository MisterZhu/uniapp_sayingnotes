import { ref } from "vue";

// common.ts
export const common_url = {
  home_head_bg: 'https://qiniu.aimissu.top/common_img/home_head_bg.png',
  home_renter_icon5: 'https://qiniu.aimissu.top/common_img/home_renter_icon5.png',
  home_lessor_icon5: 'https://qiniu.aimissu.top/common_img/home_lessor_icon5.png',
  home_park_sell_icon: 'https://qiniu.aimissu.top/common_img/home_park_sell_icon.png',
  home_park_buy_icon: 'https://qiniu.aimissu.top/common_img/home_park_buy_icon.png',
  home_parking_head: 'https://qiniu.aimissu.top/common_img/home_parking_head.png',
  home_parking_chuzu: '/static/home/home_parking_chuzu.jpeg',
  home_parking_qiuzu: '/static/home/home_parking_qiuzu.jpeg',
  home_parking_chushou: '/static/home/home_parking_chushou.jpeg',
  home_parking_qiugou: '/static/home/home_parking_qiugou.jpeg',
  home_used_icon: '/static/home/home_used_icon.jpeg',

} as const;

export const common_key = {
  k_local_token: 'local_token',
  k_local_user_info: 'local_user_info',
  k_local_open_id: 'local_open_id',
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

export let UserInfo = ref<Record<string, any>>({
  avater: '',
  created_at: '',
  id: 0,
  open_id: '',
  password: '',
  query_count: 0,
  role: 0,
  telephone: '',
  updated_at: '',
  user_id: '',
  username: '',
  state: 0,
  default_community: '',
  default_community_id: 0,
  default_room: '',
});
export let GlobalData = {
  select_community: '',
  select_community_id: 0,
  token: '',
};