import Application = require("koa");
import logger = require("koa-logger");
import bodyParser = require("koa-bodyparser");
import Router = require("koa-router");
import staticServer = require("koa-static");
import { Context } from "koa";
import path = require("path");
import { Injectable } from "../core/injector/Injector";
import { core } from "../core/Core";
import { moduleManager } from "./module/ModuleManager";
import IModule from "./module/IModule";
import { environment } from "./env/Environment";
import dynamicMiddleware from "./middleware/DynamicMiddleware";
import { routerManager } from "./router/RouterManager";
import { DeleteModuleRouter, RefreshModuleRouter } from "./router/EngineRouters";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 * 
 * Tartarus的引擎类
*/
@Injectable
export default class Engine
{
    private _app:Application;
    /**
     * 获取koa的app实例
     * 
     * @readonly
     * @type {Application}
     * @memberof Engine
     */
    public get app():Application
    {
        return this._app;
    }

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

    public initialize(params:EngineInitParams):void
    {
        // 生成并注入app实例
        this._app = new Application();
        core.mapInjectValue(this._app);
        // 初始化environment
        environment.initialize(params.dynamicDir, params.staticDir);
        // 日志
        this._app.use(logger());
        // body转换器
        this._app.use(bodyParser());
        // 生成并注入预逻辑路由
        this._router = new Router();
        core.mapInjectValue(this._router);
        this._app.use(this._router.routes());
        this._app.use(this._router.allowedMethods());
        // 注册全局路由命令
        routerManager.registerRouter(new DeleteModuleRouter());
        routerManager.registerRouter(new RefreshModuleRouter());
        // 动态逻辑路由
        if(params.dynamicDir)
        {
            this._app.use(dynamicMiddleware);
        }
        // 托管静态资源
        if(params.staticDir)
        {
            this._app.use(staticServer(environment.staticDir));
        }
        // 遍历koa初始化参数数组
        var entitys:EntityType | EntityType[] = params.entity;
        if(!(entitys instanceof Array)) entitys = [entitys];
        for(var entity of entitys)
        {
            if(typeof entity == "number")
                // 单一端口号方式
                this._app.listen(entity);
            else
                // 多参数方式
                this._app.listen(entity.port || 12345, entity.hostname, entity.backlog);
        }
    }
}

export interface EntityParams
{
    /**
     * 要监听的端口号，默认为12345
     * 
     * @type {number}
     * @memberof EngineInitParams
     */
    port?:number;
    /**
     * 要监听的hostname
     * 
     * @type {string}
     * @memberof EngineInitParams
     */
    hostname?:string;
    /**
     * 
     * 
     * @type {number}
     * @memberof EngineInitParams
     */
    backlog?:number;
}

export type EntityType = number | EntityParams;

export interface EngineInitParams
{
    /**
     * 初始化参数实体，可以是一个端口号，也可以是端口号列表，或者详细数据或详细数据列表
     * 
     * @type {(EntityType | EntityType[])}
     * @memberof EngineInitParams
     */
    entity:EntityType | EntityType[];
    /**
     * 静态资源根目录地址，没有则表示不具有静态资源服务器功能
     * 
     * @type {string}
     * @memberof EngineInitParams
     */
    staticDir?:string;
    /**
     * 动态逻辑代码根目录地址，没有则表示不具有动态逻辑服务器功能
     * 
     * @type {string}
     * @memberof EngineInitParams
     */
    dynamicDir?:string;
}

/** 再额外导出一个单例 */
export const engine:Engine = core.getInject(Engine);