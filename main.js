const http = require('http');
const minFireFly = require('./FireFlyAlg/minFireFly.js');
const funcs = require('./findExtremumOnFunc.js');
const visualizeData = require('./visualize/visualize.js');
const readFile = require('fs').readFile;
const normalizePath = require('path').normalize;

let params = require('./config.js');

function readFilePromise (pathToFile) {
    return when.promise((resolve, reject) =>
                        readFile(normalizePath(pathToFile),
                                 (err, data) => {
                                     if (err) reject(err);
                                     resolve(data);
                                 }));
}

function min (arrFireFlies) {    
    return arrFireFlies.map((fireFly) => fireFly.rank).sort()[0];
}

function flyFireFlies (fireFliesAmount, lambda, params) {
    const iterationOfFlies = 10;
    const averageMinFireFly = min(Array.from(new Array(iterationOfFlies),
                                             () => minFireFly(params, lambda)));
    return { fireFliesAmount,
             minFireFly: averageMinFireFly
           };
}

function visualizeFireFliesRes () {
    const rangeFireFliesAmount = Array.from(new Array(10), (_, index) => index*100 + 200);
    return visualizeData(
        funcs
            .map(({ lambda, funcName, start, end }) =>
                 ({ funcName,
                    arrBestFireFlies: (rangeFireFliesAmount                                     
                                       .map((fireFliesAmount) =>
                                            flyFireFlies(fireFliesAmount,
                                                         lambda,
                                                         Object
                                                         .assign(params,
                                                                 { fireFliesAmount,
                                                                   startPosition: start,
                                                                   endPosition: end
                                                                 }))))
                  })));
}

const server = http.createServer((req, res) => {
    try {    
        res.writeHead(200, {'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'});
        res.end(visualizeFireFliesRes());
        console.log('all successfully done');
    }
    catch (err) {
        console.log('smth wrong', err);
        res.writeHead(500, {'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'text/plain'});
        res.end('There is error ' + err.toString());
    }
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000);


