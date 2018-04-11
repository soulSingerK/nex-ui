<!--  -->
<template>
  <div class="items-wrapper" ref="wrapper">
    <ul class="items" :style="itmsStyle" ref="items">
      <li v-for="(item, index) in data" :key="index" class="item" :style="itmStyle">
        {{item}}
      </li>
    </ul>
    <span class="navigation left" @click="lastItem"> </span>
    <span class="navigation right" @click="nextItem"> </span>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      itmsStyle: {
        width: '',
        transform: ''
      },
      itmStyle: null,
      currentIndex: 1,
      offset: 0,
      translate: 0
    }
  },
  created () {
    this.handleData()
  },
  mounted () {
    this.$nextTick(() => {
      this.calcWidth()
    })
  },
  methods: {
    lastItem () {
      if (this.currentIndex - 1 >= 0) {
        this.currentIndex -= 1
        this.translate += this.offset
      }
    },
    nextItem () {
      if (this.currentIndex + 1 < this.data.length - 1) {
        this.currentIndex += 1
        this.translate -= this.offset
      }
    },
    calcWidth () {
      let itemsWidth = this.$refs.wrapper.clientWidth
      this.offset = itemsWidth / 2
      this.itmsStyle.width = `${this.data.length * this.offset}px`
      this.translate = -this.offset
      this.itmStyle = {
        width: `${this.offset}px`
      }
    },
    translateItems () {
      this.itmsStyle.transform = `translateX(${this.translate}px)`
    },
    handleData() {
      let temp = this.data[0]
      this.data.unshift(this.data[this.data.length - 1])
      this.data.push(temp)
    }
  },
  computed: {
  },
  watch: {
    translate (newVal, oldVal) {
      this.translateItems()
    }
  }
}
</script>
<style lang='scss' scoped>
  .items-wrapper {
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
  }
  .items {
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    transition: transform .3s ease;
  }
  .item {
    width: 50%;
    height: 100%;
    float: left;
    &.current {
      background-color: red;
    }
  }
  .navigation {
    display: block;
    width: 20px;
    height: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    background-color: #000;
    cursor: pointer;
    color: #fff;
    &.left {
      left: 20px;
    }
    &.right {
      right: 20px;
    }
  }
</style>