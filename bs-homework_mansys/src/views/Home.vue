<template>
  <div>
    <header-info></header-info>
    <div class="flex content">
      <el-menu
        :unique-opened="true"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <span>作业种类</span>
          </template>
          <el-menu-item :index="item.path" v-for="item in courseList" :key="item.id"> 
            <span>{{item.label}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <el-main>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </div>
    <!-- <div class="flex">
      <div>
        <div class="course-box" v-for="(item,index) in courseList" :key="index">
          <router-link :to="item.path">{{item.label}}</router-link>
        </div>
      </div>
      <router-view></router-view>
    </div> -->
  </div>
</template>
<script>
import HeaderInfo from "@/components/HeaderInfo";
export default {
  name: "home",
  data() {
    return {
      courseList: this.$store.getters.course
    };
  },
  components: {
    HeaderInfo
  },
  mounted() {}
};
</script>
<style lang="scss">
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
  .el-menu{
    flex-basis: 20%;
  }
}
</style>