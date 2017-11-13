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
     * @param {string} route 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    deleteModule(route: string): IModule;
    /**
     * 清除业务模块缓存，使之重新加载最新的业务逻辑
     *
     * @param {string} route 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    refreshModule(route: string): IModule;
}
/** 再额外导出一个单例 */
export declare const moduleManager: ModuleManager;
