/// <reference types="koa" />
import { Context } from "koa";
import IMessage from "../../core/message/IMessage";
import IModule from "./IModule";
import Request from "../net/server/Request";
import Response from "../net/server/Response";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * 为模块提供默认实现
*/
export default abstract class Module implements IModule {
    private _disposed;
    /**
     * 是否已经被销毁
     *
     * @readonly
     * @type {boolean}
     * @memberof Module
     */
    readonly disposed: boolean;
    /**
     * 派发内核消息
     *
     * @param {IMessage} msg 内核消息实例
     * @memberof Core
     */
    dispatch(msg: IMessage): void;
    /**
     * 派发内核消息，消息会转变为Message类型对象
     *
     * @param {string} type 消息类型
     * @param {...any[]} params 消息参数列表
     * @memberof Core
     */
    dispatch(type: string, ...params: any[]): void;
    /**
     * 运行模块
     *
     * @abstract
     * @param {Request} request 请求结构体
     * @param {Context} [ctx] 运行上下文
     * @returns {(Response|Promise<Response>)} 返回结构体数据
     * @memberof Module
     */
    abstract exec(request: Request, ctx?: Context): Response | Promise<Response>;
    /** 销毁 */
    dispose(): void;
}
