let Koa = require('koa')
let Router = require('koa-router')
let scrollData = require('./data/index')

let app = new Koa()
let router = new Router()

router.get('/test', (ctx, next) => {
  ctx.body = scrollData
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(6060)