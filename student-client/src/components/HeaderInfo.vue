<template>
    <div class="flex flex-end header align-center">
        <span>欢迎:</span>
        <el-popover
            placement="top-start"
            title="用户信息"
            width="200"
            trigger="hover">
            <el-row>姓名：郑鹏</el-row>
            <el-row>学号：5120162266</el-row>
            <el-row>班级：信安1605</el-row>
            <el-button slot="reference">
                {{this.$store.getters.username}}
                {{this.$store.getters.identity | identity(this.$store.getters.identity )}}
            </el-button>
        </el-popover>  
        <span @click="logout" class="logout">退出</span>
    </div>
</template>
<script>
export default {
    name: 'headerInfo',
    filters:{
        identity(data){
            if (data == 'student') {
                return '同学'
            }
        }
    },
    methods: {
        open() {
            this.$confirm('修改密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            })
        },
        logout(){
            this.$router.push({
                path: '/login'
            })
        }
    }
}
</script>
<style lang="scss">
    .header {
        height: 50px;
        background: #ddd;
        span{
            margin-right: 20px;
        }
        .logout,
        .user-info{
            cursor: pointer;
        }
    }
</style>