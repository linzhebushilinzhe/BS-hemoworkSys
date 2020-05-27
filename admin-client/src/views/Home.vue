<template>
  <div class="home flex flex-col">
    <header-info></header-info> 
    <div class="flex1 content flex">
      <el-menu
        :unique-opened="true"
        :default-active="$route.path"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/accountMan">账号管理</el-menu-item>
        <el-menu-item index="/teacherMan">教师管理</el-menu-item>
        <el-menu-item index="/studentMan">学生管理</el-menu-item>
      </el-menu>
      <el-main>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderInfo from "@/components/HeaderInfo.vue";

export default {
  name: "Home",
  components: {
    HeaderInfo
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
