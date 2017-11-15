import { Context } from "koa";
import Request, { IRequestConstructor } from "../net/server/Request";
import Response from "../net/server/Response";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-15
 * @modify date 2017-11-15
 * 
 * 将原始请求数据解析成强类型，或将强类型返回数据打包成原始数据的中间件
*/
export default function netWrapperMiddleware(requests?:IRequestConstructor[]):(ctx:Context, next:()=>Promise<any>)=>void
{
    // 注册requests
    for(var i in requests)
    {
        registerRequest(requests[i]);
    }
    // 返回中间件
    return async function(ctx:Context, next:()=>Promise<any>):Promise<void>
    {
        // 将请求数据放入ctx.request.body里，GET从query里取，其他都从body里取
        ctx.request["body"] = (ctx.method == "GET" ? ctx.query : ctx.request["body"]);
        // 获取到Request类型定义
        var cls:IRequestConstructor = requestDict[ctx.path];
        if(cls)
        {
            // 将请求解析成为强类型，并替换ctx.request.body对象
            var request:Request = new cls();
            request.parse(ctx.request["body"], ctx);
            ctx.request["body"] = request;
        }
        // 继续下一个中间件
        await next();
        // 处理返回结构体
        if(ctx.body instanceof Response)
        {
            ctx.body = ctx.body.wrap();
        }
    };
}

const requestDict:{[route:string]:IRequestConstructor} = {};

export function registerRequest(request:IRequestConstructor):void
{
    if(request) requestDict[request.route] = request;
}