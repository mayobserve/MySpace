<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <!-- 改变不同的class会调整样式 -->
    <router-link class="navbar-brand" :to="{ name :'home'}">我的空间</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{ name :'home'}">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name :'userlist'}">好友列表</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" :to="{ name :'userprofile', params:{useId: $store.state.user.id }}">用户动态</router-link>
        </li> -->
        <!-- router-link标签 点击时，跳转到相应路由 :to= -->
      </ul>

    <ul class="navbar-nav" v-if="!$store.state.user.is_login">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name :'login'}">登陆</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name :'registerview'}">注册</router-link>
        </li>
    </ul>

    <ul class="navbar-nav" v-else>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'userprofile',
          params:{ userId: $store.state.user.id}}"
          >
          <!-- 此处userId要匹配router 下声明的变量名 -->
          {{$store.state.user.username}}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="cursor: pointer" @click="logout">退出</a>
        </li>
    </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { useStore } from 'vuex';

export default{//扔出去
    name:'NavBar',
    
    setup(){
      let store = useStore();
      const logout = ()=>{
          store.commit("updateLogout");
      };
      return{
        logout
      }
    }
    
}
</script>

<style scoped>

</style>