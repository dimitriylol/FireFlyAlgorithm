const FireFlySwarm = require('./FireFlySwarm.js');
const moveFireFly = require('./moveFireFly.js');

function countAlpha ({ alpha0, totalIterations }, iter) {
    const alphaMin = 0.0001;
    const alphaMax = 0.01;
    const delta = Math.pow(alphaMin/alphaMax, 1/totalIterations);
    return alpha0 *  Math.pow(delta, iter);
}

function calcLambda (fireFlyRank, { fireFliesAmount, lambdaMax, lambdaMin }) {
    return lambdaMax - fireFlyRank * (lambdaMax - lambdaMin) / (fireFliesAmount - 1); 
}

function findFireFlies (params, calcBrightness) {
    let fireFlySwarm = new FireFlySwarm(params, calcBrightness);
    let bestFireFly = fireFlySwarm.swarm[0];
    for (let iter = 0; iter < params.totalIterations; iter++) {
        process.stdout.write('.');
        let alpha = countAlpha(params, iter);
        for (let i = 0; i < params.fireFliesAmount; i++) {

            for (let j = 0; j < params.fireFliesAmount; j++) {
                if (fireFlySwarm.swarm[j].rank > fireFlySwarm.swarm[i].rank) {
                    fireFlySwarm.swarm[j].position =
                        moveFireFly(fireFlySwarm.swarm[j].position,
                                    fireFlySwarm.swarm[i].position,
                                    calcLambda(fireFlySwarm.swarm[j].rank,
                                               params),
                                    alpha,
                                    params);
                }
            }
        }
        console.error('local best before', bestFireFly.rank);
        bestFireFly = fireFlySwarm.chooseMinFireFlyByRank();
        console.error('local best after', bestFireFly.rank);
    }
    console.log("We've got a winner! " + bestFireFly);
    console.log("This is the best firefly from another " + params.fireFliesAmount + " fireflies\n");
    return bestFireFly;
}

module.exports = findFireFlies;
