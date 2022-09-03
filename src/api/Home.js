//封装要发起的请求
import request from '@/utils/request' //把网络请求工具拿过来（）车

//封装一个网络请求方法
// 推荐歌单
export const recommendMusic = params =>
  request({
    url: '/personalized',
    params
  })
//最新歌曲
export const newsMusic = params =>
  request({
    url: '/personalized/newsong',
    params
  })
