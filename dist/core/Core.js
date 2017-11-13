"use strict";
/// <reference path="./global/Patch.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const Dictionary_1 = require("../utils/Dictionary");
const Observable_1 = require("./observable/Observable");
// 加载Reflect库
require("../libs/Reflect");
/**
 * 核心上下文对象，负责内核消息消息转发、对象注入等核心功能的实现
 *
 * @export
 * @class Core
 */
class Core {
    constructor() {
        /*********************** 下面是内核消息系统 ***********************/
        this._observable = new Observable_1.default();
        /*********************** 下面是依赖注入系统 ***********************/
        /**
         * 记录已经注入过的对象单例
         *
         * @private
         * @type {Dictionary<Function, any>}
         * @memberof Core
         */
        this._injectDict = new Dictionary_1.default();
        /**
         * 注入字符串类型字典，记录注入字符串和类型构造函数的映射
         *
         * @private
         * @type {Dictionary<any, IConstructor>}
         * @memberof Core
         */
        this._injectStrDict = new Dictionary_1.default();
        // 进行单例判断
        if (Core._instance)
            throw new Error("已生成过Core实例，不允许多次生成");
        // 赋值单例
        Core._instance = this;
        // 注入自身
        this.mapInjectValue(this);
    }
    /**
     * 将IObservable暴露出来
     *
     * @readonly
     * @type {IObservable}
     * @memberof Core
     */
    get observable() {
        return this._observable;
    }
    /** dispatch方法实现 */
    dispatch(...params) {
        this._observable.dispatch.apply(this._observable, params);
    }
    /**
     * 监听内核消息
     *
     * @param {string} type 消息类型
     * @param {Function} handler 消息处理函数
     * @param {*} [thisArg] 消息this指向
     * @memberof Core
     */
    listen(type, handler, thisArg) {
        this._observable.listen(type, handler, thisArg);
    }
    /**
     * 移除内核消息监听
     *
     * @param {string} type 消息类型
     * @param {Function} handler 消息处理函数
     * @param {*} [thisArg] 消息this指向
     * @memberof Core
     */
    unlisten(type, handler, thisArg) {
        this._observable.unlisten(type, handler, thisArg);
    }
    /**
     * 注册命令到特定消息类型上，当这个类型的消息派发到框架内核时会触发Command运行
     *
     * @param {string} type 要注册的消息类型
     * @param {(ICommandConstructor)} cmd 命令处理器，可以是方法形式，也可以使类形式
     * @memberof Core
     */
    mapCommand(type, cmd) {
        this._observable.mapCommand(type, cmd);
    }
    /**
     * 注销命令
     *
     * @param {string} type 要注销的消息类型
     * @param {(ICommandConstructor)} cmd 命令处理器
     * @returns {void}
     * @memberof Core
     */
    unmapCommand(type, cmd) {
        this._observable.unmapCommand(type, cmd);
    }
    /**
     * 添加一个类型注入，会立即生成一个实例并注入到框架内核中
     *
     * @param {IConstructor} target 要注入的类型（注意不是实例）
     * @param {*} [type] 如果提供该参数，则使用该类型代替注入类型的key，否则使用注入类型自身作为key
     * @memberof Core
     */
    mapInject(target, type) {
        // 如果已经注入过了，则使用已经注入的单例再次注入
        var oriTarget = target["__ori_constructor__"] || target;
        var value = this._injectDict.get(oriTarget) || new target();
        this.mapInjectValue(value, type);
    }
    /**
     * 注入一个对象实例
     *
     * @param {*} value 要注入的对象实例
     * @param {*} [type] 如果提供该参数，则使用该类型代替注入类型的key，否则使用注入实例的构造函数作为key
     * @memberof Core
     */
    mapInjectValue(value, type) {
        // 如果是字符串则记录类型构造函数映射
        if (!(type instanceof Function) || !type.prototype)
            type = this._injectStrDict[type] = value.constructor;
        // 记录已注入的单例
        this._injectDict.set(value.constructor, value);
        // 开始注入
        Reflect.defineMetadata("design:type", value, type || value.constructor);
    }
    /**
     * 移除类型注入
     *
     * @param {*} type 要移除注入的类型
     * @memberof Core
     */
    unmapInject(type) {
        // 如果是字符串则记录类型构造函数映射
        if (!(type instanceof Function) || !type.prototype)
            type = this._injectStrDict[type];
        Reflect.deleteMetadata("design:type", type);
    }
    /**
     * 获取注入的对象实例
     *
     * @param {*} type 注入对象的类型
     * @returns {*} 注入的对象实例
     * @memberof Core
     */
    getInject(type) {
        if (!(type instanceof Function) || !type.prototype)
            type = this._injectStrDict[type];
        if (type) {
            // 需要用原始的构造函数取
            type = type["__ori_constructor__"] || type;
            return Reflect.getMetadata("design:type", type);
        }
    }
}
exports.default = Core;
/** 再额外导出一个单例 */
exports.core = new Core();
//# sourceMappingURL=Core.js.map