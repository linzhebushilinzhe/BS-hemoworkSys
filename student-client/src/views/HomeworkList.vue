<template>
  <div class="hw-list">
      <div @click="tabTo(item.hwID)"
        v-for="(item,index) in getHwList" 
        :key="index">
           <el-card>
                <h3 class="title">{{item.hwName}}</h3>
                <span>截止时间：</span>
            </el-card>
      </div>
  </div>
</template>
<script>
export default {
  name: "homework",
  data() {
    return {
      homeworkList: []
    };
  },
  created(){
      //console.log('name',this.$route.name)
      //console.log(1111)
      
  },
  mounted(){
    console.log("homeworkLis-->", this.homeworkList)
  },
  computed: {
      getPath(){
          return this.$route.path
      },
      getHwList(){
        return this.$store.getters.homeworkList[this.$route.name] 
      },
     
  },
  watch:{
    $route(to,from){
      if(this.$route.name){
        //console.log('sksksks',this.$route.name)
        this.homeworkList = this.$store.getters.homeworkList[this.$route.name] 
        //console.log("homeworkLis-->", this.homeworkList)
      }
    }
  },
  methods: {
    tabTo(id){
      this.$router.push({
        path: this.$route.path + '/' + id
      })
    }
  }
};
</script>
<style lang="scss">
    a{
        text-decoration: none;
    }
    .hw-list{
      height: 500px;
      overflow-y: scroll;
      .title{
        margin-bottom: 10px
      }
    }
</style>
