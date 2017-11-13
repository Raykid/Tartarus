"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectUtil_1 = require("../utils/ObjectUtil");
const Dictionary_1 = require("../utils/Dictionary");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-13
 * @modify date 2017-09-13
 *
 * 装饰器工具集
*/
var instanceDict = new Dictionary_1.default();
function handleInstance(instance) {
    var cls = instance.constructor;
    cls = cls["__ori_constructor__"] || cls;
    var funcs = instanceDict.get(cls);
    if (funcs)
        for (var func of funcs)
            func(instance);
}
/**
 * 包装一个类型，监听类型的实例化操作
 *
 * @export
 * @param {IConstructor} cls 要监听构造的类型构造器
 * @returns {IConstructor} 新的构造函数
 */
function wrapConstruct(cls) {
    // 创建一个新的构造函数
    var func;
    eval('func = function ' + cls["name"] + '(){onConstruct.call(this, arguments)}');
    // 动态设置继承
    ObjectUtil_1.extendsClass(func, cls);
    // 为新的构造函数打一个标签，用以记录原始的构造函数
    func["__ori_constructor__"] = cls;
    // 为原始构造函数也打一个标签，用以记录新构造函数
    cls["__wrap_constructor__"] = func;
    // 返回新的构造函数
    return func;
    function onConstruct(args) {
        // 恢复__proto__
        this["__proto__"] = cls.prototype;
        // 调用父类构造函数构造实例
        cls.apply(this, args);
        // 调用回调
        handleInstance(this);
    }
}
exports.wrapConstruct = wrapConstruct;
/**
 * 如果传入的类有包装类，则返回包装类，否则返回其本身
 *
 * @export
 * @param {IConstructor} cls 要获取包装类的类构造函数
 * @returns {IConstructor}
 */
function getConstructor(cls) {
    return (cls["__wrap_constructor__"] || cls);
}
exports.getConstructor = getConstructor;
/**
 * 监听类型的实例化
 *
 * @export
 * @param {IConstructor} cls 要监听实例化的类
 * @param {(instance?:any)=>void} handler 处理函数
 */
function listenConstruct(cls, handler) {
    cls = cls["__ori_constructor__"] || cls;
    var list = instanceDict.get(cls);
    if (!list)
        instanceDict.set(cls, list = []);
    if (list.indexOf(handler) < 0)
        list.push(handler);
}
exports.listenConstruct = listenConstruct;
/**
 * 移除实例化监听
 *
 * @export
 * @param {IConstructor} cls 要移除监听实例化的类
 * @param {(instance?:any)=>void} handler 处理函数
 */
function unlistenConstruct(cls, handler) {
    cls = cls["__ori_constructor__"] || cls;
    var list = instanceDict.get(cls);
    if (list) {
        var index = list.indexOf(handler);
        if (index >= 0)
            list.splice(index, 1);
    }
}
exports.unlistenConstruct = unlistenConstruct;
/**
 * 监听类型销毁（如果能够销毁的话，需要类型具有dispose方法），该监听不需要移除
 *
 * @export
 * @param {IConstructor} cls 要监听销毁的类
 * @param {(instance?:any)=>void} handler 处理函数
 */
function listenDispose(cls, handler) {
    var dispose = cls.prototype.dispose;
    // 判断类型是否具有dispose方法
    if (dispose) {
        // 替换dispose方法
        cls.prototype.dispose = function () {
            // 调用回调
            handler(this);
            // 调用原始dispose方法执行销毁
            return dispose.apply(this, arguments);
        };
    }
}
exports.listenDispose = listenDispose;
//# sourceMappingURL=ConstructUtil.js.map