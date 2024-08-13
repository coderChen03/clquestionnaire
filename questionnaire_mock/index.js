const Koa = require('koa')
const Koa_Router = require("koa-router");
const mockList = require('./mock/index')

const app = new Koa()
const router = new Koa_Router()

//模仿请求 给每个请求增加1s延迟
const getRes = async (fn, ctx) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx)
      resolve(res)
    }, 1000)
  })
}

// 循环注册路由
mockList.forEach(item => {
  const { url, method, response } = item
  router[method](url, async ctx => {
    const res = await getRes(response, ctx)
    ctx.body = res
  })
})

app.use(router.routes())

app.listen(3001)