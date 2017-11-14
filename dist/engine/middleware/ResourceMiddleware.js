"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * 加载静态资源的中间件
*/
async function resourceMiddleware(ctx, next) {
    // TODO Raykid 完成逻辑
    ctx.body = ctx.request["body"];
}
exports.default = resourceMiddleware;
//# sourceMappingURL=ResourceMiddleware.js.map