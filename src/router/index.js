import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const PromptBox = (resolve) => {
  import('components/prompt-box-t/prompt-box-t').then((module) => {
    resolve(module)
  })
}

const Scroll = (resolve) => {
  import('components/scroll-t/scroll-t').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/'
    },
    {
      path: '/promptBox',
      component: PromptBox
    },
    {
      path: '/scroll',
      component: Scroll
    }
  ]
})
