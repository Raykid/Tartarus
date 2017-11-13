"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application = require("koa");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * Tartarus的引擎类
*/
class Engine {
    initialize(params) {
        this._app = new Application();
        // 添加分流逻辑
        this._app.use(this.onGetRequest.bind(this));
        // 遍历koa初始化参数数组
        var entitys = params.entity;
        if (!(entitys instanceof Array))
            entitys = [entitys];
        for (var entity of entitys) {
            if (typeof entity == "number")
                // 单一端口号方式
                this._app.listen(entity);
            else
                // 多参数方式
                this._app.listen(entity.port || 12345, entity.hostname, entity.backlog);
        }
    }
    async onGetRequest(ctx) {
        ctx.body = "Fuck you!!!";
    }
}
exports.default = Engine;
exports.engine = new Engine();
//# sourceMappingURL=Engine.js.map