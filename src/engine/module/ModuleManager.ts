import path = require("path");
import { Injectable } from "../../core/injector/Injector";
import { core } from "../../core/Core";
import IModule from "./IModule";
import { environment } from "../env/Environment";

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
     * @param {string} route 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    public getModule(route:string):IModule
    {
        // 将路径连接到rootDir上
        route = path.resolve(environment.rootDir, "./" + route);
        // 求出路径到当前模块的相对路径
        route = path.relative(__dirname, route);
        // 规整路径
        route = route.replace(/\\/g, "/");
        // 如果前面没有.则加上./
        if(route.charAt(0) != ".") route = "./" + route;
        // 通过requre获取
        var result:IModule;
        try
        {
            var cls:IConstructor = require(route).default;
            if(cls) result = new cls();
        }
        catch(err){}
        return result;
    }

    /**
     * 删除业务逻辑缓存
     * 
     * @param {string} route 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    public deleteModule(route:string):IModule
    {
        // 给路径加上./
        if(route.charAt(0) != ".") route = "./" + route;
        // 清除缓存
        var Module = require("module");
        var routeName:string = Module["_resolveFilename"](route, module);
        var cache:IModule = Module["_cache"][routeName];
        delete Module["_cache"][routeName];
        return cache;
    }

    /**
     * 清除业务模块缓存，使之重新加载最新的业务逻辑
     * 
     * @param {string} route 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    public refreshModule(route:string):IModule
    {
        // 删除业务模块缓存
        this.deleteModule(route);
        // 重新获取业务模块
        return this.getModule(route);
    }
}
/** 再额外导出一个单例 */
export const moduleManager:ModuleManager = core.getInject(ModuleManager);