<template>
  <div class="communicat re">
    <ul class="ab" style="top:0px;bottom: 60px;width: 100%">
      <div style="height: 100%;overflow-y:auto">
        <!-- <div>{{this.$store.getters.username}}</div> -->
        <div v-for="(item,i) in msgList" :key="i">
          <el-input 
          :class="item.username == $store.getters.stuName ? 'own': 'other'" 
          style="margin-top: 20px; width: 800px;" 
          :value="item.username+item.identity+':'+item.mssage"></el-input>
        </div>
      </div>
    </ul>
    <div class="fixed" style="width:100%; bottom: 10px">
      <div class="flex">
        <el-input style="width:75%;" v-model="msg" placeholder="信息"></el-input>

        <el-button type="primary" @click="sendMsg">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "communicat",
  data() {
    return {
      msgList: [],
      msg: "",
      ws: new WebSocket("ws://127.0.0.1:5000")
    };
  },
  mounted() {
    var that = this;
    this.ws.onopen = function(e) {
      console.log("连接服务器成功");
    };
    this.ws.onclose = function(e) {
      console.log("服务器关闭");
    };
    this.ws.onerror = function() {
      console.log("连接出错");
    };
    //3.监听 服务端的消息 后渲染页面
    this.ws.onmessage = function(event) {
      let data = JSON.parse(event.data);
      if (data.username != that.$store.getters.stuName) {
        that.msgList.push({
          username: data.username,
          mssage: data.mssage,
          identity: data.identity
        });
      }
    };
  },
  methods: {
    sendMsg() {
      let msgInfo = {
        username: this.$store.getters.stuName,
        mssage: this.msg,
        identity: '学生'
      };
      if (this.ws.readyState != 3) {
        this.ws.send(JSON.stringify(msgInfo));
        this.msgList.push(msgInfo);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.own{
    float: right;
    input{
      background: #66b1ff !important;
      color: #fff !important;
    }
}
.other{
    background: #ccc;
}
.communicat {
  height: 100%;
}
</style>
