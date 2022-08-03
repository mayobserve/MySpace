<template>
<ContentBase>
  <div class="row">
    <div class="col-3">
    
      <UserProfileInfo @follow="follow" @unfollow="unfollow" :user = "user"/>
      <!-- 追加一个自定义属性来渲染，名称是user 模块是user -->
      <UserProfileWrite v-if="is_me" @postinfo = "postinfo" />
      <!-- 当这个事件postinfo触发时 调用postinfo函数 （事件有@）-->
      
    </div>
    <div class="col-9">
      <UserProfilePosts :user = "user" @deletepost = "deletepost" :posts = "posts"/>
      

    </div>
  </div>
</ContentBase>
</template>

<script>
import ContentBase from '../components/content_base.vue';
//传递文件用单引号，其他用双引号
//一个点是根目录，2个点根目录下一级（根目录是当前文件夹下）
//import也表示 xx是子元素
import UserProfileInfo from '../components/UserProfileInfo.vue';
import UserProfilePosts from '../components/UserProfilePosts.vue';
import UserProfileWrite from '../components/UserProfileWrite.vue';
import {reactive} from 'vue';
import $ from 'jquery';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';


export default{
  name:'UserProfile',
  components:{
    ContentBase,
    UserProfileInfo,
    UserProfilePosts,
    UserProfileWrite,

  },
  setup:()=>{
  //可简写为setup(){
    const store = useStore();
    const route = useRoute();
    const userId = parseInt(route.params.userId);
    //取得当前页面的id，转换为整数 方便判断
    const user = reactive({
           });//大括号表明是对象
//  id: 1,//用冒号赋值
//       username: "asd",
//       lastname: "May",
//       firstname: "Observer",
//       followers: 10,
//       is_followed: false,
    const posts = reactive({
            });
// cnt : 3,
//       postlist:
//       [//中括号数组
//         {//数据类型是对象（结构体）
//           id : 1,
//           userid: 1,
//           content: " 111 "
//         },
//         {
//           id : 2,
//           userid: 1,
//           content: " 222 "
//         },
//         {
//           id : 3,
//           userid: 1,
//           content: " 333 "
//         },
//       ]
    
    $.ajax({//获取信息
      url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
      type: "GET",
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
        //后一段未token，需要附加之前存的令牌
      },
      data:{
        user_id: userId,
      },
      success(resp){
        user.id = resp.id;
        user.username = resp.username;
        user.photo = resp.photo;
        user.followcnt = resp.followerCount;
        //注意是store中存的变量，等同于resp中的变量名
        user.is_followed = resp.is_followed;
      }
    })

    $.ajax({//加帖子
      url:'https://app165.acapp.acwing.com.cn/myspace/post/',
      type:"GET",
      data:{
        user_id: userId,
      },
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      success(resp){
        posts.cnts = resp.length;
        posts.postlist = resp;
      }
    });

    const follow = ()=>{
      if(user.is_followed) return;
      user.is_followed = true;
      user.followcnt ++;
    }

    const unfollow = ()=>{
      if(!user.is_followed) return;
      user.is_followed = false;
      user.followcnt --;
    }
    
    const postinfo= (content)=>{//接受传入的content
      posts.cnt++;
      posts.postlist.unshift({ //在postliest中添加
        //最后是push
        id : posts.cnt,
        userid: 1,
        content: content,
      })
    }
    const deletepost = postid=>{
      posts.postlist = posts.postlist.filter(post => post.id !== postid);
      //遍历数组每一个元素
      posts.cnt = posts.posts.length;
    }

    const is_me = computed( ()=> userId === store.state.user.id);
    //computed要引入

    return {
      user,
      follow,
      unfollow,
      posts,
      postinfo,
      is_me,
      deletepost
    }
  }

}

</script>

<style scoped>

</style>