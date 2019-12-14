// import Books from "../models/Books";
import {route, GET} from "awilix-koa";

@route("/books")
class BooksController {
    constructor({booksServices}) {
        console.log('booksServices', booksServices);
        this.booksServices = booksServices;
    }
    @route("/create")
    @GET()
    async actionCreate(ctx, next) {
        const html = await ctx.render('books/pages/create', {
            data: '新增图书:xxx'
        });
        ctx.body = html;
    }
    @route("/index")
    @GET()
    async actionIndex(ctx, next) {
        const html = await ctx.render('books/pages/index', {
            data: '图书首页，欢迎'
        });
        ctx.body = html;
    }
    @route("/list")
    @GET()
    async actionList(ctx, next) {
        // const books = new Books();
        const result = await this.booksServices.getData({
            url: "books/index"
        });
        console.log('result->>>', result)
        const html = await ctx.render('books/pages/list', {
            data: '1、《javascript 高级程序设计》' + result.data.join(''),
            data2:'data2'
        });
        ctx.body = html;
    }
   
    // async actionList(ctx, next) {
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
}
export default BooksController;