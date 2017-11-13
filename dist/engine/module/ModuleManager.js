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
     * 获取业务模块引用
     *
     * @param {string} route 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    getModule(route) {
        // 将路径连接到rootDir上
        route = path.resolve(Environment_1.environment.rootDir, "./" + route);
        // 求出路径到当前模块的相对路径
        route = path.relative(__dirname, route);
        // 规整路径
        route = route.replace(/\\/g, "/");
        // 如果前面没有.则加上./
        if (route.charAt(0) != ".")
            route = "./" + route;
        // 通过requre获取
        var result;
        try {
            var cls = require(route).default;
            if (cls)
                result = new cls();
        }
        catch (err) { }
        return result;
    }
    /**
     * 删除业务逻辑缓存
     *
     * @param {string} route 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    deleteModule(route) {
        // 给路径加上./
        if (route.charAt(0) != ".")
            route = "./" + route;
        // 清除缓存
        var Module = require("module");
        var routeName = Module["_resolveFilename"](route, module);
        var cache = Module["_cache"][routeName];
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
    refreshModule(route) {
        // 删除业务模块缓存
        this.deleteModule(route);
        // 重新获取业务模块
        return this.getModule(route);
    }
};
ModuleManager = __decorate([
    Injector_1.Injectable
], ModuleManager);
exports.default = ModuleManager;
/** 再额外导出一个单例 */
exports.moduleManager = Core_1.core.getInject(ModuleManager);
//# sourceMappingURL=ModuleManager.js.map