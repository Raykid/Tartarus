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
    initialize(params: EngineInitParams): void;
    private onGetRequest(ctx);
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
     * 静态资源根目录地址
     *
     * @type {string}
     * @memberof EngineInitParams
     */
    rootDir: string;
}
/** 再额外导出一个单例 */
export declare const engine: Engine;
