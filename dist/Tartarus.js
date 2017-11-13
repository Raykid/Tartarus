"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Engine_1 = require("./engine/Engine");
class Tartarus {
    /**
     * 启动Tartarus
     *
     * @param {EngineInitParams} params 启动参数
     * @memberof Tartarus
     */
    static startup(params) {
        Engine_1.engine.initialize(params);
    }
}
exports.default = Tartarus;
//# sourceMappingURL=Tartarus.js.map