import { Context } from "koa";
import { sleep } from "../../dist/utils/SystemUtil";
import IModule from "../../dist/engine/module/IModule";

export default class Mod1 implements IModule
{
    public async exec(ctx:Context):Promise<void>
    {
        console.log("before sleep. " + new Date().toTimeString());
        await sleep(2000);
        console.log("after sleep. " + new Date().toTimeString());
        // 这里返回值
        ctx.body = "This is Mod1!!!";
    }
}