<template>
  <div>
    <header-info></header-info>
    <div class="flex">
      <div>
        <div class="course-box" v-for="(item,index) in courseList" :key="index">
          <router-link :to="item.path">{{item.label}}</router-link>
        </div>
      </div>
      <router-view></router-view>
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
</style>