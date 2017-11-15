/// <reference types="koa" />
import { Context } from "koa";
import { IRequestConstructor } from "../net/server/Request";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-15
 * @modify date 2017-11-15
 *
 * 将原始请求数据解析成强类型，或将强类型返回数据打包成原始数据的中间件
*/
export default function netWrapperMiddleware(requests?: IRequestConstructor[]): (ctx: Context, next: () => Promise<any>) => void;
export declare function registerRequest(request: IRequestConstructor): void;
