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
    private _rootDir;
    /**
     * 获取启动模块所在路径
     *
     * @readonly
     * @type {string}
     * @memberof Engine
     */
    readonly baseDir: string;
    /**
     * 获取静态资源根路径
     *
     * @readonly
     * @type {string}
     * @memberof Engine
     */
    readonly rootDir: string;
    initialize(rootDir?: string): void;
}
/** 再额外导出一个单例 */
export declare const environment: Environment;
