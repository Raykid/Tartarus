import path = require("path");
import { Injectable } from "../../core/injector/Injector";
import { core } from "../../core/Core";
import IModule from "./IModule";
import { environment } from "../env/Environment";
import IModuleConstructor from "./IModuleConstructor";

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
    private _moduleDict:{[route:string]:IModule} = {};

    /**
     * 将相对于dynamicDir的相对路径转换成可用的路由地址
     * 
     * @param {string} route 
     * @returns {string} 
     * @memberof ModuleManager
     */
    private getRoute(route:string):string
    {
        // 将路径连接到dynamicDir上
        route = path.resolve(environment.dynamicDir, "./" + route);
        // 求出路径到当前模块的相对路径
        route = path.relative(__dirname, route);
        // 规整路径
        route = route.replace(/\\/g, "/");
        // 如果前面没有.则加上./
        if(route.charAt(0) != ".") route = "./" + route;
        // 返回路由地址
        return route;
    }

    /**
     * 获取业务模块引用
     * 
     * @param {string} route 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    public getModule(route:string):IModule
    {
        // 转换路由地址
        route = this.getRoute(route);
        // 通过requre获取
        var result:IModule = this._moduleDict[route];
        if(!result)
        {
            // TODO Raykid 这里要做校验，否则会造成代码注入风险
            try
            {
                var cls:IModuleConstructor = require(route).default;
                if(cls) this._moduleDict[route] = result = new cls();
            }
            catch(err){
                console.error(err.message);
            }
        }
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
        // 转换路由地址
        route = this.getRoute(route);
        // 清除reqiure缓存
        var Module = require("module");
        var routeName:string = Module["_resolveFilename"](route, module);
        var cache:IModule = Module["_cache"][routeName];
        delete Module["_cache"][routeName];
        // 删除本地缓存
        delete this._moduleDict[route];
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