"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
class Test {
    async go(ctx) {
        ctx.body = 'Hello World';
        console.log("use");
        await sleep(3000);
        console.log("after");
        await sleep(3000);
        console.log("end");
        return 1;
    }
}
const app = new Koa();
app.use(new Test().go);
function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}
app.listen(12345);
//# sourceMappingURL=index.js.map