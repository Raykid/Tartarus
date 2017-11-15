"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tartarus_1 = require("../dist/Tartarus");
const TestRequest_1 = require("./net/TestRequest");
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * 测试工程
*/
Tartarus_1.default.startup({
    entity: 12345,
    dynamicDir: "./modules/",
    staticDir: "./webroot/",
    requests: [TestRequest_1.default]
});
//# sourceMappingURL=test.js.map