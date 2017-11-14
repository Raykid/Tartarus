import { Injectable } from "../../core/injector/Injector";
import { core } from "../../core/Core";
import IRouter from "./IRouter";
import { engine } from "../Engine";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 * 
 * Router管理器
*/
@Injectable
export default class RouterManager
{
    /**
     * 注册全局Router
     * 
     * @param {IRouter} router 要注册的全局Router
     * @memberof RouterManager
     */
    public registerRouter(router:IRouter):void
    {
        engine.router.all(router.path, router.exec.bind(router));
    }
}
/** 再额外导出一个单例 */
export const routerManager:RouterManager = core.getInject(RouterManager);