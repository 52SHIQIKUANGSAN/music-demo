<template>
  <div>
    <van-cell center :title="name" :label="author + '  ' + name" @click="$router.push({path:'/comment',query:{id}})">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="play-circle-o" class="search-icon" @touchstart="playFn" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    author: String,
    id: Number //歌曲ID
  },
  methods: {
    playFn() {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style scoped>
.search-icon {
  font-size: 24px;
  line-height: inherit;
}
</style>
