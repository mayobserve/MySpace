<template>
<ContentBase>
<div class="card" 
  v-for="user in users" 
  :key="user.id" 
  @click = "openuseprofile(user.id)"> 
  
  <div class="card-body">
    <div class="row">
      <div class="col-1">
        <img class="img-fluid" :src="user.photo" alt ="">
        

      </div>
      <div class="col-11 ">
        <div class = "username info1">{{ user.username }}</div>
        <div class = "followerCount info2">{{ user.followerCount }}</div>
      </div>
    </div>
  </div>
</div>
</ContentBase>
</template>

<script>
import ContentBase from '../components/content_base.vue';
//一个点是根目录，2个点根目录下一级（根目录是当前文件夹下）
import $ from 'jquery';
import { useStore } from 'vuex';
import { ref } from 'vue';
import router from '../router';

export default{
  name:'UserList',
  components:{
    ContentBase,
  },
  setup(){
    const store = useStore();
    let users = ref({});
    $.ajax({
      url:'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type:"get",
      success(resp){
        users.value = resp;
      }
    });
    

    const openuseprofile = userId=>{
        if(store.state.user.is_login){
          router.push({
            name:"userprofile",
            params:{
              userId,
            }
          })
        }else{
          router.push({name: "login"});
        }
    }

    return{
      users,
      openuseprofile,
    }

  }
}

</script>

<style scoped>
.info1{
  text-align: left;
}
.info2{
  margin-bottom: 3px;
  text-align: left;
}
</style>