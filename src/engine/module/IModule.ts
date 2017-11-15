import { Context } from "koa";
import IDisposable from "../../core/interfaces/IDisposable";
import Request from "../net/server/Request";
import Response from "../net/server/Response";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 * 
 * 业务模块接口
*/
export default interface IModule extends IDisposable
{
    /**
     * 运行模块
     * 
     * @param {Request} request 请求结构体
     * @param {Context} [ctx] 运行上下文
     * @returns {(Response|Promise<Response>)} 返回结构体数据
     * @memberof IModule
     */
    exec(request:Request, ctx?:Context):Response|Promise<Response>;
}