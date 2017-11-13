"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConstructUtil_1 = require("../../utils/ConstructUtil");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * Engine的装饰器定义
*/
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