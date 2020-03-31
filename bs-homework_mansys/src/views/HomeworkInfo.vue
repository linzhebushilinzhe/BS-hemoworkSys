<template>
  <div class="hw-info-content flex flex-col">
    <header-info></header-info>
    <el-collapse v-model="activeNames" @change="handleChange" class="hw-info">
      <el-collapse-item title="作业信息" name="1">
        <el-row :gutter="20">
          <el-col :span="3" class="text-right">
            <h4>作业名称:</h4>
          </el-col>
          <el-col :span="21">
            <span>数字图像频域隐写与分析技术的实现（30分）</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" class="text-right">
            <h4>作业内容:</h4>
          </el-col>
          <el-col :span="21">
            <div>
              <div>内容：</div>
              <div>1、隐写：完成F4隐写或F5隐写。</div>
              <div>2、分析：完成隐写程序及对应的分析检测。</div>
              <div>3、算法完成后形成相关小论文。</div>
              <div>4、相关程序应有界面做交互。</div>
            </div>
            <div>
              <div>要求：</div>
              <div>1、针对JPEG图片类型做隐写和分析。（F4隐写8分，F4分析8分；F5隐写10分，F5分析10分；分析可用工具代替，6分）</div>
              <div>2、要求每人各自独立完成所有的论文、隐写和分析算法。</div>
              <div>3、小论文要求版面符合论文格式（摘要，关键字）、（目录）、（图文排版）、（文字内容）、（文献，附录）（2分）；内容符合要求（参见学校毕业设计论文），有核心代码（算法）（3分）。（共10分）</div>
              <div>4、载入的隐秘数据量应有两种，较多嵌入和较少嵌入。</div>
            </div>
            <div>
              <div>提交要求：单独完成。需提交论文、可执行程序、源代码、工具（如用到，只需提供下载链接）</div>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import HeaderInfo from "@/components/HeaderInfo";
export default {
  data() {
    return {
      activeNames: ["1"]
    };
  },
  components: {
    HeaderInfo
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss">
.hw-info-content {
  height: 100%;
  background: #ddd;
  .hw-info {
    height: 100%;
    padding: 0px 100px;
    border-top: none;
  }
}
</style>