const http = require('http')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const webSocket = require('ws')
const app = new Koa()
const router = new KoaRouter()

const Cors = require('./middlewares/cors')

const friends = require('./data')

router.get('/', async (ctx, next) => {
  ctx.body = {
    data: friends
  }

  next()
})

app.use(router.routes()).use(router.allowedMethods())
app.use(Cors())

const webSocketApi = require('./utils/ws')

const server = http.createServer(app.callback())

const ws = new webSocket.Server({
  server,
})

webSocketApi(ws)

server.listen(9011)
