import { ref } from "vue";

// common.ts
export const common_url = {
  home_bg: 'https://qiniu.aimissu.top/notes/bg_launch1.png',
  common_back: 'https://qiniu.aimissu.top/notes/common_back_icon.png',
  copy_icon: 'https://qiniu.aimissu.top/notes/copy_icon.png',
  delete_icon: 'https://qiniu.aimissu.top/notes/delete_icon.png',
  menu_icon: 'https://qiniu.aimissu.top/notes/menu_icon.png',
  pause_icon: 'https://qiniu.aimissu.top/notes/pause_icon.png',
  play_icon: 'https://qiniu.aimissu.top/notes/play_icon.png',
  voice_icon: 'https://qiniu.aimissu.top/notes/voice_icon.png',
  share_icon: 'https://qiniu.aimissu.top/notes/share_icon.png',


} as const;

export const common_key = {
  k_local_token: 'local_token',
  k_local_user_info: 'local_user_info',
  k_local_open_id: 'local_open_id',
  k_DefaultCommunityId: 'DefaultCommunityId',
  k_DefaultCommunityName: 'DefaultCommunityName',
  k_detail_id: 'detail_id',
  k_detail_title: 'detail_title',
  k_detail_img: 'detail_img',
  k_cachedJsonData: 'cachedJsonData',
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
  checking: true,
  curent_title: '',
  is_show_toast: false,

};