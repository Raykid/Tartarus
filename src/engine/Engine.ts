import Application = require("koa");
import { Context } from "koa";
import path = require("path");
import { Injectable } from "../core/injector/Injector";
import { core } from "../core/Core";
import { moduleManager } from "./module/ModuleManager";
import IModule from "./module/IModule";
import { environment } from "./env/Environment";

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

    public initialize(params:EngineInitParams):void
    {
        this._app = new Application();
        // 初始化environment
        environment.initialize(params.rootDir);
        // 添加分流逻辑
        this._app.use(this.onGetRequest.bind(this));
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

    private async onGetRequest(ctx:Context):Promise<void>
    {
        var extname:string = path.extname(ctx.path);
        if(extname == "")
        {
            // 没有扩展名，尝试去寻找逻辑代码
            var target:IModule = moduleManager.getModule(ctx.path);
            if(target)
            {
                // 使用await执行，便于处理异步操作
                await target.exec(ctx);
                return;
            }
        }
        // TODO Raykid 作为静态资源处理
        ctx.body = "Fuck you!!!";
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
     * 静态资源根目录地址
     * 
     * @type {string}
     * @memberof EngineInitParams
     */
    rootDir:string;
}

/** 再额外导出一个单例 */
export const engine:Engine = core.getInject(Engine);