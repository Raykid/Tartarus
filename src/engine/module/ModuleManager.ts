import { Injectable } from "../../core/injector/Injector";
import { core } from "../../core/Core";
import IModule from "./IModule";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 * 
 * 模块管理器
*/
@Injectable
export default class ModuleManager
{
    /**
     * 获取业务模块引用
     * 
     * @param {string} path 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    public getModule(path:string):IModule
    {
        // 给路径加上./
        if(path.charAt(0) != ".") path = "./" + path;
        // 通过requre获取
        var result:IModule = require(path).default;
        return result;
    }

    /**
     * 删除业务逻辑缓存
     * 
     * @param {string} path 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    public deleteModule(path:string):IModule
    {
        // 给路径加上./
        if(path.charAt(0) != ".") path = "./" + path;
        // 清除缓存
        var Module = require("module");
        var pathName:string = Module["_resolveFilename"](path, module);
        var cache:IModule = Module["_cache"][pathName];
        delete Module["_cache"][pathName];
        return cache;
    }

    /**
     * 清除业务模块缓存，使之重新加载最新的业务逻辑
     * 
     * @param {string} path 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    public refreshModule(path:string):IModule
    {
        // 删除业务模块缓存
        this.deleteModule(path);
        // 重新获取业务模块
        return this.getModule(path);
    }
}
/** 再额外导出一个单例 */
export const moduleManager:ModuleManager = core.getInject(ModuleManager);