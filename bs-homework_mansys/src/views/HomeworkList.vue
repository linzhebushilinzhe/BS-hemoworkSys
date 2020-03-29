<template>
  <div>
      <router-link :to="getPath+'/'+item.id"
        v-for="(item,index) in getHwList" 
        :key="index">
           <el-card>
                <h3>{{item.title}}</h3>
                <span>{{item.endTime}}</span>
            </el-card>
      </router-link>
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
      console.log('name',this.$route.name)
      console.log(1111)
  },
  computed: {
      getPath(){
          return this.$route.path
      },
      getHwList(){
        return this.$store.getters.homeworkList[this.$route.name] 
      }
  },
  watch:{
    $route(to,from){
      if(this.$route.name){
        console.log('sksksks',this.$route.name)
        this.homeworkList = this.$store.getters.homeworkList[this.$route.name] 
      }
    }
  }
};
</script>
<style lang="scss">
    a{
        text-decoration: none;
    }
</style>
