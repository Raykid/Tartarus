import IModule from "./IModule";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * 模块管理器
*/
export default class ModuleManager {
    private _moduleDict;
    /**
     * 将相对于dynamicDir的相对路径转换成可用的路由地址
     *
     * @param {string} route
     * @returns {string}
     * @memberof ModuleManager
     */
    private getRoute(route);
    /**
     * 获取业务模块引用
     *
     * @param {string} route 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    getModule(route: string): IModule;
    /**
     * 删除业务逻辑缓存
     *
     * @param {string} [route] 业务模块对应路由路径，不传则代表全部删除
     * @memberof ModuleManager
     */
    deleteModule(route?: string): void;
    /**
     * 清除业务模块缓存，使之重新加载最新的业务逻辑
     *
     * @param {string} [route] 业务模块对应路由路径，不传则代表全部刷新
     * @memberof ModuleManager
     */
    refreshModule(route?: string): void;
}
/** 再额外导出一个单例 */
export declare const moduleManager: ModuleManager;
