/// <reference types="koa" />
import { Context } from "koa";
import IRouter from "./IRouter";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * 热更新模块的Router
*/
export default class RefreshModuleRouter implements IRouter {
    path: RegExp;
    exec(ctx: Context, next: () => Promise<any>): Promise<void>;
}
