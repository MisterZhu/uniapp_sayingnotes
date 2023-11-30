//-------------------类型声明文件：d.ts文件--------------------

// 社区数据模型
export interface CommunityItem {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    user_id: string;
    address: string;
    img_url: string;
    name: string;
    detail_name: string;
    selectState: boolean;
  }

// 认证申请数据模型
export interface ApplyItem {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    state: number;
    telephone: string;
    user_id: string;
    img_url: string;
    room: string;
    community: string;
  }

// 帖子数据模型
export interface ParkItem {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    in_maintenance: boolean;
    negotiable: boolean;
    state: number;
    posts_type: number;
    user_id: string;
    telephone: string;
    wei_xin: string;
    title: string;
    img_url: string;
    annual_rent: string;
  }
  
// 首页第一项数据：数据解析
export interface Analysis {
    title: string;
    bigFile: false;
    cover: string;
    down:  string;
    download_image: string;
    images: string;
    url: string;
    video:string;
    origin_url:string;
}
// 用户信息数据解析
export interface UserInfoModel {
    avater: string;
    created_at: string;
    id: int;
    open_id: string;
    password: string
    query_count: int;
    role: int;
    telephone: string
    updated_at: string;
    user_id: string;
    username: string;
    state: int;
    default_community: string;
    default_community_id: int;
    default_room: string;
}

// 多选数据模型
export interface MultipleSelect {
    url: string;
    selectState: boolean;
}

// item数据模型
export interface MineItemModel {
    left_img: string;
    left_title: string;
    right_img: string;
    right_title: string;
    line_shou: boolean;
    head_shou: boolean;
    share_shou: boolean;
    radius_type: int;

}