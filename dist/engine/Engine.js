"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application = require("koa");
const path = require("path");
const Injector_1 = require("../core/injector/Injector");
const Core_1 = require("../core/Core");
const ModuleManager_1 = require("./module/ModuleManager");
const Environment_1 = require("./env/Environment");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * Tartarus的引擎类
*/
let Engine = class Engine {
    /**
     * 获取koa的app实例
     *
     * @readonly
     * @type {Application}
     * @memberof Engine
     */
    get app() {
        return this._app;
    }
    initialize(params) {
        this._app = new Application();
        // 初始化environment
        Environment_1.environment.initialize(params.rootDir);
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
        var extname = path.extname(ctx.path);
        if (extname == "") {
            // 没有扩展名，尝试去寻找逻辑代码
            var target = ModuleManager_1.moduleManager.getModule(ctx.path);
            if (target) {
                // 使用await执行，便于处理异步操作
                await target.exec(ctx);
                // 销毁模块
                target.dispose();
                return;
            }
        }
        // TODO Raykid 作为静态资源处理
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