"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-11
 * @modify date 2017-09-11
 *
 * 对象工具集
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * populate properties
 * @param target        目标obj
 * @param sources       来源obj
 */
function extendObject(target, ...sources) {
    sources.forEach(function (source) {
        if (!source)
            return;
        for (let propName in source) {
            if (source.hasOwnProperty(propName)) {
                target[propName] = source[propName];
            }
        }
    });
    return target;
}
exports.extendObject = extendObject;
/**
 * 复制对象
 * @param target 要复制的对象
 * @param deep 是否深表复制，默认浅表复制
 * @returns {any} 复制后的对象
 */
function cloneObject(target, deep = false) {
    if (target == null)
        return null;
    var newObject = {};
    for (var key in target) {
        var value = target[key];
        if (deep && typeof value == "object") {
            // 如果是深表复制，则需要递归复制子对象
            value = cloneObject(value, true);
        }
        newObject[key] = value;
    }
    return newObject;
}
exports.cloneObject = cloneObject;
/**
 * 生成一个随机ID
 */
function getGUID() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
}
exports.getGUID = getGUID;
var _getAutoIncIdMap = {};
/**
 * 生成自增id（从0开始）
 * @param type
 */
function getAutoIncId(type) {
    var index = _getAutoIncIdMap[type] || 0;
    _getAutoIncIdMap[type] = index++;
    return type + "-" + index;
}
exports.getAutoIncId = getAutoIncId;
/**
 * 判断对象是否为null或者空对象
 * @param obj 要判断的对象
 * @returns {boolean} 是否为null或者空对象
 */
function isEmpty(obj) {
    var result = true;
    for (var key in obj) {
        result = false;
        break;
    }
    return result;
}
exports.isEmpty = isEmpty;
/**
 * 移除data中包含的空引用或未定义
 * @param data 要被移除空引用或未定义的对象
 */
function trimData(data) {
    for (var key in data) {
        if (data[key] == null) {
            delete data[key];
        }
    }
    return data;
}
exports.trimData = trimData;
var hash = 0;
var hashTypes = ["object", "function"];
/**
 * 获取一个对象的对象哈希字符串
 *
 * @export
 * @param {*} target 任意对象，可以是基础类型或null
 * @returns {string} 哈希值
 */
function getObjectHash(target) {
    if (target == null)
        return "__object_hash_0__";
    var key = "__object_hash__";
    var value;
    // 只有当前对象上有key才算
    if (target.hasOwnProperty(key))
        value = target[key];
    // 如果已经有哈希值则直接返回
    if (value)
        return value;
    // 如果是基础类型则直接返回对应字符串
    var type = typeof target;
    if (hashTypes.indexOf(type) < 0)
        return type + ":" + target;
    // 如果是复杂类型则返回计算的哈希值并打上标签
    var value = "__object_hash_" + (++hash) + "__";
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        writable: false,
        value: value
    });
    return value;
}
exports.getObjectHash = getObjectHash;
/**
 * 获取多个对象的哈希字符串，会对每个对象调用getObjectHash生成单个哈希值，并用|连接
 *
 * @export
 * @param {...any[]} targets 希望获取哈希值的对象列表
 * @returns {string} 多个对象共同作用下的哈希值
 */
function getObjectHashs(...targets) {
    var values = targets.map(target => getObjectHash(target));
    return values.join("|");
}
exports.getObjectHashs = getObjectHashs;
//# sourceMappingURL=ObjectUtil.js.map