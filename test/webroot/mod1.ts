import { Context } from "koa";
import { Inject, MessageHandler } from "../../dist/core/injector/Injector";
import { core } from "../../dist/core/Core";
import { ModuleClass } from "../../dist/engine/injector/Injector";
import { sleep } from "../../dist/utils/SystemUtil";
import IModule from "../../dist/engine/module/IModule";
import Engine from "../../dist/engine/Engine";

@ModuleClass
export default class Mod1 implements IModule
{
    @Inject
    private _engine:Engine;

    public async exec(ctx:Context):Promise<void>
    {
        console.log("before sleep. " + new Date().toTimeString());
        await sleep(2000);
        console.log(this._engine);
        core.dispatch("fuck", 1);
        console.log("after sleep. " + new Date().toTimeString());
        // 这里返回值
        ctx.body = "This is Mod1!!!";
    }

    @MessageHandler("fuck")
    private async onFuck():Promise<void>
    {
        await sleep(2000);
        console.log(arguments[0]);
    }
}