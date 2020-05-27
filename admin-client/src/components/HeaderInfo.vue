<template>
    <div class="flex header align-center justify-between">
        <h1 style="margin-left: 10px;">学生作业管理系统后台</h1>
        <div>
            <span>欢迎:管理员</span>
        <span @click="logout" class="logout">退出</span>
        </div>
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