function fireFlyAttraction ({ betta0, gamma }, distance) {
    return betta0 * Math.exp(-gamma, distance*distance);
}

function leviFlight (alpha, lambda) {
    const rand = Math.random();
    return alpha * Math.pow(rand, -1/lambda) * (rand - 0.5);
}

function countDistance (resultFireFlyI, resultFireFlyJ) {
    return Math
        .sqrt(resultFireFlyI
              .reduce((distance, _, dimension) =>
                      distance += Math.pow(resultFireFlyI[dimension] - resultFireFlyJ[dimension],
                                           2),
                      0));
}

function normalizePosition (position, { startPosition, endPosition }) {
    if (position > endPosition) return endPosition;
    if (position < startPosition) return startPosition;
    return position;
}

/**
 * params is object with mandatory keys: betta0, gamma
 * alpha and lambda are coeficcients for normal spreading
 * positionFireFly is N-dimensional point
 */
function moveFireFly (positionFireFlyI, positionFireFlyJ, lambda, alpha, params) {
    const distance = countDistance(positionFireFlyI, positionFireFlyJ);
    return positionFireFlyI
        .map((posI, dimension) =>
             normalizePosition(posI +
                               fireFlyAttraction(params, distance) * distance +
                               alpha * leviFlight(alpha,
                                                  lambda),
                               params));
}

module.exports = moveFireFly;
