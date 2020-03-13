<template>
    <div class="flex flex-end header align-center">
        <span>欢迎:</span>
        <span>{{this.$store.getters.username}}{{this.$store.getters.identity}}</span>
        <span>退出</span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .header {
        height: 50px;
        background: #ddd;
        span{
            margin-right: 20px;
        }
    }
</style>