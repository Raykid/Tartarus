"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Injector_1 = require("../../core/injector/Injector");
const Core_1 = require("../../core/Core");
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
     * @param {string} path 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    getModule(path) {
        // 给路径加上./
        if (path.charAt(0) != ".")
            path = "./" + path;
        // 通过requre获取
        var result = require(path).default;
        return result;
    }
    /**
     * 删除业务逻辑缓存
     *
     * @param {string} path 业务模块对应路由路径
     * @returns {IModule} 业务模块引用
     * @memberof ModuleManager
     */
    deleteModule(path) {
        // 给路径加上./
        if (path.charAt(0) != ".")
            path = "./" + path;
        // 清除缓存
        var Module = require("module");
        var pathName = Module["_resolveFilename"](path, module);
        var cache = Module["_cache"][pathName];
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
    refreshModule(path) {
        // 删除业务模块缓存
        this.deleteModule(path);
        // 重新获取业务模块
        return this.getModule(path);
    }
};
ModuleManager = __decorate([
    Injector_1.Injectable
], ModuleManager);
exports.default = ModuleManager;
/** 再额外导出一个单例 */
exports.moduleManager = Core_1.core.getInject(ModuleManager);
//# sourceMappingURL=ModuleManager.js.map