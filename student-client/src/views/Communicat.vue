<template>
  <div class="communicat re">
    <ul class="ab test" style="top: 0px; bottom: 60px; width: 100%; overflow-y: auto">
      <div class="msg-box" style="height: 100%;">
        <!-- <div>{{this.$store.getters.username}}</div> -->
        <div v-for="(item, i) in msgList" :key="i">
          <el-input
            :class="item.username == $store.getters.stuName ? 'own' : 'other'"
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

<script>
// @ is an alias to /src
import $ from "jquery";
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
    var that = this;
    this.msgList = this.$store.getters.msgList;
    this.width = document.querySelector(".test").offsetWidth;
    window.onresize = function () {
      that.width = document.querySelector(".test").offsetWidth;
    };
    this.$nextTick(()=>{
      $('.test').scrollTop( $('.msg-box')[0].scrollHeight );
    })
  },
  methods: {
    sendMsg() {
      let msgInfo = {
        username: this.$store.getters.stuName,
        mssage: this.msg,
        identity: "学生",
      };
      this.$store.dispatch("SendMsg", {
        data: msgInfo,
        ws: this.$store.getters.ws,
      });
      this.msg = "";
      console.log($('.msg-box'))
      this.$nextTick(()=>{
           $('.test').scrollTop( $('.msg-box')[0].scrollHeight );
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.own {
  float: right;
  input {
    background: #66b1ff !important;
    color: #fff !important;
  }
}
.other {
  background: #ccc;
}
.communicat {
  height: 100%;
}
</style>
