<template>
  <div class="hw-info-content flex flex-col">
    <header-info></header-info>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="作业信息" name="1" class="collapse hw-info">
        <el-row :gutter="20">
          <el-col :span="3" class="text-right">
            <h4>作业名称:</h4>
          </el-col>
          <el-col :span="21">
            <span>{{hwName}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" class="text-right">
            <h4>作业内容:</h4>
          </el-col>
          <el-col :span="21">
            <div>内容：{{hwContent}}。</div>
            <div>提交要求：{{hwDesc}}</div>
            <div>截止时间：{{endTime}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" class="text-right">
            <h4>作业附件:</h4>
          </el-col>
          <el-col :span="21">
            <el-button @click="downloadHwFile">下载</el-button>
          </el-col>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="提交作业" name="2" class="collapse hw-info-check">
        <el-row :gutter="20">
          <el-col :span="3" class="text-right">
            <h4>作业文本:</h4>
          </el-col>
          <el-col :span="21">
            <span>{{hwDesc}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" class="text-right">
            <h4>作业附件:</h4>
          </el-col>
          <el-col :span="21">
            <el-upload
              class="upload"
              ref="upload"
              :action="uploadUrl"
              :http-request="uploadHw"
              :file-list="fileList"
              accept=".png"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传png文件</div>
            </el-upload>
          </el-col>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="评语" name="3" class="collapse hw-comments">
        
        <!-- <el-input :disabled="true" type="textarea" :rows="2" placeholder="请输入内容" v-model="hwComments"></el-input> -->
       <p style="background: #eee;padding: 20px;border-radius: 10px;">
         {{hwComments}}
       </p>
        <div class="flex justify-center">
          <el-button @click="downloadResulltFile">下载结果</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import HeaderInfo from "@/components/HeaderInfo";
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      activeNames: ["1", "2", "3"],
      fileList: [],
      hwName: "",
      hwContent: "",
      hwDesc: "",
      endTime: "",
      uploadUrl: "/api/upload",
      hwComments: "",
      resultFile: "",
      hwFile: '',
    };
  },
  components: {
    HeaderInfo
  },
  created() {
    //console.log(this.$store.getters.stuID)
    //console.log(this.$route.params.id)
    this.getHwInfo();
  },
  mounted() {
    setTimeout(() => {
      this.download();
    }, 1000);
  },
  methods: {
    uploadHw(val) {
      var fd = new FormData();
      fd.append("uploadFile", val.file);
      fd.append("username", "XS5120162266");
      fd.append("hwID", this.$route.params.id);
      console.log("fd--->", fd);
      axios({
        method: "post",
        url: "/api/upload",
        data: fd
      }).then(res => {
        console.log("res -->", res);
      });
    },
    getHwInfo() {
      axios({
        method: "get",
        url: "/api/stuHomework",
        params: {
          hwID: this.$route.params.id,
          stuID: this.$store.getters.stuID
        }
      })
        .then(res => {
          console.log("res->详细作业信息", res);
          this.hwName = res.data.data[0].hwName;
          this.hwDesc = res.data.data[0].hwDesc;
          this.hwContent = res.data.data[0].hwContent;
          this.endTime = res.data.data[0].endDate;
          this.hwComments = res.data.data[0].comments;
          this.resultFile = res.data.data[0].resultFile;
          this.hwFile = res.data.data[0].hwFile
          if (res.data.data[0].stuHwFile != null) {
            this.fileList.push({
              name: res.data.data[0].stuHwFile
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    download() {
      var that = this;
      console.log("download--> start");
      $(".el-upload-list__item-name").click(function() {
        console.log("click");
        axios({
          method: "post",
          url: "/api/download",
          data: {
            filename: that.fileList[0].name
          },
          responseType: "arraybuffer"
        })
          .then(res => {
            console.log("res-download", res);
            const fileName = res.headers["content-disposition"].split("=")[1];
            const _res = res.data;
            let blob = new Blob([_res]);
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = fileName; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href);
            console.log("download--> end");
          })
          .catch(err => {
            that.$message({
              message: "登录已过期，请重新登录"
            });
            that.$router.push({
              path: "/login"
            });
          });
      });
    },
    downloadResulltFile() {
      var that = this;
      if (that.resultFile != "") {
        axios({
          method: "post",
          url: "/api/downloadResultFile",
          data: {
            filename: that.resultFile
          },
          responseType: "arraybuffer"
        })
          .then(res => {
            console.log("res-download", res);
            const fileName = res.headers["content-disposition"].split("=")[1];
            const _res = res.data;
            let blob = new Blob([_res]);
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob); 
            downloadElement.href = href;
            downloadElement.download = fileName;
            document.body.appendChild(downloadElement);
            downloadElement.click(); 
            document.body.removeChild(downloadElement); 
            window.URL.revokeObjectURL(href);
            console.log("download--> end");
          })
          .catch(err => {
            that.$message({
              message: "登录已过期，请重新登录"
            });
            that.$router.push({
              path: "/login"
            });
          });
      }
    },
    downloadHwFile(){
      console.log(this.hwFile)
      if(this.hwFile) {
        axios({
          method: "post",
          url: "/api/downloadHwFile",
          data: {
            filename: this.hwFile
          },
          responseType: "arraybuffer"
        })
          .then(res => {
            console.log("res-download", res);
            const fileName = res.headers["content-disposition"].split("=")[1];
            const _res = res.data;
            let blob = new Blob([_res]);
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob); 
            downloadElement.href = href;
            downloadElement.download = fileName; 
            document.body.appendChild(downloadElement);
            downloadElement.click(); 
            document.body.removeChild(downloadElement); 
            window.URL.revokeObjectURL(href);
            console.log("download--> end");
          })
          .catch(err => {
            that.$message({
              message: "登录已过期，请重新登录"
            });
            that.$router.push({
              path: "/login"
            });
          });
      }
    }
  }
};
</script>
<style lang="scss">
.hw-info-content {
  height: 100%;
  background: #ddd;
  .collapse {
    .el-collapse-item__header {
      padding: 0 10px;
    }
  }
  .hw-info {
    margin-top: 50px;
  }
  .hw-info,
  .hw-info-check,
  .hw-comments {
    padding: 0px 100px;
    margin-bottom: 10px;
    border-top: none;
    border-bottom: none;
  }
  .hw-comments {
    p {
      margin-left: 20px;
    }
  }
}
</style>