import path = require("path");
import { Injectable } from "../../core/injector/Injector";
import { core } from "../../core/Core";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 * 
 * 记录各种环境参数
*/
@Injectable
export default class Environment
{
    private _baseDir:string;
    /**
     * 获取启动模块所在路径
     * 
     * @readonly
     * @type {string}
     * @memberof Engine
     */
    public get baseDir():string
    {
        return this._baseDir;
    }

    private _dynamicDir:string;
    /**
     * 获取动态逻辑代码根路径
     * 
     * @readonly
     * @type {string}
     * @memberof Environment
     */
    public get dynamicDir():string
    {
        return this._dynamicDir;
    }

    private _staticDir:string;
    /**
     * 获取静态资源根路径
     * 
     * @readonly
     * @type {string}
     * @memberof Engine
     */
    public get staticDir():string
    {
        return this._staticDir;
    }

    public initialize(dynamicDir?:string, staticDir?:string):void
    {
        // 取到根模块路径，作为baseDir的值
        var temp:NodeModule = module;
        while(temp.parent)
        {
            temp = temp.parent;
        }
        this._baseDir = path.dirname(temp.filename);
        // 设置根路径，如果是相对路径则根据baseDir转换为绝对路径
        this._dynamicDir = dynamicDir;
        if(this._dynamicDir && !path.isAbsolute(this._dynamicDir))
        {
            this._dynamicDir = path.resolve(this._baseDir, this._dynamicDir);
        }
        // 设置根路径，如果是相对路径则根据baseDir转换为绝对路径
        this._staticDir = staticDir;
        if(this._staticDir && !path.isAbsolute(this._staticDir))
        {
            this._staticDir = path.resolve(this._baseDir, this._staticDir);
        }
    }
}
/** 再额外导出一个单例 */
export const environment:Environment = core.getInject(Environment);