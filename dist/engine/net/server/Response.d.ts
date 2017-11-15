/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-15
 * @modify date 2017-11-15
 *
 * 作为服务器端的返回基类
*/
export default abstract class Response {
    /**
     * 将返回结构体打包成原始数据
     *
     * @abstract
     * @returns {*} 打包后的原始数据
     * @memberof Response
     */
    abstract wrap(): any;
}
