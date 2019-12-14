import { route, GET } from "awilix-koa";

@route("/")
class IndexController {

    @route("/")
    @GET()
    async  actionIndex(ctx, next) {
        // ctx.body  =  await ctx.render('index', {
        //     body: '欢迎<script type="text/javascript">alert("dab")</script>'
        // });
        console.log('欢迎来到首页');
        ctx.body = "欢迎来到首页"

    }
}

export default IndexController;