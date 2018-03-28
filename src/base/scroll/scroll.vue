<!--  -->
<template>
  <div class="scroll-wrapper" @scroll="contentScroll" ref="wrapper" :class="{'no-select':noSelect}">
    <slot></slot>
    <div class="scroll-bar">
      <span class="up direction">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhcc_xiangshangjiantou"></use>
        </svg>
      </span>
      <div class="bar-wrapper" ref="barw">
        <div class="bar" ref="bar" @mousedown="onmousedown"></div>
      </div>
      <span class="down direction">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangxiajiantoushixin"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    isBottom: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scrollTop: -1,
      scrollHeight: -1,
      clientHeight: -1,
      barw: -1,
      bar: -1,
      barScrollTop: 0,
      noSelect: false
    }
  },
  created() {
    this.start = {}
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    onmousedown(e) {
      this.start.y = e.pageY - this.barScrollTop
      this.start.flag = true
      document.addEventListener('mousemove', this.onmousemove, false)
      document.addEventListener('mouseup', this.onmouseup, false)
    },
    onmousemove (e) {
      if (!this.start.flag) {
        return
      }
      this.noSelect = true
      let offset = e.pageY - this.start.y
      this.barScrollTop = offset
    },
    onmouseup (e) {
      this.start.flag = false
      this.noSelect = false
      document.removeEventListener('mousemove', this.onmousemove, false)
      document.removeEventListener('mousedown', this.onmousedown, false)
    },
    contentScroll (e) {
      this.scrollTop = e.target.scrollTop
      // this.scrollHeight = e.target.scrollHeight
    },
    contentToBar () {
      let percent = this.scrollTop / (this.scrollHeight - this.clientHeight)
      this.$refs.bar.style.top = `${(this.barw - this.bar) * percent}px`
    },
    barToContent () {
      let percent = this.barScrollTop / (this.barw - this.bar)
      this.$refs.wrapper.scrollTop = `${(this.scrollHeight - this.clientHeight) * percent}`
    },
    calcBarHeight () {
      this.scrollHeight = this.$refs.wrapper.scrollHeight
      let h = this.clientHeight * this.barw / this.scrollHeight
      this.$refs.bar.style.height = `${h}px`
      this.bar = h
    },
    scrollToBottom () {
      let _scrollTop = this.scrollHeight - this.clientHeight
      this.scrollTop = _scrollTop
      this.$refs.wrapper.scrollTop = _scrollTop
    },
    _initScroll () {
      this.barw = this.$refs.barw.clientHeight
      this.clientHeight = this.$refs.wrapper.clientHeight
      this.calcBarHeight()
      this.isBottom && this.scrollToBottom()
    }
  },
  watch: {
    scrollTop () {
      this.contentToBar()
    },
    barScrollTop(newVal, oldVal) {
      this.$refs.bar.style.top = `${Math.min(Math.max(this.barScrollTop, 0), this.barw - this.bar)}px`
      this.barToContent()
    },
    scrollHeight () {

    },
    data () {
      this.$nextTick(() => {
        this.calcBarHeight()
        this.isBottom && this.scrollToBottom()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .scroll-wrapper {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    .scroll-bar {
      position: absolute;
      top: 2px;
      right: 0;
      z-index: 100;
      width: 12px;
      height: calc(100% - 4px);
      border-radius: 6px;
    }
    .direction {
      position: absolute;
      color: #222;
      .icon {
        font-size: 12px;
        color: #999;
      }
      &.up {
        top: 2px;
      }
      &.down {
        bottom: 2px;
      }
    }
    .bar-wrapper {
      height: calc(100% - 32px);
      width: 100%;
      position: absolute;
      top: 18px;
      .bar {
        position: absolute;
        top: 0;
        left: 2px;
        background-color: #e2e2e2;
        width: 8px;
        height: 40px;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: #999;
        }
      }
    }
  }
  ::-webkit-scrollbar{
    display:none;
  }
</style>
