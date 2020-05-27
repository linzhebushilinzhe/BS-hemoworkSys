<template>
  <div class="login-form flex flex-col">
    <h1 class="text-center">学生作业管理系统管理員端</h1>
    <el-input prefix-icon="el-icon-user-solid" v-model="form.account" placeholder="请输入账号"></el-input>
    <el-input prefix-icon="el-icon-lock" type="password" placeholder="请输入密码" v-model="form.pwd"></el-input>
    <div class="btns-group flex justify-center">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        account: "root",
        pwd: "linzhe141"
      }
    };
  },
  methods: {
    login() {
      this.$store 
        .dispatch("Login", this.form)
        .then((res) => {
          console.log("res--->",res)
          this.$message({
            message: "登录成功!",
            type: "success"
          });
          this.$router.push({ path: "/home" })
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    
   
    }
  }
};
</script>
<style lang="scss">
.login-form {
  width: 500px;
  height: 300px;
  margin: 200px auto;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 10px;

  .el-input {
    width: 90%;
    margin: 0 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
}
</style>