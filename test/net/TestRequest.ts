import { Context } from "koa";
import Request from "../../dist/engine/net/server/Request";
import TestResponse from "./TestResponse";

export default class TestRequest extends Request
{
    public static get route():string
    {
        return "/mod1";
    }

    public holly:string;

    public createResponse():TestResponse
    {
        return new TestResponse();
    }

    public parse(data:any, ctx?:Context): void
    {
        this.holly = data.holly;
    }
}