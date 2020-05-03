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
      courseList: this.$store.getters.course
    };
  },
  components: {
    HeaderInfo
  },
  mounted() {
    console.log(this.courseList)
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