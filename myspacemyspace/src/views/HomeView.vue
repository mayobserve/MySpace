<template>
<ContentBase>
  首页
</ContentBase>
</template>

<script>
import ContentBase from '../components/content_base.vue';
//一个点是根目录，2个点根目录下一级（根目录是当前文件夹下）
export default{
  name:'HomeView',
  components:{
    ContentBase,
  }
}

</script>

<style scoped>

</style>