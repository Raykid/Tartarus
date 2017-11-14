/// <reference types="node" />
import { Context } from "vm";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * 全局命令Router接口
*/
export default interface IRouter {
    /**
     * Router匹配路径，可以是字符串，也可以是正则表达式
     *
     * @type {(string|RegExp)}
     * @memberof IRouter
     */
    readonly path: string | RegExp;
    /**
     * 执行Router
     *
     * @param {Context} ctx
     * @param {()=>Promise<any>} next
     * @memberof IRouter
     */
    exec(ctx: Context, next: () => Promise<any>): void;
}
