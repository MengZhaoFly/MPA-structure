"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _config = _interopRequireDefault(require("./config"));

var _co = require("co");

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _log4js = require("log4js");

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default();

/**
 * 该页面 自动注入：
 * Router 
 */
// import controllers from './controllers'
// 1. 构建容器
const container = (0, _awilix.createContainer)(); // 2. 每一个controller把需要的service注册进去
//  把所有的service注册容器

container.loadModules([__dirname + ["/services/*.js"]], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
}); // 3. 把容器和路由合并到一起

app.use((0, _awilixKoa.scopePerRequest)(container));
(0, _log4js.configure)({
  appenders: {
    cheese: {
      type: 'file',
      filename: __dirname + '/logs/book.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});
app.use((0, _koaStatic.default)(_config.default.staticDir)); // controllers(app, router)
// app.use(router.routes())
// app.use(router.allowedMethods())

app.context.render = (0, _co.wrap)((0, _koaSwig.default)({
  root: _config.default.viewDir,
  autoescape: true,
  //注意这个配置项目
  cache: false,
  ext: 'html',
  writeBody: false
})); //先让他next 再次的判断当前的业务情况

const logger = (0, _log4js.getLogger)('cheese');

_errorHandler.default.error(app, logger); // loads files matching a glob pattern and registers their exports as controllers.
// 4. 加载所有的路由


app.use((0, _awilixKoa.loadControllers)(__dirname + "/controllers/*.js"));
app.listen(_config.default.port, () => {
  console.log(`图书管理平台启动成功, http://localhost:${_config.default.port}`);
});