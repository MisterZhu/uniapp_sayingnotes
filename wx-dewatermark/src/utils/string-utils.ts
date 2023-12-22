import { common_url } from "@/public/common";

export function includesZhu(postType: string): boolean {
    switch (postType) {
        case 'misterzhu':
            return true;
        default:
            return false;
    }
}
//判断date是否是今天
export function strAddStar(dateStr: string): string {
    // 将 date 字段转换为日期对象 '2023-04-05T19:42:03+08:00'
    let start = 0;
    let end = 0;
    if (dateStr.length >= 3 && dateStr.length < 11) {
        start = 1;
        end = dateStr.length - 1;
    } else if (dateStr.length >= 11) {
        start = 3;
        end = dateStr.length - 3;
    } else {
        start = 0;
        end = 0;
    }
    const prefix = dateStr.slice(0, start);
    const suffix = dateStr.slice(end);
    // const masked = "*".repeat(end - start);
    const masked = "***";
    return prefix + masked + suffix;
}
//修改标题
export function setTitle(name: string) {
    // const page = uni.$mp.page
    // const title = uni.$refs.title
    // title.text = name
    uni.setNavigationBarTitle({
        title: name
    });
}


export function placeImgWithType(postType: number): string {
    switch (postType) {
        case 1:
            return common_url.home_parking_chuzu;
        case 2:
            return common_url.home_parking_qiuzu;
        case 3:
            return common_url.home_parking_chushou;
        case 4:
            return common_url.home_parking_qiugou;
        case 5:
            return common_url.home_used_icon;
        default:
            return common_url.home_used_icon;
    }
}
export function shopPlaceImg(postType: number): string {
    switch (postType) {
        case 1:
            return common_url.home_shop_jiazheng;
        case 2:
            return common_url.home_shop_zhuangxiu;
        case 3:
            return common_url.home_shop_huishou;
 
        default:
            return common_url.home_shop_jiazheng;
    }
}

export function isUrl(str: string) {
    // 使用正则表达式判断是否是合法的URL
    const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
    return urlPattern.test(str);
  }