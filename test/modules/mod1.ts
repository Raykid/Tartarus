import { Context } from "koa";
import { Inject } from "../../dist/core/injector/Injector";
import { ModuleClass } from "../../dist/engine/injector/Injector";
import Engine from "../../dist/engine/Engine";
import Module from "../../dist/engine/module/Module";
import TestRequest from "../net/TestRequest";
import TestResponse from "../net/TestResponse";

@ModuleClass
export default class Mod1 extends Module
{
    @Inject
    private _engine:Engine;

    public exec(request:TestRequest):TestResponse
    {
        var response:TestResponse = request.createResponse();
        response.fuck = request.holly;
        return response;
    }
}