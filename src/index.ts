import Koa = require('koa');
import { Context } from 'koa';

interface ITest
{
    go(ctx);
}

class Test implements ITest
{
    public async go(ctx:Context)
    {
        ctx.body = 'Hello World';
        console.log("use");
    
        await sleep(3000);
    
        console.log("after");
      
        await sleep(3000);
        
        console.log("end");

        return 1;
    }
}

const app = new Koa();
app.use(new Test().go);


function sleep(duration)
{
    return new Promise(resolve=>{
        setTimeout(resolve, duration);
    });
}

app.listen(12345);