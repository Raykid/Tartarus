import Router = require("koa-router");
import IRouter from "./IRouter";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * Router管理器
*/
export default class RouterManager {
    private _router;
    /**
     * 获取路由对象
     *
     * @readonly
     * @type {Router}
     * @memberof Engine
     */
    readonly router: Router;
    initialize(): void;
    /**
     * 注册全局Router
     *
     * @param {IRouter} router 要注册的全局Router
     * @memberof RouterManager
     */
    registerRouter(router: IRouter): void;
}
/** 再额外导出一个单例 */
export declare const routerManager: RouterManager;
