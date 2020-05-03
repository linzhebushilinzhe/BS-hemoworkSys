<template>
  <div class="student-table">
    <el-table :data="hwInfo">
      <el-table-column prop="hwName" label="作业名"></el-table-column>
      <el-table-column prop="hwContent" label="作业内容"></el-table-column>
      <el-table-column prop="endDate" label="截止日期"></el-table-column>
    </el-table>
    <el-table :data="stuHwComplatData" max-height="500">
      <el-table-column prop="stuName" label="学生姓名"></el-table-column>
      <el-table-column prop="stuID" label="学号"></el-table-column>
      <el-table-column prop="state" label="是否提交"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
      <el-table-column prop="comments" label="评语"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleCorrects(scope.$index, scope.row)">批改作业</el-button>
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
        <CanvasBox v-if="stuHwInfo.stuHwFile" :data="stuHwInfo.stuHwFile"></CanvasBox>
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
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入内容"
            v-model="form.comments"
          ></el-input>
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="form.score"></el-input>
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
        endDate: "",
        score: "",
        comments: "",
        state: "",
      },
      dialogFormVisible: false,
      // 默认显示第一条
      currentPage: 1,
      options: [
        {
          label: "已完成",
          value: 1
        },
        {
          label: "未完成",
          value: 0
        }
      ],
      rules: {
        state: [{ required: true, message: "请选择...", trigger: "change" }]
      }
    };
  },
  components: {
    CanvasBox
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
        url: "/api/hwComplet",
        params: {
          hwID: this.$route.params.id
        }
      }).then(res => {
        console.log("getStuHwComplatData---->", res);
        if (res.data.success) {
          var data = res.data.data;
          this.stuHwComplatData = data;
        }
      });
    },
    getHwInfo() {
      this.$axios({
        method: "get",
        url: "/api/homeworkInfo",
        params: {
          hwID: this.$route.params.id
        }
      }).then(res => {
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
      this.$axios({
        method: "post",
        url: "/api/updateScore",
        data: {
          hwID: parseInt(this.$route.params.id),
          stuID: this.stuHwInfo.stuID,
          state: this.form.state,
          score: this.form.score,
          comments: this.form.comments,
          resultFile: this.form.resultFile
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.$message({
              message: res.data.msg
            });
            location.reload();
          }
        })
        .catch(err => {
          this.$message({
            message: err
          });
        });
    },
    uploadResultFile(){
      var imgData = document.getElementById('hwImgCanvas').toDataURL('image/png')
      // console.log(pic)

      /* $.ajax({
        type: 'post',
        url: '/api/uploadResultFile',
        data: {
          imgData
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success(res){
          console.log(res)
        } 
      })*/
      this.$axios({
        method: 'post',
        url: '/api/uploadResultFile',
        data: {
          imgData
        },
        processData: false, //必不可少参数
        traditional: true, //比不可少参数
        contentType: false,
      })
    },
    submit() {
      this.uploadResultFile()
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('成功')
          this.dialogFormVisible = false;
          this.updateScore();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.hwImg {
  max-width: 100%;
  min-width: 100%;
  background-size: 100% 100%;
}
</style>