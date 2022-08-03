<template>
<!-- 组件 -->
  <div class="home">
    <div class="container">
      <!-- container定义好的class可以响应试地调整中间内容区大小 -->
      <div class="card">
        <div class="card-body">
        <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 脚本
export default {
  name: 'ContentBase',
}
</script>

<style scoped>
/* 样式 */
.container{
  margin-top: 20px;
}
</style>