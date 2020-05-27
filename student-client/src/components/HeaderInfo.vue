<template>
  <div class="flex flex-end header align-center justify-between">
    <h1 style="margin-left: 10px;">学生作业管理系统学生端</h1>
    <div>
      <span>欢迎:</span>
      <el-popover placement="top-start" title="用户信息" width="200" trigger="hover">
        <el-row>姓名：{{this.stuName}}</el-row>
        <el-row>学号：{{this.stuID}}</el-row>
        <el-button slot="reference">
          {{this.stuName}}
          {{this.$store.getters.identity | identity(this.$store.getters.identity )}}
        </el-button>
      </el-popover>
      <span @click="changePwd">修改密码</span>
      <span @click="logout" class="logout">退出</span>
    </div>
    <el-dialog title="批改作业" class="dev-el-dialog" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" :formValue="form">
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="form.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="surePwd">
          <el-input v-model="form.surePwd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "headerInfo",
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error("密码长度为6 - 18个字符"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      stuName: "",
      stuID: "",
      form: {
        surePwd: "",
        newPwd: ""
      },

      rules: {
        newPwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        surePwd: [{ required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {
    console.log("created");
    this.userInfo();
  },
  filters: {
    identity(data) {
      if (data == "student") {
        return "同学";
      }
    }
  },
  methods: {
    changePwd() {
      this.dialogFormVisible = true;
      // this.$confirm("修改密码", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!"
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     });
      //   });
    },
    submit() {},
    logout() {
      this.$router.push({
        path: "/login"
      });
    },
    userInfo() {
      console.log(axios);
      axios({
        method: "get",
        url: "/api/students/" + this.$store.getters.stuID
      }).then(res => {
        if (res.data.success) {
          console.log(res.data.data[0]);
          this.stuID = res.data.data[0].stuID;
          this.stuName = res.data.data[0].stuName;
        }
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