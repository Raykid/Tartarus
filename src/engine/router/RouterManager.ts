import Router = require("koa-router");
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
    private _router:Router;
    /**
     * 获取路由对象
     * 
     * @readonly
     * @type {Router}
     * @memberof Engine
     */
    public get router():Router
    {
        return this._router;
    }

    public initialize():void
    {
        // 生成预逻辑路由
        this._router = new Router();
        engine.app.use(this._router.routes());
        engine.app.use(this._router.allowedMethods());
        // 注入路由实例
        core.mapInjectValue(this._router);
    }
    
    /**
     * 注册全局Router
     * 
     * @param {IRouter} router 要注册的全局Router
     * @memberof RouterManager
     */
    public registerRouter(router:IRouter):void
    {
        this._router.all(router.path, router.exec.bind(router));
    }
}
/** 再额外导出一个单例 */
export const routerManager:RouterManager = core.getInject(RouterManager);