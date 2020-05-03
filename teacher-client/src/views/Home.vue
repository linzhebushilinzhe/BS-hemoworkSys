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
    HeadInfo
  }
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
