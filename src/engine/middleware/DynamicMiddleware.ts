import { Context } from "koa";
import path = require("path");
import IModule from "../module/IModule";
import { moduleManager } from "../module/ModuleManager";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 * 
 * 动态逻辑路由中间件，用来动态加载并执行逻辑
*/
export default async function dynamicMiddleware(ctx:Context, next:()=>Promise<any>):Promise<void>
{
    // 动态逻辑仅支持无扩展名形式，将有扩展名形式留给静态资源
    var extname:string = path.extname(ctx.path);
    if(extname == "")
    {
        var target:IModule = moduleManager.getModule(ctx.path);
        if(target)
        {
            // 使用await执行，便于处理异步操作
            ctx.body = await target.exec(ctx.request["body"], ctx);
            // 执行后即刻销毁，杜绝内存泄露
            await target.dispose();
            // 返回
            return;
        }
    }
    // 没找到逻辑代码，执行下一个中间件
    await next();
}