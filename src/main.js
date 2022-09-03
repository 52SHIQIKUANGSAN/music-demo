import Vue from 'vue'
import App from './App.vue'
//用相对路径不好
//文件如果以后改变位置，路径代码也要改变
// 解决：绝对路径，vue脚手架内置的webpack定义了一些路径变量
//"@"路径里的@，代表的是src绝对路径
import '@/assets/logo.png'
import '@/mobile/flexible.js' //自动适应宽度，改变html的font-size
import '@/styles/reset.css' //初始化标签的默认样式
import router from '@/router/index.js' //导入路由对象

//全局注册vant组件
import {
  NavBar,
  Tabbar,
  TabbarItem,
  Col,
  Row,
  Image as VanImage,
  Cell,
  CellGroup,
  Icon,
  Search,
  PullRefresh,
  List
} from 'vant'
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage) //Image 会冲突
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(Search)
Vue.use(PullRefresh)
Vue.use(List)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
