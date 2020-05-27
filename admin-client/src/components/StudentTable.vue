<template>
  <div class="simple-table">
    <el-table :data="tableData" max-height="700">
      <el-table-column prop="stuID" label="学号"></el-table-column>
      <el-table-column prop="stuName" label="姓名"></el-table-column>
      <el-table-column prop="stuAge" label="年龄"></el-table-column>
      <el-table-column prop="stuGender" label="性别"></el-table-column>
      <el-table-column prop="className" label="班级"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteStudent(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>b
    </el-table>
  </div>
</template>
  <script>
export default {
  props: {
    tableData: Array
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    deleteStudent(index, row) {
      this.$confirm("此操作将永久删除该学生, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "delete",
            url: "/api/students/" + row.stuID
          }).then(res => {
            if (res.data.success) {
              location.reload();
              this.$message({
                type: "success",
                message: "学生删除成功"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>