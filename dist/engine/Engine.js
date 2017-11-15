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
const staticServer = require("koa-static");
const Injector_1 = require("../core/injector/Injector");
const Core_1 = require("../core/Core");
const Environment_1 = require("./env/Environment");
const DynamicMiddleware_1 = require("./middleware/DynamicMiddleware");
const RouterManager_1 = require("./router/RouterManager");
const EngineRouters_1 = require("./router/EngineRouters");
const PathUtil_1 = require("../utils/PathUtil");
const NetWrapperMiddleware_1 = require("./middleware/NetWrapperMiddleware");
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
        // 生成并注入app实例
        this._app = new Application();
        Core_1.core.mapInjectValue(this._app);
        // 初始化environment
        Environment_1.environment.initialize(params.dynamicDir, params.staticDir);
        // 日志
        this._app.use(logger());
        // body转换器
        this._app.use(bodyParser());
        // net解析打包器
        this._app.use(NetWrapperMiddleware_1.default(params.requests));
        // 注册全局路由命令
        RouterManager_1.routerManager.initialize();
        RouterManager_1.routerManager.registerRouter(new EngineRouters_1.DeleteModuleRouter());
        RouterManager_1.routerManager.registerRouter(new EngineRouters_1.RefreshModuleRouter());
        // 注册用户路由命令
        for (var key in params.routers) {
            RouterManager_1.routerManager.registerRouter(params.routers[key]);
        }
        // 动态逻辑路由
        if (params.dynamicDir) {
            // 判断动态目录和静态目录是否有嵌套关系，有嵌套关系则不允许设置动态目录（为了安全考虑）
            if (!PathUtil_1.contains(Environment_1.environment.dynamicDir, Environment_1.environment.staticDir) && !PathUtil_1.contains(Environment_1.environment.staticDir, Environment_1.environment.dynamicDir)) {
                this._app.use(DynamicMiddleware_1.default);
            }
            else {
                console.error("d动态目录和静态目录不允许相等或相互嵌套");
            }
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