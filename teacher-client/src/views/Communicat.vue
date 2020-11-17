<template>
  <div class="communicat re">
    <ul class="ab test" style="top: 0px; bottom: 60px; width: 100%">
      <div class="msg-box" style="height: 100%; overflow-y: auto">
        <!-- <div>{{this.$store.getters.username}}</div> -->
        <div v-for="(item, i) in msgList" :key="i">
          <el-input
            :class="item.username == $store.getters.tchName ? 'own' : 'other'"
            style="margin-top: 20px; width: 51%"
            :value="item.username + item.identity + ':' + item.mssage"
          ></el-input>
        </div>
      </div>
    </ul>
    <div class="fixed" :style="{ width: width + 'px', bottom: 10 + 'px' }">
      <div class="flex">
        <div class="flex1">
          <el-input v-model="msg" placeholder="信息"></el-input>
        </div>
        <div>
          <el-button type="primary" @click="sendMsg">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
<script>
// @ is an alias to /src

export default {
  name: "communicat",
  data() {
    return {
      width: "",
      msgList: [],
      msg: "",
      //   ws: new WebSocket("ws://127.0.0.1:5000"),
    };
  },
  mounted() {
    this.msgList = this.$store.getters.msgList;
    var that = this;
    this.width = document.querySelector(".test").offsetWidth;
    window.onresize = function () {
      that.width = document.querySelector(".test").offsetWidth;
    };
  },
  methods: {
    sendMsg() {
      let msgInfo = {
        username: this.$store.getters.tchName,
        mssage: this.msg,
        identity: "教师",
      };
      this.$store.dispatch("SendMsg", {
        data: msgInfo,
        ws: this.$store.getters.ws,
      });
      this.msg = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.own {
  float: right;
}
.other {
  background: #ccc;
}
.communicat {
  height: 100%;
}
</style>
