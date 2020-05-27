<template>
  <div class="simple-table">
    <el-table :data="tableData" max-height="700">
      <el-table-column prop="hwName" label="作业名"></el-table-column>
      <el-table-column prop="hwContent" label="作业内容"></el-table-column>
      <el-table-column prop="endDate" label="截止时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleCorrects(scope.$index, scope.row)">展开</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改截止时间</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="截止时间" prop="endDate">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="undateEndtime">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      tableData: [],
      form: {
        endDate: ""
      },
      hwID: "",
      dialogFormVisible: false,
      // 默认显示第一条
      currentPage: 1,
      rules: {
        endDate: [
          {
            type: "string",
            required: true,
            message: "请选择...",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      this.hwID = row.hwID;
      this.dialogFormVisible = true;
    },
    undateEndtime() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var hwID = this.hwID;
          var endDate = this.form.endDate;
          console.log("hwID", "endDate");
          console.log(hwID, endDate);
          this.$axios({
            method: "put",
            url: "/api/homeworkUpdate",
            data: {
              endDate,
              hwID
            }
          }).then(res => {
            console.log(res);
            if (res.data.success) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.dialogFormVisible = false;

              this.getTableData();
            }
          });
        }
      });
    },
    handleCorrects(index, row) {
      console.log(index, row.hwID);
      console.log("批改作业");
      this.$router.push({
        path: "/homework/" + row.hwID
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "delete",
            url: "/api/homeworkDelete",
            data: {
              hwID: row.hwID
            }
          }).then(res => {
            console.log(res);
            if (res.data.success) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.getTableData();
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
    },
    getTableData() {
      this.$axios({
        method: "get",
        url: "/api/homeworkClass",
        params: {
          tchID: this.$store.getters.tchID,
          classID: this.$route.params.id
        }
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          var data = res.data.data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>