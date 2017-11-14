"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Injector_1 = require("../../core/injector/Injector");
const ConstructUtil_1 = require("../../utils/ConstructUtil");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * Engine的装饰器定义
*/
/** 定义数据模型，支持实例注入，并且自身也会被注入 */
function ModelClass(...args) {
    // 转调Injectable方法
    if (this === undefined) {
        var cls = ConstructUtil_1.wrapConstruct(args[0]);
        Injector_1.Injectable.call(this, cls);
        return cls;
    }
    else {
        var result = Injector_1.Injectable.apply(this, args);
        return function (realCls) {
            realCls = ConstructUtil_1.wrapConstruct(realCls);
            result.call(this, realCls);
            return realCls;
        };
    }
}
exports.ModelClass = ModelClass;
/** 定义模块，支持实例注入 */
function ModuleClass(cls) {
    // 判断一下Module是否有dispose方法，没有的话弹一个警告
    if (!cls.prototype.dispose)
        console.warn("Module[" + cls["name"] + "]不具有dispose方法，可能会造成内存问题，请让该Module实现IDisposable接口");
    // 包装类
    var wrapperCls = ConstructUtil_1.wrapConstruct(cls);
    // 返回包装类
    return wrapperCls;
}
exports.ModuleClass = ModuleClass;
//# sourceMappingURL=Injector.js.map