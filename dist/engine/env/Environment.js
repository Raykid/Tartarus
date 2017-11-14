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
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * 记录各种环境参数
*/
let Environment = class Environment {
    /**
     * 获取启动模块所在路径
     *
     * @readonly
     * @type {string}
     * @memberof Engine
     */
    get baseDir() {
        return this._baseDir;
    }
    /**
     * 获取动态逻辑代码根路径
     *
     * @readonly
     * @type {string}
     * @memberof Environment
     */
    get dynamicDir() {
        return this._dynamicDir;
    }
    /**
     * 获取静态资源根路径
     *
     * @readonly
     * @type {string}
     * @memberof Engine
     */
    get staticDir() {
        return this._staticDir;
    }
    initialize(dynamicDir, staticDir) {
        // 取到根模块路径，作为baseDir的值
        var temp = module;
        while (temp.parent) {
            temp = temp.parent;
        }
        this._baseDir = path.dirname(temp.filename);
        // 设置根路径，如果是相对路径则根据baseDir转换为绝对路径
        this._dynamicDir = dynamicDir;
        if (this._dynamicDir && !path.isAbsolute(this._dynamicDir)) {
            this._dynamicDir = path.resolve(this._baseDir, this._dynamicDir);
        }
        // 设置根路径，如果是相对路径则根据baseDir转换为绝对路径
        this._staticDir = staticDir;
        if (this._staticDir && !path.isAbsolute(this._staticDir)) {
            this._staticDir = path.resolve(this._baseDir, this._staticDir);
        }
    }
};
Environment = __decorate([
    Injector_1.Injectable
], Environment);
exports.default = Environment;
/** 再额外导出一个单例 */
exports.environment = Core_1.core.getInject(Environment);
//# sourceMappingURL=Environment.js.map