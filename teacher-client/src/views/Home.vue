<template>
  <div class="home flex flex-col">
    <head-info></head-info>
    <div class="flex1 content flex">
      <el-menu
        :unique-opened="true"
        :default-active="$route.path"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/assignsHomework">布置作业</el-menu-item>
        <el-menu-item index="/homeworkList">作业列表</el-menu-item>
        <el-menu-item index="/communicat">交流</el-menu-item>
      </el-menu>
      <el-main>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import HeadInfo from "@/components/HeadInfo";
export default {
  name: "Home",
  components: {
    HeadInfo,
  },
  data() {
    return {
      ws: new WebSocket("ws://127.0.0.1:5000"),
    };
  },
  mounted() {
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
      let data = JSON.parse(event.data);
      if (data.username != this.$store.getters.tchName) {
        this.msgList.push({
          username: data.username,
          mssage: data.mssage,
          identity: data.identity,
        });
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .content {
    .el-menu {
      flex-basis: 15%;
    }
  }
}
</style>
