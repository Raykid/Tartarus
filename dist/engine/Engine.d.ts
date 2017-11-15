/// <reference types="koa" />
import Application = require("koa");
import IRouter from "./router/IRouter";
import { IRequestConstructor } from "./net/server/Request";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * Tartarus的引擎类
*/
export default class Engine {
    private _app;
    /**
     * 获取koa的app实例
     *
     * @readonly
     * @type {Application}
     * @memberof Engine
     */
    readonly app: Application;
    initialize(params: EngineInitParams): void;
}
export interface EntityParams {
    /**
     * 要监听的端口号，默认为12345
     *
     * @type {number}
     * @memberof EngineInitParams
     */
    port?: number;
    /**
     * 要监听的hostname
     *
     * @type {string}
     * @memberof EngineInitParams
     */
    hostname?: string;
    /**
     *
     *
     * @type {number}
     * @memberof EngineInitParams
     */
    backlog?: number;
}
export declare type EntityType = number | EntityParams;
export interface EngineInitParams {
    /**
     * 初始化参数实体，可以是一个端口号，也可以是端口号列表，或者详细数据或详细数据列表
     *
     * @type {(EntityType | EntityType[])}
     * @memberof EngineInitParams
     */
    entity: EntityType | EntityType[];
    /**
     * 静态资源根目录地址，没有则表示不具有静态资源服务器功能
     *
     * @type {string}
     * @memberof EngineInitParams
     */
    staticDir?: string;
    /**
     * 动态逻辑代码根目录地址，没有则表示不具有动态逻辑服务器功能
     *
     * @type {string}
     * @memberof EngineInitParams
     */
    dynamicDir?: string;
    /**
     * 需要注册到系统中的全局Router数组，全局Router会在Module之前执行
     *
     * @type {IRouter[]}
     * @memberof EngineInitParams
     */
    routers?: IRouter[];
    /**
     * 需要注册的请求结构体类型数组
     *
     * @type {IRequestConstructor[]}
     * @memberof EngineInitParams
     */
    requests?: IRequestConstructor[];
}
/** 再额外导出一个单例 */
export declare const engine: Engine;
