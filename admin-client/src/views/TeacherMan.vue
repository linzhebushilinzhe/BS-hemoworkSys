<template>
  <div class="account-man">
    <div class="form-box">
      <el-form class="flex">
        <el-form-item label="姓名" class="flex">
          <el-input v-model="tchName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = !dialogFormVisible">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <teacher-table :tableData="classList"></teacher-table>
    <el-dialog title="新增教师" class="dev-el-dialog" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" :formValue="form">
        <el-form-item label="教工号" prop="tchID">
          <el-input v-model="form.tchID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="tchName">
          <el-input v-model="form.tchName"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="tchAge">
          <el-input v-model="form.tchAge"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="tchGender">
          <el-select v-model="form.tchGender" placeholder="请选择">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教授科目" prop="courseID">
          <el-select v-model="form.courseID" placeholder="请选择">
            <el-option
              v-for="item in courseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TeacherTable from "../components/TeacherTable";
export default {
  name: "accountMan",
  data() {
    return {
      tchName: "",
      classList: "",
      dialogFormVisible: false,
      form: {
        tchID: "",
        tchName: "",
        tchAge: "",
        tchGender: "",
        courseID: ""
      },
      sexOptions: [
        {
          label: "男",
          value: "男"
        },
        {
          label: "女",
          value: "女"
        }
      ],
      courseOptions: [
        {
          label: "语文",
          value: "KC2020001"
        },
        {
          label: "数学",
          value: "KC2020002"
        },
        {
          label: "英语",
          value: "KC2020003"
        }
      ],
      rules: {
        tchID: [{ required: true, message: "请输入", trigger: "change" }],
        tchName: [{ required: true, message: "请输入", trigger: "change" }],
        tchAge: [{ required: true, message: "请输入", trigger: "change" }],
        tchGender: [{ required: true, message: "请输入", trigger: "change" }],
        courseID: [{ required: true, message: "请输入", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.getClassList();
  },
  components: {
    TeacherTable
  },
  methods: {
    onSubmit() {
      if (this.tchName) {
        this.$axios({
          method: "get",
          url: "/api/teachers/" + this.tchName
        }).then(res => {
          if (res.data.success) {
            var data = res.data.data;
            this.classList = data.map(item => {
              return {
                tchID: item.tchID,
                tchName: item.tchName,
                tchAge: item.tchAge,
                tchGender: item.tchGender,
                courseName: item.courseName
              };
            });
          }
        });
      }
    },
    onAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/api/addTeacher",
            data: this.form
          }).then(res => {
            console.log(res);
            if (res.data.success) {
              this.$message({
                message: "创建成功!",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.getClassList()
            }
          });
        }
      });
    },
    getClassList() {
      this.$axios({
        method: "get",
        url: "/api/teacherList"
      }).then(res => {
        console.log(res.data.success);
        if (res.data.success) {
          var data = res.data.data;
          console.log(data);
          this.classList = data.map(item => {
            return {
              tchID: item.tchID,
              tchName: item.tchName,
              tchAge: item.tchAge,
              tchGender: item.tchGender,
              courseName: item.courseName
            };
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.form-box {
  padding: 10px;
  background: #ddd;
  border: 1px solid #ddd;
  box-sizing: border-box;
}
</style>