<template>
  <div>
    <!-- 热门搜索 -->
    <van-search
      v-model="searchValue"
      shape="round"
      background="white"
      placeholder="请输入搜索关键词"
    />
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>

      <ul class="hot_name_wrap">
        <li class="hot_item" v-for="(obj, index) in hotList" :key="index" @click="btn(obj.first)">
          {{ obj.first }}
        </li>
      </ul>
    </div>

    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <SongItem
        v-for="obj in resultList"
        :key="obj.id"
        :name="obj.name"
        :author="obj.artists[0].name"
        :id="obj.id"
      ></SongItem>
    </div>
  </div>
</template>

<script>
import SongItem from '@/components/SongItem.vue'
import { hotSerachAPI, searchResultAPI } from '@/api'
export default {
  data() {
    return {
      searchValue: '',
      hotList: [], //保存的是热搜关键字
      resultList: [], //搜索结果
      timer: null //用来保存定时器
    }
  },
  async created() {
    const res = await hotSerachAPI()
    console.log(res)
    this.hotList = res.data.result.hots
  },
  methods: {
    async btn(str) {
      //把点击的关键字赋值给输入框显示
      this.searchValue = str
      const res = await searchResultAPI({
        type: 1,
        keywords: this.searchValue
      })
      console.log(res)
      this.resultList = res.data.result.songs
      setTimeout(() => {
        clearTimeout(this.timer)
      }) // 防止下面的请求再次执行
    }
  },
  watch: {
    searchValue(val) {
      clearTimeout(this.timer) //防止输入框空但是下面有数据
      if (val.length === 0) return (this.resultList = [])
      this.timer = setTimeout(async () => {
        //搜索框里的值改变，立即执行
        // console.log(this.searchValue)
        const res = await searchResultAPI({
          type: 1,
          keywords: val
        })
        console.log(res)
        this.resultList = res.data.result.songs
      }, 1000)
    }
  },
  //防抖： 在n秒内，最后执行一次   （补充：函数在n秒内再次执行，重新计时）
  components: {
    SongItem
  }
}
</script>

<style scoped>
/deep/.van-field__control {
  font-size: 12px !important;
}
/* 热门搜索文字的标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}
/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-left: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>
