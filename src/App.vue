<script>
import AppHeader from '@/components/AppHeader.vue';
export default{
  components:{
    AppHeader
  }
}
</script>

<template>
  <div id="app">
    <app-header/>

    <div class="container mt-3">
      <router-view/>
    </div>

  </div>
</template>

<style scoped>
  .page{
    max-width: 750px;
    margin: auto;
  }

</style>
