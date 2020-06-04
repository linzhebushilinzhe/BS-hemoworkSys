<template>
  <div class="simple-table">
    <el-table :data="tableData" max-height="522">
      <!-- <el-table-column 
        v-for="(item,i) in Object.keys(tableData)" 
        :key="i"
        :prop="item" 
        :label="item.label"
      >
      </el-table-column>-->

      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="permissions" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.permissions == '管理员' ? true: false"
            size="mini"
            @click="resetPassword(scope.$index, scope.row)"
          >重置密码</el-button>
          <el-button
            :disabled="scope.row.permissions == '管理员' ? true: false"
            size="mini"
            type="danger"
            @click="deleteUser(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  <script>
export default {
  props: ["tableData"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    resetPassword(index, row) {
      console.log(index, row);
      this.$axios({
        method: "put",
        url: "/api/users/" + row.username
      }).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "密码重置成功!"
          });
          location.reload();
        }
      });
    },
    deleteUser(index, row){
        this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "delete",
            url: "/api/users/" + row.username
          }).then(res => {
            console.log(res);
            if (res.data.success) {
              location.reload();
              this.$message({
                type: "success",
                message: "用户删除成功"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          this.getTableData();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>