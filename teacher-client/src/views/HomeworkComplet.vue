<template>
  <div class="student-table">
    <el-table :data="hwInfo">
      <el-table-column prop="hwName" label="作业名"></el-table-column>
      <el-table-column prop="hwDesc" label="作业内容"></el-table-column>
      <el-table-column prop="endDate" label="截止日期"></el-table-column>
    </el-table>
    <el-table :data="stuHwComplatData" max-height="700">
      <el-table-column prop="stuName" label="学生姓名"></el-table-column>
      <el-table-column prop="stuid" label="学号"></el-table-column>
      <el-table-column prop="state" label="是否提交"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
      <el-table-column prop="comments" label="评语"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleCorrects(scope.$index, scope.row)"
            >批改作业</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="批改作业"
      class="dev-el-dialog"
      :visible.sync="dialogFormVisible"
      :data="stuHwInfo"
    >
      <el-form :model="form" :rules="rules" ref="form" :formValue="form">
        <CanvasBox v-if="stuHwInfo.stuHwFile" :data="stuHwInfo"></CanvasBox>
        <h3 v-else>暂未提交</h3>
        <el-form-item label="是否完成" prop="state">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评语">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="请输入内容"
            v-model="form.comments"
          ></el-input>
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <el-form-item label="上传作业批改附件" prop="file">
          <el-input class="correctFile" type="file" v-model="form.file"></el-input>
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
import CanvasBox from "../components/CanvasBox";
// import $ from 'jquery'
export default {
  data() {
    return {
      stuHwComplatData: [],
      hwInfo: [],
      stuHwInfo: "",
      form: {
        score: "",
        comments: "",
        state: "",
        file:"",
      },
      dialogFormVisible: false,
      // 默认显示第一条
      currentPage: 1,
      options: [
        {
          label: "已完成",
          value: 1,
        },
        {
          label: "未完成",
          value: 0,
        },
      ],
      rules: {
        state: [{ required: true, message: "请选择...", trigger: "change" }],
      },
    };
  },
  components: {
    CanvasBox,
  },
  created() {
    this.getStuHwComplatData();
    this.getHwInfo();
  },
  methods: {
    handleCorrects(index, row) {
      console.log(index, row);
      console.log("批改作业");
      this.dialogFormVisible = true;
      this.stuHwInfo = row;
    },
    getStuHwComplatData() {
      this.$axios({
        method: "get",
        url: "/api/score",
        params: {
          hwid: this.$route.params.id,
        },
      }).then((res) => {
        console.log("getStuHwComplatData---->", res);
        if (res.data.success) {
          var data = res.data.data;
          this.stuHwComplatData = data.map((item) => {
            var state = item.state == 1 ? "是" : "否";
            return { ...item, state: state };
          });
        }
      });
    },
    getHwInfo() {
      this.$axios({
        method: "get",
        url: "/api/homework",
        params: {
          id: this.$route.params.id,
        },
      }).then((res) => {
        if (res.data.success) {
          var data = res.data.data;
          this.hwInfo = data;
        }
      });
    },
    back(index, row) {
      console.log(index, row);
    },
    updateScore() {
      var formData = new FormData();
      var file = document.querySelector('.correctFile input[type=file]').files[0];
      formData.append('hwid',parseInt(this.$route.params.id))
      formData.append('stuid',this.stuHwInfo.stuid)
      formData.append('state',this.form.state)
      formData.append('score',this.form.score)
      formData.append('comments',this.form.comments)
      formData.append('resultFile',file)
      console.log(file)
      this.$axios({
        method: "put",
        url: "/api/score/correct",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$message({
              message: res.data.msg,
            });
            location.reload();
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
          });
        });
    },
    uploadResultFile() {
      var imgData = document
        .getElementById("hwImgCanvas")
        .toDataURL("image/png");
      this.$axios({
        method: "post",
        url: "/api/uploadResultFile",
        data: {
          imgData,
          hwID: this.stuHwInfo.hwID,
          stuID: this.stuHwInfo.stuID,
        },
        processData: false, //必不可少参数
        traditional: true, //比不可少参数
        contentType: false,
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log("成功");
          this.updateScore();
        //   this.uploadResultFile();
          this.dialogFormVisible = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.hwImg {
  max-width: 100%;
  min-width: 100%;
  background-size: 100% 100%;
}
</style>