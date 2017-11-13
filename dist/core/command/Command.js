"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = require("../Core");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-01
 * @modify date 2017-09-01
 *
 * 内核命令类，内核命令在注册了消息后可以在消息派发时被执行
*/
class Command {
    constructor(msg) {
        this.msg = msg;
    }
    dispatch(typeOrMsg, ...params) {
        Core_1.core.dispatch(typeOrMsg, ...params);
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map