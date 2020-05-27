 <template>
  <div>
    <div class="flex flex-col">
      <div> 
        <router-link class="class-info"
        v-for="(item,i) in classOptions" :key="i"
        :to="'/class/'+item.value" >
          <span>{{item.label}}</span>
        </router-link>
      </div>
      <router-view class="flex1"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        classOptions: '',
    };
  },
  created() {
      this.getClassOptions()
  },
  methods: {
    getClassOptions() {
      this.$axios({
        method: "post",
        url: "/api/teacherClassOptions",
        data: {
          username: this.$store.getters.tchID
        }
      }).then(res => {
        this.classOptions = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .class-info{
    margin-right: 20px;
    &.router-link-active{
      color: red;
    }
  }
</style>
