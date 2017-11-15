"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("../../dist/engine/net/server/Request");
const TestResponse_1 = require("./TestResponse");
class TestRequest extends Request_1.default {
    static get route() {
        return "/mod1";
    }
    createResponse() {
        return new TestResponse_1.default();
    }
    parse(data, ctx) {
        this.holly = data.holly;
    }
}
exports.default = TestRequest;
//# sourceMappingURL=TestRequest.js.map