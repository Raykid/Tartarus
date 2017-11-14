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
    var extname:string = path.extname(ctx.path);
    if(extname == "")
    {
        // 没有扩展名，尝试去寻找逻辑代码
        var target:IModule = moduleManager.getModule(ctx.path);
        if(target)
        {
            // 使用await执行，便于处理异步操作
            await target.exec(ctx);
            // 销毁模块
            target.dispose();
            return;
        }
    }
    // 没找到逻辑代码，执行下一个中间件
    await next();
}