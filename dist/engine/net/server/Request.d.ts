/// <reference types="koa" />
import { Context } from "koa";
import Response from "./Response";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-15
 * @modify date 2017-11-15
 *
 * 作为服务器端的请求基类
*/
export default abstract class Request {
    /**
     * 创建一个返回结构体
     *
     * @abstract
     * @returns {Response} 被创建的返回结构体
     * @memberof Request
     */
    abstract createResponse(): Response;
    /**
     * 将原始数据解析为Request强类型对象，需要依赖koa-bodyparser中间件
     *
     * @abstract
     * @param {*} data 原始数据对象
     * @param {Context} [ctx] 运行上下文
     * @returns {Request}
     * @memberof Request
     */
    abstract parse(data: any, ctx?: Context): void;
}
export interface IRequestConstructor {
    new (): Request;
    /**
     * 可以静态获取到请求对应的路由地址
     *
     * @type {string}
     * @memberof IRequestConstructor
     */
    readonly route: string;
}
