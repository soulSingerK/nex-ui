let Koa = require('koa')
let Router = require('koa-router')

let app = new Koa()
let router = new Router()

router.get('/test', (ctx, next) => {
  ctx.body = {
    name: 111
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(6060)