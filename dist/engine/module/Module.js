"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = require("../../core/Core");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * 为模块提供默认实现
*/
class Module {
    constructor() {
        this._disposed = false;
    }
    /**
     * 是否已经被销毁
     *
     * @readonly
     * @type {boolean}
     * @memberof Module
     */
    get disposed() {
        return this._disposed;
    }
    dispatch(typeOrMsg, ...params) {
        Core_1.core.dispatch(typeOrMsg, ...params);
    }
    /** 销毁 */
    dispose() {
        if (this._disposed)
            return;
        this._disposed = true;
    }
}
exports.default = Module;
//# sourceMappingURL=Module.js.map