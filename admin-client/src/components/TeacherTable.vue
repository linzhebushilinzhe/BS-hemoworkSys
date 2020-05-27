<template>
  <div class="simple-table">
    <el-table :data="tableData" max-height="700">

      <el-table-column prop="tchID" label="教工号"></el-table-column>
      <el-table-column prop="tchName" label="姓名"></el-table-column>
      <el-table-column prop="tchAge" label="年龄"></el-table-column>
      <el-table-column prop="tchGender" label="性别"></el-table-column>
      <el-table-column prop="courseName" label="所教科目"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteTeacher(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  <script>
export default {
  props: {
      tableData: Array
  },
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  methods: {
      deleteTeacher(index, row){
        this.$confirm("此操作将永久删除该教师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "delete",
            url: "/api/teachers/" + row.tchID
          }).then(res => {
            console.log('fdsadfsa--?',res);
            if (res.data.success) {
              location.reload();
              this.$message({
                type: "success",
                message: "教师删除成功"
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