// 网络请求的方法：
// 封装好处：便于修改便于替换
import axios from 'axios'
const ajax=axios.create({ //自定义axios对象(ajax 就是axios)
  baseURL:"http://localhost:3000"// 服务器基地址
})

export default ajax