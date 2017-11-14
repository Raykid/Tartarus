/// <reference types="koa" />
import { Context } from "koa";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * 动态逻辑路由中间件，用来动态加载并执行逻辑
*/
export default function dynamicMiddleware(ctx: Context, next: () => Promise<any>): Promise<void>;
