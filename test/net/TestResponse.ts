import Response from "../../dist/engine/net/server/Response";

export default class TestResponse extends Response
{
    public fuck:string;

    public wrap():any
    {
        return {
            fuck: this.fuck
        };
    }
}