import $ from 'jquery';
import jwt_decode from 'jwt-decode';//引入解码包

const ModuleUser = {
  state: {
    id: "",
    username: "",
    photo: "",
    followerCount: 0,
    access: "",
    refresh: "",
    is_login: false,
  },
  getters: {
  },
  mutations: {//更新信息
      updateUser(state, user) {
          state.id = user.id;
          state.username = user.username;
          state.photo = user.photo;
          state.followerCount = user.followerCount;
          state.access = user.access;
          state.refresh = user.refresh;
          state.is_login = user.is_login;
      },
      updateAccess(state, access) {//跟刷新有关？？
          state.access = access;
      },
      logout(state) {//登出更新信息
          state.id = "";
          state.username = "";
          state.photo = "";
          state.followerCount = 0;
          state.access = "";
          state.refresh = "";
          state.is_login = false;
      }
  },
  actions: {
      login(context, data) {//context传api，data是信息
        $.ajax({//ajax获取后端服务器数据，resp即传来的数据，再赋给变量
            url: "https://app165.acapp.acwing.com.cn/api/token/",
            type: "POST",
            data: {
                username: data.username,
                password: data.password,
            },
            success(resp) {//成功的回调函数
                const {access, refresh} = resp;//得到回调的信息
                const access_obj = jwt_decode(access);//解码

                setInterval(() => {//每隔5分钟获取一次（刷新JWT令牌）
                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                        type: "POST",
                        data: {
                            refresh,
                        },
                        success(resp) {
                            context.commit('updateAccess', resp.access);
                        }
                    });
                }, 4.5 * 60 * 1000);
                $.ajax({//获取用户信息
                    url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                    type: "GET",
                    data: {
                        user_id: access_obj.user_id,
                    },
                    headers: {//JWT验证
                        'Authorization': "Bearer " + access,//授权
                    },
                    success(resp) {
                        context.commit("updateUser", {
                            //调用mutations的api，方法/数据名称
                            ...resp,//resp解构
                            access: access,
                            refresh: refresh,
                            is_login: true,
                        });
                        data.success();
                    },
                })
            },
            error() {
                data.error();
            }
        });
      },
  },
  modules: {
  }
};

export default ModuleUser;