<template>
<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-3">
                <img :src ="user.photo" class="img-fluid" alt ="">
            </div>
            <div class="col-9">
                <div class="username">{{ user.username }}</div>
                <!-- 不展示全名 -->
                <div class="fans">粉丝数: {{ user.followcnt }} </div>
                <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-outline-secondary btn-sm">关注</button>
                <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-outline-secondary btn-sm">取消关注</button>
            </div>
        </div>   
    </div>
</div>

</template>

<script>
// import { computed } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';


export default{
  name:'UserProfileInfo',
  props: {
    user: {
        type: Object,
        required: true
    },
  },
  setup(props, context){//准备数据，props相当于父元素传来的值，类似class的this
    // let fullname = computed(() => props.user.lastname + ' '+ props.user.firstname);
    //函数用分号，数据用逗号
    const store = useStore();

    const follow= ()=>{//作为一个函数
        $.ajax({//获取信息
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "POST",
        headers: {
            'Authorization': "Bearer " + store.state.user.access,
        },
        data:{
            target_id: props.user.id,
        },
        success(resp){
            if(resp.result === 'success'){
                context.emit("follow");
            //成功时（后端被修改）同时修改后端，触发父组件的follow
            }
        }
        })
    }
    const unfollow= ()=>{
        $.ajax({//获取信息
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "POST",
        headers: {
            'Authorization': "Bearer " + store.state.user.access,
            //令牌存在store
        },
        data:{
            target_id: props.user.id,
            //用的是当前传入的userid
        },
        success(resp){
            if(resp.result === 'success'){
                context.emit("unfollow");
            }
        }
        })
    }
    return {//要用的数据抛出
        // fullname,
        follow,
        unfollow,
    }
  }
}

</script>

<style scoped>
img{
    border-radius: 5px;
}
.username{
    font-weight: bold;
    
}
.col-9{
    text-align: start;
}
.fans{
    font-size: 12px;
    color: gray;
}
button{
    padding: 2px 4px;
    font-size: 12px;
}
</style>