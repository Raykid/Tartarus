"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("../net/server/Response");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-15
 * @modify date 2017-11-15
 *
 * 将原始请求数据解析成强类型，或将强类型返回数据打包成原始数据的中间件
*/
function netWrapperMiddleware(requests) {
    // 注册requests
    for (var i in requests) {
        registerRequest(requests[i]);
    }
    // 返回中间件
    return async function (ctx, next) {
        // 将请求数据放入ctx.request.body里，GET从query里取，其他都从body里取
        ctx.request["body"] = (ctx.method == "GET" ? ctx.query : ctx.request["body"]);
        // 获取到Request类型定义
        var cls = requestDict[ctx.path];
        if (cls) {
            // 将请求解析成为强类型，并替换ctx.request.body对象
            var request = new cls();
            request.parse(ctx.request["body"], ctx);
            ctx.request["body"] = request;
        }
        // 继续下一个中间件
        await next();
        // 处理返回结构体
        if (ctx.body instanceof Response_1.default) {
            ctx.body = ctx.body.wrap();
        }
    };
}
exports.default = netWrapperMiddleware;
const requestDict = {};
function registerRequest(request) {
    if (request)
        requestDict[request.route] = request;
}
exports.registerRequest = registerRequest;
//# sourceMappingURL=NetWrapperMiddleware.js.map