/**
 * 规整url
 * @param url
 */
export declare function trimURL(url: string): string;
/**
 * 检查URL是否是绝对路径（具有协议头）
 * @param url 要判断的URL
 * @returns {any} 是否是绝对路径
 */
export declare function isAbsolutePath(url: string): boolean;
/**
 * 替换url中的host
 * @param url       url
 * @param host      要替换的host
 * @param forced    是否强制替换（默认false）
 */
export declare function wrapHost(url: string, host: string, forced?: boolean): string;
/**
 * 获取URL的host+pathname部分，即问号(?)以前的部分
 *
 */
export declare function getHostAndPathname(url: string): string;
/**
 * 获取URL路径（文件名前的部分）
 * @param url 要分析的URL
 */
export declare function getPath(url: string): string;
/**
 * 获取URL的文件名
 * @param url 要分析的URL
 */
export declare function getName(url: string): string;
/**
 * 解析URL
 * @param url 要被解析的URL字符串
 * @returns {any} 解析后的URLLocation结构体
 */
export declare function parseUrl(url: string): URLLocation;
/**
 * 解析url查询参数
 * @TODO 添加对jquery编码方式的支持
 * @param url url
 */
export declare function getQueryParams(url: string): {
    [key: string]: string;
};
/**
 * 将参数连接到指定URL后面
 * @param url url
 * @param params 一个map，包含要连接的参数
 * @return string 连接后的URL地址
 */
export declare function joinQueryParams(url: string, params: Object): string;
/**
 * 将参数链接到URL的hash后面
 * @param url 如果传入的url没有注明hash模块，则不会进行操作
 * @param params 一个map，包含要连接的参数
 */
export declare function joinHashParams(url: string, params: Object): string;
export interface URLLocation {
    href: string;
    origin: string;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
}
