"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-18
 * @modify date 2017-09-18
 *
 * 消息基类
*/
class Message {
    /**
     * 获取消息类型字符串
     *
     * @readonly
     * @type {string}
     * @memberof Message
     */
    get type() {
        return this._type;
    }
    constructor(type) {
        this._type = type;
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map