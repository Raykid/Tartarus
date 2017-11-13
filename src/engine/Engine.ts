import Application = require("koa");
import { Context } from "koa";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 * 
 * Tartarus的引擎类
*/
export default class Engine
{
    private _app:Application;

    public initialize(params:EngineInitParams):void
    {
        this._app = new Application();
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
    entity: EntityType | EntityType[];
}

export const engine:Engine = new Engine();