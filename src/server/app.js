import Koa from 'koa'
import serve from 'koa-static'
import render from 'koa-swig'
import config from './config'
const app = new Koa()
import { wrap } from 'co'
import errorHandler from './middlewares/errorHandler'
import { configure, getLogger } from 'log4js'
// import Router from 'koa-router'
// const router = new Router();
import { createContainer,
   Lifetime } from 'awilix';
import { loadControllers,
   scopePerRequest } from 'awilix-koa';
/**
 * 该页面 自动注入：
 * Router 
 */

// import controllers from './controllers'

// 1. 构建容器
const container = createContainer()
// 2. 每一个controller把需要的service注册进去
//  把所有的service注册容器
container.loadModules([__dirname + ["/services/*.js"]], {
  formatName: "camelCase",
  resolverOptions: {
      lifetime: Lifetime.SCOPED
  }
});

// 3. 把容器和路由合并到一起
app.use(scopePerRequest(container));
configure({
  appenders: { cheese: { type: 'file', filename: __dirname + '/logs/book.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
app.use(serve(config.staticDir))

// controllers(app, router)
// app.use(router.routes())
// app.use(router.allowedMethods())

app.context.render = wrap(
  render({
    root: config.viewDir,
    autoescape: true, //注意这个配置项目
    cache: false,
    ext: 'html',
    writeBody: false
  })
)
//先让他next 再次的判断当前的业务情况
const logger = getLogger('cheese')
errorHandler.error(app, logger)

// loads files matching a glob pattern and registers their exports as controllers.
// 4. 加载所有的路由

app.use(loadControllers(__dirname + "/controllers/*.js"));

app.listen(config.port, () => {
  console.log(`图书管理平台启动成功, http://localhost:${config.port}`)
})
