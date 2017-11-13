import IModuleConstructor from "../module/IModuleConstructor";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 *
 * Engine的装饰器定义
*/
/** 定义模块，支持实例注入 */
export declare function ModuleClass(cls: IModuleConstructor): IConstructor;
