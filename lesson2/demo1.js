var http = require('http');
http.createServer(function(req, res){
    res.write('hi');
    res.end();
}).listen(8080);

