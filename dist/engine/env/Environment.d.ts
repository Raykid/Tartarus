/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * 记录各种环境参数
*/
export default class Environment {
    private _baseDir;
    /**
     * 获取启动模块所在路径
     *
     * @readonly
     * @type {string}
     * @memberof Engine
     */
    readonly baseDir: string;
    private _dynamicDir;
    /**
     * 获取动态逻辑代码根路径
     *
     * @readonly
     * @type {string}
     * @memberof Environment
     */
    readonly dynamicDir: string;
    private _staticDir;
    /**
     * 获取静态资源根路径
     *
     * @readonly
     * @type {string}
     * @memberof Engine
     */
    readonly staticDir: string;
    initialize(dynamicDir?: string, staticDir?: string): void;
}
/** 再额外导出一个单例 */
export declare const environment: Environment;
