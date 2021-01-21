import { request } from "./request"
//获取分类的数据
export function getCategory() {
    return request({
        url: '/category',
    })
}
//获取详细信息
export function getSubcategory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}
//获取底部分类数据
export function getCategoryDetail(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}