/// <reference types="koa" />
import { Context } from "koa";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * 业务模块接口
*/
export default interface IModule {
    /**
     * 运行模块，该方法可以使用async修饰
     *
     * @param {Context} ctx 运行上下文
     * @returns {(void|Promise<void>)} 如果用async修饰则要返回Promise<void>，否则返回void
     * @memberof IModule
     */
    exec(ctx:Context):void|Promise<void>;
}
