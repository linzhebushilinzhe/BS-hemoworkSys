<template>
  <div class="account-man">
    <div class="form-box">
      <el-form class="flex">
        <el-form-item label="用户名" class="flex">
          <el-input  v-model="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <simple-table :tableData="usersList"></simple-table>
  </div>
</template>
<script>
import SimpleTable from "../components/SimpleTable";
export default {
  name: "accountMan",
  data() {
    return {
      usersList: "",
      username: '',
      field: {
        0: "管理员",
        1: "学生",
        2: "教师"
      }
    };
  },
  mounted() {
    this.getUsersList();
  },
  components: {
    SimpleTable,
  },
  methods: {
    onSubmit() {
      if(this.username){
          this.$axios({
          method: 'get',
          url: '/api/users/'+this.username,
      }).then(res=>{
          console.log(res)
          if (res.data.success) {
          var data = res.data.data;
          this.usersList = data.map(item => {
            return {
              username: item.username,
              password: item.password,
              permissions: this.formatterField(item.permissions)
            };
          });
          console.log(this.usersList)
        }
      })
      }
    },
    getUsersList() {
      this.$axios({
        method: "get",
        url: "/api/usersList"
      }).then(res => {
        console.log(res.data.success);
        if (res.data.success) {
          var data = res.data.data;
          this.usersList = data.map(item => {
            return {
              username: item.username,
              password: item.password,
              permissions: this.formatterField(item.permissions)
            };
          });
        }
      });
    },
    formatterField(data) {
      return this.field[data];
    }
  }
};
</script>
<style lang="scss">
    .form-box{
        padding: 10px;
        background: #ddd;
        border: 1px solid #ddd;
        box-sizing: border-box;
    }
</style>