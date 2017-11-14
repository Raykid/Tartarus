import { Context } from "koa";
import { Inject } from "../../dist/core/injector/Injector";
import { ModuleClass } from "../../dist/engine/injector/Injector";
import Engine from "../../dist/engine/Engine";
import Module from "../../dist/engine/module/Module";

@ModuleClass
export default class Mod1 extends Module
{
    @Inject
    private _engine:Engine;

    public async exec(ctx:Context):Promise<void>
    {
        // 这里返回值
        ctx.body = "This is Mod1!!!";
    }
}