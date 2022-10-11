const http = require('http');
const fs = require('fs');
const path = require('path')

const mainPage=(res)=>{
    res.setHeader("Content-Type","text/html");
    res.write(`
    <html>
    <head>
    <title>http example</title>
    </head>
    <body>
    <h1>enviar log</h1>
    <form action="/send_log" method="POST">
        <input type="text" name="log" placeholder='add log...'>
        <button type="submit">enviar log</button>
    </form>
    </body>
    </html>
    `)
    res.end()
}
const notFound=(res)=>{
    res.setHeader("Content-Type","text/html")
    res.write(`
    <html>
    <head>
    <title>not Found</title>
    </head>
    <body>
    <h1>not Found</h1>
    </body>
    </html>
    `)
    res.end()
}
const registerLog=(req)=>{
    //guardar datos
    const pathLog = path.join('.',path.sep,'files','log.txt');
    const reqBody = [];
    req.on('data',(chunck)=>{
        reqBody.push(chunck);
        console.log(chunck);
    })
    req.on('end',()=>{
        const parceBody = Buffer.concat(reqBody).toString('utf-8');
        console.log(parceBody);
        const logInfo=parceBody.split('=')[1];
        fs.writeFileSync(pathLog,`${new Date()} - ${logInfo}\n`,{flag:'a'});
    })

}
const handlerResquest= (req,res)=>{
    //console.log(req.url, req.method)
    const {url, method} = req;
    if(url ==='/'){
        return mainPage(res);
    } else if(url ==='/send_log' && method ==='POST'){
        registerLog(req);
        res.statusCode =302;
        res.setHeader('Location','/');
    }
    return notFound(res);

}

const server = http.createServer(handlerResquest)

server.listen(8000)