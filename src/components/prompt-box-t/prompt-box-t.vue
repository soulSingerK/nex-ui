<!--  -->
<template>
  <div class="component-wrapper">
    <div class="test-dom" ref="test">
      <prompt-box :content="content" :is-show="true" :hide-time="10000" :parent-dom="parentDom"></prompt-box>
    </div>
  </div>
</template>

<script>
import PromptBox from 'base/prompt-box/prompt-box'
export default {
  data () {
    return {
      content: '将在5秒钟之后消失',
      parentDom: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.parentDom = this.calcBox(this.$refs.test)
      console.log()
    })
  },
  methods: {
    calcBox (dom) {
      if (!dom) {
        return
      }
      return {
        height: dom.clientHeight,
        width: dom.clientWidth
      }
    }
  },
  components: {
    PromptBox
  }
}
</script>

<style lang='scss' scoped>
  .test-dom {
    width: 300px;
    height: 200px;
    position: relative;
    background-color: #ef5200;
  }
</style>
