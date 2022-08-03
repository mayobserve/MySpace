<template>
<ContentBase>
  <div class ="row justify-content-md-center">
    <div class ="col-3">
    <form @submit.prevent = "login">

      <div class="mb-3">
        <label for="username" class="form-label info1" >账号</label>
        <input v-model="username" type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label info2">密码</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <!-- <div >密码错误</div> -->
      <button type="submit" class="btn btn-primary info3">登陆</button>
    </form>

  </div>
</div>
</ContentBase>
</template>

<script>
import ContentBase from '../components/content_base.vue';
//一个点是根目录，2个点根目录下一级（根目录是当前文件夹下）
import { ref } from 'vue';
import { useStore } from 'vuex';//类似router
import router from '../router';

export default{
  name:'LoginView',
  components:{
    ContentBase,
  },
  setup(){
    const store = useStore();
    let username = ref('');
    let password = ref('');
    
    const login = ()=>{
      store.dispatch("login",{//参数1函数名称作为字符串传入，
      //参数2 传入对应的数据
      //登陆的ajax写在store user中
        username: username.value,
        password: password.value,
        success(){
            router.push({name: 'userlist'});
        },
        error(){
            console.log("no");
        }
      })
      //调用store内函数
    }
    return{
      username,
      password,
      login,
    }
  }
}

</script>

<style scoped>
.info1{
  float: left;
}
.info2{
  float: left;
}
.info3{
  float: left;
}
button{
  width: 100%;
}
</style>