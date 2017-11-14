import path = require("path");

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-14
 * @modify date 2017-11-14
 * 
 * 路径工具
*/

/**
 * 判断path1是否包含或等于path2
 * 
 * @export
 * @param {string} path1 
 * @param {string} path2 
 * @returns {boolean} 
 */
export function contains(path1:string, path2:string):boolean
{
    if(!path1 || !path2) return false;
    return (path.relative(path1, path2).charAt(0) != ".");
}