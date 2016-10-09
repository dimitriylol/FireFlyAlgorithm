const minFireFly = require('./FireFlyAlg/minFireFly.js');
const params = require('./config.js');
const funcs = require('./findExtremumOnFunc.js');
const visualizeData = require('./visualize/visualize.js');

funcs
    .forEach(({ lambda, funcName, start, end }) =>
             visualizeData(funcName,
                           minFireFly(Object.assign(params,
                                                    { startPosition: start,
                                                      endPosition: end }),
                                      lambda)));
