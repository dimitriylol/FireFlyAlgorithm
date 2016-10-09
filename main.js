const maxFireFly = require('./maxFireFly.js');

// input params
const params = { betta0: 0.5,
                 gamma: 1.0,
                 lambdaMin: 0.0,
                 lambdaMax: 1.0,
                 alpha0: 0.5,
                 totalIterations: 1000,
                 fireFliesAmount: 100                 
               };

function buildFunc (lambda, funcName, start, end) {
    return { lambda, funcName, start, end };
}

// funcs to count
const funcs = [ buildFunc((x) => -x*x - 2, 'testFunc', -10, 10) ];

function visualizeData (funcName, bestFly) {
    console.log(`best firefly for ${funcName} is ${bestFly}`);
}

funcs
    .map(({ lambda, funcName, start, end }) =>
         visualizeData(funcName,
                       maxFireFly(Object.assign(params,
                                                { startPosition: start,
                                                  endPosition: end }),
                                  lambda)));
