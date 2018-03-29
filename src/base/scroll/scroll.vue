<!--  -->
<template>
  <div class="scroll-wrapper" @scroll="contentScroll" ref="wrapper" :class="{'no-select':noSelect}" @mouseenter="barVisible=true" @mouseleave="barVisible=false">
    <slot></slot>
    <div class="scroll-bar">
      <span class="up direction">
        <svg class="icon" aria-hidden="true" @click="_upLoad">
          <use xlink:href="#icon-zhcc_xiangshangjiantou"></use>
        </svg>
      </span>
      <div class="bar-wrapper" ref="barw">
        <div class="bar" ref="bar" @mousedown="onmousedown" v-show="barVisible" :class="{'hover-bg': barBg}"></div>
      </div>
      <span class="down direction">
        <svg class="icon" aria-hidden="true" @click="_downLoad">
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
      noSelect: false,
      barVisible: false,
      barBg: false
    }
  },
  created() {
    this.start = {}
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.onmouseup, false)
  },
  methods: {
    onmousedown(e) {
      this.start.y = e.pageY - (this.barScrollTop || 0)
      this.start.x = e.pageX
      this.start.flag = true
      this.barBg = true
      document.addEventListener('mousemove', this.onmousemove, false)
      document.addEventListener('mouseup', this.onmouseup, false)
    },
    onmousemove (e) {
      if (!this.start.flag) {
        return
      }
      this.noSelect = true
      this.barVisible = true
      let offset = e.pageY - this.start.y
      this.barScrollTop = offset
    },
    onmouseup (e) {
      this.start.flag = false
      this.noSelect = false
      this.barBg = false
      this.barVisible = this._mouseIsInWrapper(e)
      // if (e.path[1] !== this.$refs.wrapper && e.target !== this.$refs.bar && e.target !== this.$refs.barw) {
      //   this.barVisible = false
      // }
      document.removeEventListener('mousemove', this.onmousemove, false)
      document.removeEventListener('mousedown', this.onmousedown, false)
    },
    contentScroll (e) {
      this.scrollTop = e.target.scrollTop
    },
    contentToBar () {
      let percent = this.scrollTop / (this.scrollHeight - this.clientHeight)
      let _top = (this.barw - this.bar) * percent
      this.barScrollTop = _top
      this.$refs.bar.style.top = `${_top}px`
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
    scrollToTop () {
      this.scrollTop = 0
      this.$refs.wrapper.scrollTop = 0
    },
    _initScroll () {
      this.barw = this.$refs.barw.clientHeight
      this.clientHeight = this.$refs.wrapper.clientHeight
      this.calcBarHeight()
      this.isBottom && this.scrollToBottom()
    },
    _upLoad () {
      this.scrollToTop()
      this.$emit('uprefresh')
    },
    _downLoad () {
      this.scrollToBottom()
      this.$emit('downrefresh')
    },
    _mouseIsInWrapper (e) {
      let wrapper = this.$refs.wrapper
      let offsetLeft = wrapper.getBoundingClientRect().left
      let offsetTop = wrapper.getBoundingClientRect().top
      let rangeLeft = offsetLeft + wrapper.clientWidth
      let rangeTop = offsetTop + wrapper.clientHeight
      if (e.pageX > rangeLeft || e.pageX < offsetLeft || e.pageY > rangeTop || e.pageY < offsetTop) {
        return false
      }
      return true
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
        cursor: pointer;
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
        &.hover-bg {
          background-color: #999;
        }
      }
    }
  }
  ::-webkit-scrollbar{
    display:none;
  }
</style>
