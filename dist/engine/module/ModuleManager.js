"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Injector_1 = require("../../core/injector/Injector");
const Core_1 = require("../../core/Core");
const Environment_1 = require("../env/Environment");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * 模块管理器
*/
let ModuleManager = class ModuleManager {
    /**
     * @author Raykid
     * @email initial_r@qq.com
     * @create date 2017-11-13
     * @modify date 2017-11-13
     *
     * 模块管理器
    */
    constructor() {
        this._moduleDict = {};
    }
    /**
     * 将相对于dynamicDir的相对路径转换成可用的路由地址
     *
     * @param {string} route
     * @returns {string}
     * @memberof ModuleManager
     */
    getRoute(route) {
        // 将路径连接到dynamicDir上
        route = path.resolve(Environment_1.environment.dynamicDir, "./" + route);
        // 求出路径到当前模块的相对路径
        route = path.relative(__dirname, route);
        // 规整路径
        route = route.replace(/\\/g, "/");
        // 如果前面没有.则加上./
        if (route.charAt(0) != ".")
            route = "./" + route;
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
    getModule(route) {
        // 转换路由地址
        route = this.getRoute(route);
        // 通过requre获取
        var result = this._moduleDict[route];
        if (!result) {
            // TODO Raykid 这里要做校验，否则会造成代码注入风险
            try {
                var cls = require(route).default;
                if (cls)
                    this._moduleDict[route] = result = new cls();
            }
            catch (err) {
                console.error(err.message);
            }
        }
        return result;
    }
    /**
     * 删除业务逻辑缓存
     *
     * @param {string} [route] 业务模块对应路由路径，不传则代表全部删除
     * @memberof ModuleManager
     */
    deleteModule(route) {
        var routes = [];
        if (route) {
            routes.push(route);
        }
        else {
            // 全部缓存模块都推入其中
            for (var key in this._moduleDict) {
                routes.push(key);
            }
        }
        // 开始清除缓存
        for (var route of routes) {
            // 转换路由地址
            route = this.getRoute(route);
            if (this._moduleDict[route]) {
                // 删除本地缓存
                delete this._moduleDict[route];
                // 清除reqiure缓存
                var Module = require("module");
                var routeName = Module["_resolveFilename"](route, module);
                delete Module["_cache"][routeName];
            }
        }
    }
    /**
     * 清除业务模块缓存，使之重新加载最新的业务逻辑
     *
     * @param {string} [route] 业务模块对应路由路径，不传则代表全部刷新
     * @memberof ModuleManager
     */
    refreshModule(route) {
        var routes = [];
        if (route) {
            routes.push(route);
        }
        else {
            // 全部缓存模块都推入其中
            for (var key in this._moduleDict) {
                routes.push(key);
            }
        }
        // 开始刷新缓存
        for (var route of routes) {
            // 删除业务模块缓存
            this.deleteModule(route);
            // 重新获取业务模块
            this.getModule(route);
        }
    }
};
ModuleManager = __decorate([
    Injector_1.Injectable
], ModuleManager);
exports.default = ModuleManager;
/** 再额外导出一个单例 */
exports.moduleManager = Core_1.core.getInject(ModuleManager);
//# sourceMappingURL=ModuleManager.js.map