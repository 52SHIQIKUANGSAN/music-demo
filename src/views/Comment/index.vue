<template>
  <div>
    <van-nav-bar title="评论" fixed left-arrow @click-left="$router.back()" />
    <div class="main">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- van-cell 单元格框的样式借用一下，内部全部自定义 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="obj in list" :key="obj.commentId">
            <template>
              <div class="wrap">
                <div class="img_wrap">
                  <img :src="obj.user.avatarUrl" alt="" />
                </div>
                <div class="content_wrap">
                  <div class="header_wrap">
                    <div class="info_wrap">
                      <p>{{ obj.user.nickname }}</p>
                      <p>{{ obj.time }}</p>
                    </div>
                    <div>{{ obj.likedCount }}点赞</div>
                  </div>
                  <div class="footer_wrap">
                    {{ obj.content }}
                  </div>
                </div>
              </div>
            </template>
          </van-cell></van-list
        >
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getCommentListAPI } from '@/api'
export default {
  data() {
    return {
      list: [],
      isLoading: false, //加载完毕
      loading: false, //控制加载状态
      finished: false, //如果设置为true，list下面就会显示没有数据了
      page: 0 //当前要请求第几页的数据
    }
  },
  methods: {
    async onRefresh() {
      // 下拉刷新，请求新的数据
      // UI 手动下拉，内部会自动吧isLoading改为true
      this.list = [], //先清空老数据，在获取新数据
      this.page = 1 //页码也得回来
      this.getList()
    },
    async getList() {
      const res = await getCommentListAPI({
        id: this.$route.query.id,
        limit: 20,
        //offset--分页
        offset: (this.page - 1) * 20 //这个20必须和limit一致
      })
      res.data.comments.forEach(obj => this.list.push(obj))
      // console.log(res);
      // this.list = res.data.comments
      this.isLoading = false
      this.loading = false //隐藏2：每次请求数据都要吧loading关闭，否则不会再次触发onLoad(可能容易递归，必须要让数据增加)
    },
    async onLoad() {
      //触底了，要加载下一页
      // 加载后要关闭loading为false
      //网页刚打开list就相当于触底，马上执行了一次onLoad事件
     this.page++
      this.getList()
       
      console.log('onLoad')
    }
  }
}
</script>

<style scoped>
.main {
  padding-top: 46px;
}
/* 容器样式 */
.wrap {
  display: flex;
}
.img_wrap {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.266667rem;
}
.img_wrap img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.content_wrap {
  flex: 1;
}

/* 右侧头部 */
.header_wrap {
  display: flex;
}
.info_wrap {
  flex: 1;
}
.info_wrap p:first-child {
  font-size: 0.373333rem;
  color: #666;
}
.info_wrap p:last-of-type {
  font-size: 0.24rem;
  color: #999;
}
.header_wrap div:last-of-type {
  color: #999;
  font-size: 0.293333rem;
}

/* 评论内容 */
.footer_wrap {
  font-size: 0.4rem;
  color: #333;
}
</style>
