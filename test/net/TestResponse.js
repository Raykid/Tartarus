"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("../../dist/engine/net/server/Response");
class TestResponse extends Response_1.default {
    wrap() {
        return {
            fuck: this.fuck
        };
    }
}
exports.default = TestResponse;
//# sourceMappingURL=TestResponse.js.map