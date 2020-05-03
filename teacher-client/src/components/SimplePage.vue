<template>
    <div class="simple-page">
        <assign-form ></assign-form>
    </div>
</template>
<script>
import AssignForm from '../views/AssignForm';
export default {
    data(){
        return {}
    },
    components:{
        AssignForm
    }
}
</script>
<style lang='scss' scoped>
    .simple-page{
        height: 100%;
        overflow: hidden;
    }
</style>