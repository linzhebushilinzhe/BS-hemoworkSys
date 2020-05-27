<template>
  <div class="account-man">
    <div class="form-box">
      <el-form class="flex">
        <el-form-item label="学号" class="flex">
          <el-input v-model="stuID" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = !dialogFormVisible">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <student-table :tableData="studentsList"></student-table>


    <el-dialog title="新增学生" class="dev-el-dialog" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" :formValue="form">
        <el-form-item label="学号" prop="stuID">
          <el-input v-model="form.stuID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="form.stuName"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="stuAge">
          <el-input v-model="form.stuAge"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="stuGender">
          <el-select v-model="form.stuGender" placeholder="请选择">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classID">
          <el-select v-model="form.classID" placeholder="请选择">
            <el-option
              v-for="item in classOptions"
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
import StudentTable from "../components/StudentTable";
export default {
  name: "accountMan",
  data() {
    return {
      stuID: "",
      studentsList: "",
      dialogFormVisible: false,
      fieds: {
        2016001: "高二一班",
        2016002: "高二二班"
      },
       form: {
        stuID: "",
        stuName: "",
        stuAge: "",
        stuGender: "",
        classID: ""
      },
      classOptions:[
        {
          label:'高二一班',
          value: 2016001
        },
        {
          label:'高二二班',
          value: 2016002
        },
      ],
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
      rules: {
        stuID: [{ required: true, message: "请输入", trigger: "change" }],
        stuName: [{ required: true, message: "请输入", trigger: "change" }],
        stuAge: [{ required: true, message: "请输入", trigger: "change" }],
        stuGender: [{ required: true, message: "请输入", trigger: "change" }],
        classID: [{ required: true, message: "请输入", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.getClassList();
  },
  components: {
    StudentTable
  },
  methods: {
    onSubmit() {
      if (this.stuID) {
        this.$axios({
          method: "get",
          url: "/api/students/" + this.stuID
        }).then(res => {
          if (res.data.success) {
            var data = res.data.data;
            this.studentsList = data.map(item => {
              return {
                stuID: item.stuID,
                stuName: item.stuName,
                stuAge: item.stuAge,
                stuGender: item.stuGender,
                classID: this.fieds[item.classID],
                // classID: item.classID
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
            url: "/api/addStudent",
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
        url: "/api/studentList"
      }).then(res => {
        console.log(res.data);
        if (res.data.success) {
          var data = res.data.data;
          //   console.log(data)
          this.studentsList = data.map(item => {
            return {
              stuID: item.stuID,
              stuName: item.stuName,
              stuAge: item.stuAge,
              stuGender: item.stuGender,
              className: this.fieds[item.classID],
                // className: item.classID

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