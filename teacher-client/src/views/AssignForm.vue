<template>
  <div class="assign-form">
    <el-form
      :model="fileForm"
      ref="fileForm"
      :rules="rules"
      :formValue="fileForm"
      label-width="80px"
    >
      <el-form-item label="作业名称" prop="hwName">
        <el-input v-model="fileForm.hwName"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="classID">
        <el-select v-model="fileForm.classID" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始日期" prop="startDate" v-if="show">
        <el-date-picker
            v-model="fileForm.startDate"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期" prop="endDate">
        <el-date-picker
          v-model="fileForm.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="作业要求">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6}"
          placeholder="请输入内容"
          v-model="fileForm.hwContent"
        ></el-input>
      </el-form-item>
      <el-form-item label="作业附件" prop="file">
        <el-input type="file" v-model="fileForm.file"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      fileForm: {
        classID: "",
        form: "",
        hwName: "",
        startDate: "",
        endDate: "",
        hwContent: "",
        file: ""
      },
      options: "",
      rules: {
        hwName: [{ required: true, message: "请输入...", trigger: "blur" }],
        classID: [{ required: true, message: "请输入...", trigger: "blur" }],
        startDate: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        endDate: [
          {
            type: "string",
            required: true,
            message: "请选择...",
            trigger: "blur"
          }
        ],
      }
    };
  },
  created() {
    this.getClassOptions();
  },
  methods: {
    onSubmit() {
      this.$refs.fileForm.validate(valid => {
        if (valid) {
          console.log(this.fileForm.startDate);
          let param = new FormData();
          var file = document.querySelector("input[type=file]").files[0];
          param.append("classgradeId", this.fileForm.classID);
          param.append("type", 1);
          param.append("teacherId", this.$store.getters.tchID);
          param.append("hwName", this.fileForm.hwName);
          param.append("endDate", this.fileForm.endDate);
          param.append("hwDesc", this.fileForm.hwContent);
          param.append("hwFile", file);
          this.$axios({
            url: "/api/homework",
            method: "post",
            data: param
          }).then(res => {
            if (res.data.success) {
              this.$message({
                message: res.data.msg || '创建成功',
                type: "success"
              });
              this.fileForm.hwName = "";
              this.fileForm.endDate = "";
              this.fileForm.hwContent = "";
              this.fileForm.file = "";
              this.fileForm.classID = "";
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getClassOptions() {
      this.$axios({
        method: "get",
        url: "/api/teachgrade",
        params: {
          tchId: this.$store.getters.tchID
        }
      }).then(res => {
        console.log("options--->", res.data);
        this.options = res.data.data.map(item=>{
            return {
                label:item.className,
                value:item.id
            }
        });
        console.log(this.options)
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.assign-form {
  width: 50%;
  margin: 100px auto;
}
</style>