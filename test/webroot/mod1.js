"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemUtil_1 = require("../../dist/utils/SystemUtil");
class Mod1 {
    async exec(ctx) {
        console.log("before sleep. " + new Date().toTimeString());
        await SystemUtil_1.sleep(2000);
        console.log("after sleep. " + new Date().toTimeString());
        // 这里返回值
        ctx.body = "This is Mod1!!!";
    }
}
exports.default = Mod1;
//# sourceMappingURL=mod1.js.map