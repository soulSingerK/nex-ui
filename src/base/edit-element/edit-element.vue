<!--  -->
<template>
  <div class="editable-wrapper">
    <div class="editable" contenteditable="true" ref="edit" @contextmenu="copy"><img width="20" height="20" src="http://y0.ifengimg.com/cmpp/2014/02/28/15/56caf02d-754d-4be7-a416-874f2ed11557.jpg" alt="">
    <img width="20" height="20" src="http://y0.ifengimg.com/cmpp/2014/02/28/15/56caf02d-754d-4be7-a416-874f2ed11557.jpg" alt=""></div>
    <button @click="send">send</button>
    <input type="file">
  </div>
</template>

<script>
export default {
  data () {
    return {
      pos: -1,
      msg: {
        msg: '',
        imgs: []
      }
    }
  },
  mounted () {
    document.addEventListener('keyup', this.bindCordCursorPos)
    document.addEventListener('mouseup', this.bindCordCursorPos)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.bindCordCursorPos)
    document.removeEventListener('mouseup', this.bindCordCursorPos)
  },
  methods: {
    copy() {

    },
    send() {
      let dom = this.$refs.edit
      this.msg.msg = this._analysisMsgImg(dom.innerHTML)
      if (this._checkMsg()) {
        this.$emit('sendMsg', Object.assign({}, this.msg))
        this._emptyMsg()
        dom.innerHTML = ''
      }
    },
    _checkMsg() {
      return this.msg.msg || this.msg.imgs.length
    },
    _emptyMsg () {
      this.msg.msg = ''
      this.msg.imgs = []
    },
    _analysisMsgImg(inHtml) {
      if (!inHtml) {
        return ''
      }
      let _this = this
      let temmp = inHtml.replace(/<img(.*?)>/gi, (match) => {
        let tempDiv = document.createElement('div')
        tempDiv.innerHTML = match
        let imgEle = tempDiv.getElementsByTagName('img')[0]
        _this.msg.imgs.push(imgEle.src)
        imgEle = null
        return ''
      })
      console.log(temmp)
    },
    bindCordCursorPos () {
      this.pos = this._getCaretCharacterOffsetWithin(this.$refs.edit)
      console.log(this.pos)
    },
    _getCaretCharacterOffsetWithin (element) {
      let caretOffset = 0
      let doc = element.ownerDocument || element.document
      let win = doc.defaultView || doc.parentWindow
      let sel
      if (typeof win.getSelection !== 'undefined') {
        sel = win.getSelection()
        if (sel.rangeCount > 0) {
          let range = win.getSelection().getRangeAt(0)
          let preCaretRange = range.cloneRange()
          preCaretRange.selectNodeContents(element)
          preCaretRange.setEnd(range.endContainer, range.endOffset)
          caretOffset = preCaretRange.toString().length
        }
      } else if ((sel = doc.selection) && sel.type !== 'Control') {
        let textRange = sel.createRange()
        let preCaretTextRange = doc.body.createTextRange()
        preCaretTextRange.moveToElementText(element)
        preCaretTextRange.setEndPoint('EndToEnd', textRange)
        caretOffset = preCaretTextRange.text.length
      }
      return caretOffset
    }
  }
}
</script>
<style lang='scss' scoped>
  .editable-wrapper {
    width: 400px;
    height: 200px;
    margin: 0 auto;
    margin-top: 90px;
    .editable {
      background-color: #fff;
      width: 100%;
      height: 100%;
      outline: none;
    }
  }
</style>