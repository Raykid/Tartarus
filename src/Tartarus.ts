import { engine, EngineInitParams } from "./engine/Engine";

export default class Tartarus
{
    /**
     * 启动Tartarus
     * 
     * @param {EngineInitParams} params 启动参数
     * @memberof Tartarus
     */
    public static startup(params:EngineInitParams):void
    {
        engine.initialize(params);
    }
}