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
    entity: EntityType | EntityType[];
}
export declare const engine: Engine;
