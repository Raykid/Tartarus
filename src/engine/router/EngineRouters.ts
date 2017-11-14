import { Context } from "koa";
import IRouter from "./IRouter";
import { moduleManager } from "../module/ModuleManager";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 * 
 * 引擎提供的各种Router
*/

export class DeleteModuleRouter implements IRouter
{
    public path:RegExp = /\/\$delete(\/.*)?/;

    public async exec(ctx:Context, next:()=>Promise<any>):Promise<void>
    {
        moduleManager.deleteModule(ctx["captures"][0]);
        // 返回结果
        ctx.body = "done";
    }
}

export class RefreshModuleRouter implements IRouter
{
    public path:RegExp = /\/\$refresh(\/.*)?/;

    public async exec(ctx:Context, next:()=>Promise<any>):Promise<void>
    {
        moduleManager.refreshModule(ctx["captures"][0]);
        // 返回结果
        ctx.body = "done";
    }
}