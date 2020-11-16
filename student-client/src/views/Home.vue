<template>
  <div class="home-page">
    <header-info></header-info>
    <div class="flex content">
      <el-menu
        :unique-opened="true"
        :default-active="$route.path"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
         <el-menu-item :index="item.path" v-for="item in courseList" :key="item.id"> 
            <span>{{item.label}}</span>
          </el-menu-item>
          <el-menu-item index="/communication" > 
            <span>交流</span>
          </el-menu-item>
      </el-menu>
      <el-main>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </div>
  </div>
</template>
<script>
import HeaderInfo from "@/components/HeaderInfo";
export default {
  name: "home",
  data() {
    return {
      courseList: this.$store.getters.course,
      ws: new WebSocket("ws://127.0.0.1:5000"),
    };
  },
  components: {
    HeaderInfo
  },
  mounted() {
      this.$store.commit('SET_WS', this.ws)
    console.log('ws--->',this.ws)
    var that = this
    this.ws.onopen = function () {
      console.log("连接服务器成功");
    };
    this.ws.onclose = function () {
      console.log("服务器关闭");
    };
    this.ws.onerror = function () {
      console.log("连接出错");
    };
    //3.监听 服务端的消息 后渲染页面
    this.ws.onmessage = function (event) {
        console.log('store--->',that.$store.getters.stuName)
        console.log('server--data--->',event.data)
        console.log('type--->',typeof event.data)
        console.log(JSON.parse(event.data))
      that.$store.dispatch("AddMsglist", {
        data: JSON.parse(event.data),
        name: that.$store.getters.stuName,
      });
    };
  }
};
</script>
<style lang="scss">
.home-page{
  height: 100%;
  display: flex;
  flex-direction: column
}
.course-box {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px;
  a {
    text-decoration: none;
  }
}
.content {
  flex-grow: 1;
  .el-menu{
    flex-basis: 20%;
  }
}
</style>