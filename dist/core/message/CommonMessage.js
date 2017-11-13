"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-01
 * @modify date 2017-09-01
 *
 * 框架内核通用消息
*/
class CommonMessage extends Message_1.default {
    /**
     * Creates an instance of Message.
     * @param {string} type 消息类型
     * @param {...any[]} params 可能的消息参数列表
     * @memberof Message
     */
    constructor(type, ...params) {
        super(type);
        this.params = params;
    }
}
exports.default = CommonMessage;
//# sourceMappingURL=CommonMessage.js.map