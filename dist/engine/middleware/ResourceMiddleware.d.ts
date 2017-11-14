/// <reference types="koa" />
import { Context } from "koa";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * 加载静态资源的中间件
*/
export default function resourceMiddleware(ctx: Context, next: () => Promise<any>): Promise<void>;
