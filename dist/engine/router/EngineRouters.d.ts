/// <reference types="koa" />
import { Context } from "koa";
import IRouter from "./IRouter";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * 引擎提供的各种Router
*/
export declare class DeleteModuleRouter implements IRouter {
    path: RegExp;
    exec(ctx: Context, next: () => Promise<any>): Promise<void>;
}
export declare class RefreshModuleRouter implements IRouter {
    path: RegExp;
    exec(ctx: Context, next: () => Promise<any>): Promise<void>;
}
