<template>
<ContentBase>
<div class="card edit">
  <div class="card-body">
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">编辑</label>
      <textarea v-model="content" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      <!-- text内容存到content中 -->
      <button @click="postsubmit" type="button" class="btn btn-outline-secondary btn-sm">发帖</button>
      <!-- 点击事件发生时触发postsubmit函数 -->
    </div>    
  </div>
</div>

</ContentBase>
</template>

<script>
import {ref} from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';


export default{
  name:'UserProfileWrite',
  setup(props, context){
    let content = ref('');
    const store = useStore();
    const postsubmit = ()=>{
      $.ajax({
      url:'https://app165.acapp.acwing.com.cn/myspace/post/',
      type:"POST",
      data:{
        content: content.value,
      },
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      success(resp){
        if(resp.result === "success"){//注意 结果是成功，才发帖
          context.emit('postinfo',content.value);
          //触发父组件下UserProfileWrite模块绑定 的postinfo事件
          content.value ="";
          //触发完后清零
        }
      }
    });

    }
    return {
      content,
      postsubmit,
    }
  }
  

}

</script>

<style scoped>
button{
  margin-top: 10px;
}
.edit{
  margin-top: 8px;
}
</style>