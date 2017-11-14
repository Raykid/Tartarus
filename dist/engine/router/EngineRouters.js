"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleManager_1 = require("../module/ModuleManager");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * 引擎提供的各种Router
*/
class DeleteModuleRouter {
    constructor() {
        this.path = /\/\$delete(\/.*)?/;
    }
    async exec(ctx, next) {
        ModuleManager_1.moduleManager.deleteModule(ctx["captures"][0]);
        // 返回结果
        ctx.body = "done";
    }
}
exports.DeleteModuleRouter = DeleteModuleRouter;
class RefreshModuleRouter {
    constructor() {
        this.path = /\/\$refresh(\/.*)?/;
    }
    async exec(ctx, next) {
        ModuleManager_1.moduleManager.refreshModule(ctx["captures"][0]);
        // 返回结果
        ctx.body = "done";
    }
}
exports.RefreshModuleRouter = RefreshModuleRouter;
//# sourceMappingURL=EngineRouters.js.map