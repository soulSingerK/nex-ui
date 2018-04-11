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

const EditElement = (resolve) => {
  import('components/edit-element-t/edit-element-t').then((module) => {
    resolve(module)
  })
}

const Carousel = resolve => {
  import('components/carousel-t/carousel-t').then(module => {
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
    },
    {
      path: '/editable',
      component: EditElement
    },
    {
      path: '/carousel',
      component: Carousel
    }
  ]
})
