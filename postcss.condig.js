module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //能够把所有元素的px单位转换成rem
      //rootValue :转换px的基准值
      //例如一个元素宽是75px，则转换rem之后就是2rem
      rootValue:37.5,
      propList:['*']
    }
  }
}
//postcss技术：webpack的插件（处理转化css的代码）
//postcss-pxtorem 插件：把px都专成rem

//找准以什么设备为基准 
//UI给设计图 2倍图
// iphone6 总结宽度750px

//代码：flexible.js -> 375/10
//rem 转换的基准值（HTML的font-size）:37.5px

//2倍图 两处标签为100px,写多少rem？
//50/37,5

//公式：量出宽度/当前基准的html的font-size得出rem
//设备