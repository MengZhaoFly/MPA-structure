"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let BooksController = (_dec = (0, _awilixKoa.route)("/books"), _dec2 = (0, _awilixKoa.route)("/create"), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.route)("/index"), _dec5 = (0, _awilixKoa.GET)(), _dec6 = (0, _awilixKoa.route)("/list"), _dec7 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class BooksController {
  constructor({
    booksServices
  }) {
    console.log('booksServices', booksServices);
    this.booksServices = booksServices;
  }

  async actionCreate(ctx, next) {
    const html = await ctx.render('books/pages/create', {
      data: '新增图书:xxx'
    });
    ctx.body = html;
  }

  async actionIndex(ctx, next) {
    const html = await ctx.render('books/pages/index', {
      data: '图书首页，欢迎'
    });
    ctx.body = html;
  }

  async actionList(ctx, next) {
    // const books = new Books();
    const result = await this.booksServices.getData({
      url: "books/index"
    });
    console.log('result->>>', result);
    const html = await ctx.render('books/pages/list', {
      data: '1、《javascript 高级程序设计》' + result.data.join(''),
      data2: 'data2'
    });
    ctx.body = html;
  } // async actionList(ctx, next) {
  //     const books = new Books();
  //     const result = await books.getData({
  //         url: "books/index"
  //     });
  //     const html = await ctx.render('books/list', {
  //         data: result.data.data
  //     });
  //     ctx.body = html;
  //     // if (ctx.request.header["x-pjax"]) {
  //     //     console.log("站内跳");
  //     //     const $ = cheerio.load(html);
  //     //     // ctx.body = $("#js-hooks-data").html()
  //     //     let _result = "";
  //     //     $(".pjaxcontext").each(function() {
  //     //         _result += $(this).html()
  //     //     });
  //     //     $(".lazyload-js").each(function() {
  //     //         _result += `<script src="${$(this).attr("src")}"></script>`;
  //     //     });
  //     //     ctx.body = _result;
  //     // } else {
  //     //     console.log("直接刷");
  //     //     ctx.body = html;
  //     // }
  //     // console.log(result);
  // }


}, (_applyDecoratedDescriptor(_class2.prototype, "actionCreate", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "actionCreate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionIndex", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "actionIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionList", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "actionList"), _class2.prototype)), _class2)) || _class);
var _default = BooksController;
exports.default = _default;