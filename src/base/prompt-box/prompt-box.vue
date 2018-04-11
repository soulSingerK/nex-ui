<!--  -->
<template>
  <transition name="slide">
    <div class="prompt-box-wrapper" v-if="isShow && selfControlShow" ref="box" :style="boxPos">
      <p class="prompt-box-text">{{content}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    hideTime: {
      type: Number,
      default: 2000
    },
    parentDom: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      selfControlShow: true
    }
  },
  created () {
    console.log(this.parentDom)
  },
  mounted () {
    this.$nextTick(() => {
      this.hide()
    })
  },
  methods: {
    hide () {
      this.timer = setTimeout(() => {
        this.selfControlShow = false
      }, this.hideTime)
    }
  },
  computed: {
    boxPos () {
      if (!this.parentDom) {
        return
      }
      return {
        bottom: `-${this.$refs.box.clientHeight + 20}px`,
        left: `${this.parentDom.width / 2}px`,
        transform: `translateX(-50%)`
      }
    }
  },
  watch: {
  },
  beforeDestroy () {
    this.timer = null
  }
}
</script>
<style lang='scss' scoped>
  .prompt-box-wrapper {
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e2e2e2;
    .prompt-box-text {
      padding: 20px;
      font-size: 12px;
    }
  }
  .prompt-box-info {
    &:after, &:before {
      border: solid transparent;
      content: '';
      height: 0;
      position: absolute;
      width: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    &:before {
      top: -17px;
      border-width: 10px;
      border-bottom-color: #fff;
      z-index: 10;
    }
    &:after {
      top: -16px;
      border-width: 8px;
      border-bottom-color: #e2e2e2;
      z-index: 8;
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: opacity .5s;
  }
  .slide-enter, .slide-leave-to {
    opacity: 0;
  }
</style>