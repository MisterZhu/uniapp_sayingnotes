//请求地址
const baseUrl = 'https://aimissu.top/api/v3'
// const baseUrl = 'http://127.0.0.1:8080/api/v3'
const loadQiniuUrl = 'https://qiniu.aimissu.top/'
const updateQiniuUrl = 'https://upload.qiniup.com'
import { common_key, GlobalData, UserInfo } from '@/public/common';

//獲取token
function getToken(): string {
    let golbToken = GlobalData.token;
    console.log("-----------getToken local_token = " + golbToken)
    let token = "Bearer " + golbToken
    return token
}

//请求默认带loading
function request(
    url: string,
    method: 'GET' | 'POST',
    data: string | object | ArrayBuffer
) {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            mask: true,
            title: "加载中..."
        })
        uni.request({
            url: baseUrl + url,
            method,
            data,
            header: {
                Authorization: getToken(),
                'Content-Type': 'application/json' // 设置请求参数格式为表单数据格式
            },
            success: (res: any) => {
                const data = res.data
                console.log("后台返回的数据: " + JSON.stringify(data));

                if (data.code == 200) {
                    resolve(data)
                } else if (data.code == 401) {
                    //无权访问
                    resolve(data)
                } else if (data.code == 500) {
                    //服务器发生错误
                    uni.showToast({ title: '服务器错误', icon: 'none', duration: 1000 })
                    resolve(data)
                } else if (data.code == 202) {
                    //服务器发生错误
                    uni.showToast({ title: '给你提示', icon: 'none', duration: 1000 })
                    resolve(data)
                } else {
                    resolve(data)
                }
            },
            fail: (res: any) => {
                uni.showToast({ title: '请求失败', icon: 'none', duration: 1000 })
            },
            complete(result) {
                uni.hideLoading()
            },
        })
    })
}
//请求不带loading
function requestNoLoading(
    url: string,
    method: 'GET' | 'POST',
    data: string | object | ArrayBuffer
) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            method,
            data,
            header: {
                Authorization: getToken(),
                'Content-Type': 'application/json' // 设置请求参数格式为表单数据格式
            },
            success: (res: any) => {
                const data = res.data
                if (data.code == 200) {
                    resolve(data)
                } else if (data.code == 401) {
                    //无权访问
                    resolve(data)
                } else if (data.code == 500) {
                    //服务器发生错误
                    uni.showToast({ title: '服务器错误', icon: 'none', duration: 1000 })
                    resolve(data)
                } else if (data.code == 202) {
                    //服务器发生错误
                    uni.showToast({ title: '给你提示', icon: 'none', duration: 1000 })
                    resolve(data)
                } else {
                    resolve(data)
                }
            },
            fail: (res: any) => {
                uni.showToast({ title: '请求失败', icon: 'none', duration: 1000 })
            },
        })
    })
}
//接口
const RequestApi = {
    UserLogin: (data: any) => requestNoLoading('/user/login', 'POST', data),
    HomeAnalysis: (data: any) => request('/user/analysis', 'POST', data),
    AnalyHistory: (data: any) => request('/user/analysisRecord', 'POST', data),
    SignIn: (data: any) => request('/user/signIn', 'POST', data),
    GetConfigInfo: (data: any) => requestNoLoading('/config/get_det', 'POST', data),

    /*------------------------  v3 天悦湾车位API  ------------------------------*/
    //帖子列表
    PostsList: (data: any) => request('/user/park_posts_list', 'POST', data),
    //发布帖子
    AddPosts: (data: any) => request('/user/add_park_posts', 'POST', data),
    //编辑帖子
    EditPosts: (data: any) => request('/user/edit_park_posts', 'POST', data),
    //删除帖子
    DetPosts: (data: any) => request('/user/delete_park_posts', 'POST', data),
    //帖子详情
    DetailPosts: (data: any) => request('/user/detail_park_posts', 'POST', data),

    /*------------------------  v3 天悦湾商家API  ------------------------------*/
    //帖子列表
    ShopsList: (data: any) => request('/user/shops_list', 'POST', data),
    //发布帖子
    AddShops: (data: any) => request('/user/add_shops', 'POST', data),
    //编辑帖子
    EditShops: (data: any) => request('/user/edit_shops', 'POST', data),
    //删除帖子
    DetShops: (data: any) => request('/user/delete_shops', 'POST', data),
    //帖子详情
    DetailShops: (data: any) => request('/user/detail_shops', 'POST', data),

    /*------------------------  v3 小区相关API  ------------------------------*/
    //小区列表
    CommunityList: (data: any) => request('/community/get', 'POST', data),
    //发布小区
    AddCommunity: (data: any) => request('/community/add', 'POST', data),
    //编辑小区
    EditCommunity: (data: any) => request('/community/edit', 'POST', data),
    //删除小区
    DetCommunity: (data: any) => request('/community/det', 'POST', data),


    /*------------------------  v3 小程序建议反馈API  ------------------------------*/
    //新增反馈
    AddFeedback: (data: any) => request('/feedback/add', 'POST', data),

    /*------------------------  v3 业主认证API  ------------------------------*/
    //申请认证列表
    ApplyList: (data: any) => request('/user/apply_list', 'POST', data),
    //发布认证
    AddApply: (data: any) => request('/user/owner_apply', 'POST', data),
    //编辑认证
    EditApply: (data: any) => request('/user/check_apply', 'POST', data),
    //删除认证
    DetApply: (data: any) => request('/user/delete_apply', 'POST', data),

    /*------------------------  v3 图片相关API  ------------------------------*/
    //获取七牛token接口
    QiniuToken: (data: any) => request('/qiniu/token', 'GET', data),
    //七牛云删除文件
    QiniuRemoveFile: (data: any) => request('/qiniu/remove_file', 'POST', data),

}
export { RequestApi };
