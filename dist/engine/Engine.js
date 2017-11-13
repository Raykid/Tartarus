"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application = require("koa");
const Injector_1 = require("../core/injector/Injector");
const Core_1 = require("../core/Core");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * Tartarus的引擎类
*/
let Engine = class Engine {
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
};
Engine = __decorate([
    Injector_1.Injectable
], Engine);
exports.default = Engine;
/** 再额外导出一个单例 */
exports.engine = Core_1.core.getInject(Engine);
//# sourceMappingURL=Engine.js.map