<template>
  <div class="component-wrapper">
    <scroll :data="scrollData" :is-bottom="true">
      <p v-for="(item, index) in scrollData" :key="index">
        {{item}}
      </p>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import fetch from 'common/js/fetch'
export default {
  data () {
    return {
      scrollData: []
    }
  },
  created () {
    this._requestScrollData()
  },
  methods: {
    addData () {
      let index = 101
      setInterval(() => {
        this.scrollData.push(`this is ${index++}`)
      }, 500)
    },
    _requestScrollData() {
      fetch('/test').then((res) => {
        this.scrollData = res
        // this.addData()
      })
    }
  },
  components: {
    Scroll
  }
}
</script>
<style lang='scss' scoped>
</style>