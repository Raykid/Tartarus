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
const Engine_1 = require("../Engine");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * Router管理器
*/
let RouterManager = class RouterManager {
    /**
     * 注册全局Router
     *
     * @param {IRouter} router 要注册的全局Router
     * @memberof RouterManager
     */
    registerRouter(router) {
        Engine_1.engine.router.all(router.path, router.exec.bind(router));
    }
};
RouterManager = __decorate([
    Injector_1.Injectable
], RouterManager);
exports.default = RouterManager;
/** 再额外导出一个单例 */
exports.routerManager = Core_1.core.getInject(RouterManager);
//# sourceMappingURL=RouterManager.js.map