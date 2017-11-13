"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * 处理一些系统级别的工具集
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 配合await使用，可以将当前进程延迟一段时间再继续执行
 *
 * @export
 * @param {number} duration 要延迟的毫秒值
 * @returns {Promise<void>}
 */
async function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
exports.sleep = sleep;
//# sourceMappingURL=SystemUtil.js.map