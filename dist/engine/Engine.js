"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const staticServer = require("koa-static");
const Injector_1 = require("../core/injector/Injector");
const Core_1 = require("../core/Core");
const Environment_1 = require("./env/Environment");
const DynamicMiddleware_1 = require("./middleware/DynamicMiddleware");
const RouterManager_1 = require("./router/RouterManager");
const EngineRouters_1 = require("./router/EngineRouters");
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
    /**
     * 获取路由对象
     *
     * @readonly
     * @type {Router}
     * @memberof Engine
     */
    get router() {
        return this._router;
    }
    initialize(params) {
        // 生成并注入app实例
        this._app = new Application();
        Core_1.core.mapInjectValue(this._app);
        // 初始化environment
        Environment_1.environment.initialize(params.dynamicDir, params.staticDir);
        // 日志
        this._app.use(logger());
        // body转换器
        this._app.use(bodyParser());
        // 生成并注入预逻辑路由
        this._router = new Router();
        Core_1.core.mapInjectValue(this._router);
        this._app.use(this._router.routes());
        this._app.use(this._router.allowedMethods());
        // 注册全局路由命令
        RouterManager_1.routerManager.registerRouter(new EngineRouters_1.DeleteModuleRouter());
        RouterManager_1.routerManager.registerRouter(new EngineRouters_1.RefreshModuleRouter());
        // 动态逻辑路由
        if (params.dynamicDir) {
            this._app.use(DynamicMiddleware_1.default);
        }
        // 托管静态资源
        if (params.staticDir) {
            this._app.use(staticServer(Environment_1.environment.staticDir));
        }
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
};
Engine = __decorate([
    Injector_1.Injectable
], Engine);
exports.default = Engine;
/** 再额外导出一个单例 */
exports.engine = Core_1.core.getInject(Engine);
//# sourceMappingURL=Engine.js.map