"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleManager_1 = require("../module/ModuleManager");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 *
 * 热更新模块的Router
*/
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
exports.default = RefreshModuleRouter;
//# sourceMappingURL=RefreshModuleRouter.js.map