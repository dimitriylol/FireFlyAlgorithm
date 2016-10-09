const minFireFly = require('./minFireFly.js');

// input params
const params = { betta0: 1.5,
                 gamma: 1.0,
                 lambdaMin: 0.0,
                 lambdaMax: 1.0,
                 alpha0: 0.5,
                 totalIterations: 1000,
                 fireFliesAmount: 500,
                 dimension: 2
               };

function buildFunc (lambda, funcName, start, end) {
    return { lambda, funcName, start, end };
}

// funcs to count
const funcs = [ buildFunc((nDimensionalPostion) =>
                          nDimensionalPostion
                          .reduce((res, point) => res += point*point,
                                  0),
                          'Sphere function',
                          -100,
                          100) ];

function visualizeData (funcName, bestFly) {
    console.log(`best firefly for ${funcName} is ${bestFly}`);
}

funcs
    .map(({ lambda, funcName, start, end }) =>
         visualizeData(funcName,
                       minFireFly(Object.assign(params,
                                                { startPosition: start,
                                                  endPosition: end }),
                                  lambda)));
