<template>
  <div class="flex flex-end header align-center justify-between">
    <h1 style="margin-left: 10px; visibility:hidden;">学生作业管理系统教师端</h1>
    <div>
      <span>欢迎:</span>
      <el-popover placement="top-start" title="用户信息" width="200" trigger="hover">
        <el-row>姓名：{{this.$store.getters.tchName}}</el-row>
        <el-row>教工号：{{this.$store.getters.tchNum}}</el-row>
        <el-row>科目：{{this.$store.getters.courseName}}</el-row>
        <el-button slot="reference">{{this.$store.getters.tchName}} 老师</el-button>
      </el-popover>
      <span @click="logout" class="logout">退出</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "headerInfo",
  filters: {
    identity(data) {
      if (data == "student") {
        return "同学";
      }
    }
  },
  created(){
      console.log(this.$store.getters)
  },
  methods: {
    open() {
      this.$confirm("修改密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    logout() {
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>
<style lang="scss">
.header {
  height: 50px;
  background: #ddd;
  span {
    margin-right: 20px;
  }
  .logout,
  .user-info {
    cursor: pointer;
  }
}
</style>