const http = require('http');

http.createServer((req, res) => {
    let data = "";
    req.on("data", d => {
        data += d
    })

    req.on("end",() => {
        console.log(data);

        res.writeHead(200);
        res.end();
    })
}).listen(8080)