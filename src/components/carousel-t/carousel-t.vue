<!--  -->
<template>
  <div class="component-wrapper">
    <carousel class="carousel-wrapper" :data="list"></carousel>
  </div>
</template>

<script>
import Carousel from 'base/carousel/carousel'
export default {
  data () {
    return {
      list: ['0', '1', '2', '3']
    }
  },
  components: {
    Carousel
  }
}
</script>
<style lang='scss' scoped>
  .carousel-wrapper {
    width: 400px;
    height: 200px;
    margin: 100px auto 0;
    background-color: #fff;
  }
</style>