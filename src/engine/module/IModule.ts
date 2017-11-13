import { Context } from "koa";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 * 
 * 业务模块接口
*/
export default interface IModule
{
    /**
     * 运行模块
     * 
     * @param {Context} ctx 运行上下文
     * @memberof IModule
     */
    exec(ctx:Context):void;
}