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
        method: "get",
        url: "/api/teachgrade",
        params: {
          tchId: this.$store.getters.tchID
        }
      }).then(res => {
        console.log("options--->", res.data);
        this.classOptions = res.data.data.map(item=>{
            return {
                label:item.className,
                value:item.id
            }
        });
        console.log(this.classOptions)
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
