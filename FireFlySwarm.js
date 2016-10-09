const FireFly = require('./FireFly.js');

/**
 * start int
 * end int
 * random position between start and end, include start, exclude end
 */
function randomPosition (start, end) {
    return Math.random() * (end - start) + start;
}

function ascendingFireFlyByRank (fireFly1, fireFly2) {
    if (fireFly1.rank < fireFly2.rank) return 1;
    if (fireFly1.rank > fireFly2.rank) return -1;
    return 0;
}

function arrRange (length) {
    return Array.apply(undefined, { length }).map(Number.call, Number);
}
    

class FireFlySwarm {
    constructor ({ fireFliesAmount, startPosition, endPosition }, calcBrightness) {
        this._swarm = (arrRange(fireFliesAmount)
                       .map((el) => (new FireFly(randomPosition(startPosition, endPosition),
                                                 calcBrightness))));
        this._rankFireFlySwarm(ascendingFireFlyByRank);
    }

    get swarm () { return this._swarm; }
    
    _rankFireFlySwarm (sortFunc) { this._swarm = this._swarm.sort(sortFunc); }

    chooseMaxFireFlyByRank () {
        this._rankFireFlySwarm(ascendingFireFlyByRank);
        return this._swarm[0];
    }
}

module.exports = FireFlySwarm;
