<template>
<ContentBase>
<div class="card">
  <div class="card-body">
    <div v-for = "p in posts.postlist" :key = "p.id">
      <div class="card">
        <div class="card-body">
          {{ p.content }}
          <button @click="deletepost(p.id)" v-if = "is_me" type="button" class="btn btn-danger btn-sm">
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</ContentBase>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import $ from 'jquery';

export default{
  name:'UserProfilePosts',
  props:{
      posts: {
        type: Object,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      }
  },
  setup(props,context){
    const store = useStore();
    let is_me = computed( ()=>  store.state.user.id === props.user.id);
    const deletepost = postid =>{
      $.ajax({//删除帖子
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "DELETE",
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        data:{
          post_id: postid,
        },
        success(resp){
          if(resp.result === "success"){
             context.emit('deletepost', postid);
          }
        }
      })
    }
    return {
      is_me,
      deletepost
    }
    
    
  },
  
}

</script>

<style scoped>
button{
  float:right;
}
</style>