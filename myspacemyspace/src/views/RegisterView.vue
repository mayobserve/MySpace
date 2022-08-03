<template>
<ContentBase>
  <div class ="row justify-content-md-center">
    <div class ="col-3">
    <form @submit.prevent = "register">

      <div class="mb-3">
        <label for="username" class="form-label info1" >账号</label>
        <input v-model="username" type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label info2">密码</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <div class="mb-3">
        <label for="password_confirm" class="form-label info2">确认密码</label>
        <input v-model="passwordconfirm" type="password" class="form-control" id="exampleInputPassword2">
      </div>
      <button type="submit" class="btn btn-primary info3">注册</button>
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
import $ from 'jquery';
import router from '../router';

export default{
  name:'RegisterView',
  components:{
    ContentBase,
  },
  setup(){
    const store = useStore();
    let username = ref('');
    let password = ref('');
    let passwordconfirm = ref('');
    const register = ()=>{
      console.log(store,router);
        $.ajax({//获取用户信息
          url: "https://app165.acapp.acwing.com.cn/myspace/user/",
          type: "POST",
          data: {
            username: username.value,
            password: password.value,
            password_confirm: passwordconfirm.value,
          },
          success(resp){
            // console.log(resp);
            if(resp.result === 'success'){
              store.dispatch("login",{
              username: username.value,
              password: password.value,
              success(){
                router.push({name: 'userlist'});
              },
              error(){
                console.log("系统异常，请稍后重试");
              }
              })
            }else{
              console.log("no");
            }
          }
        })
      }
    return{
      username,
      password,
      register,
      passwordconfirm,
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