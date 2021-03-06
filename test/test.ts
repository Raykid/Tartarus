import Tartarus from "../dist/Tartarus";
import TestRequest from "./net/TestRequest";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-13
 * @modify date 2017-11-13
 * 
 * 测试工程
*/
Tartarus.startup({
    entity: 12345,
    dynamicDir: "./modules/",
    staticDir: "./webroot/",
    requests: [TestRequest]
});