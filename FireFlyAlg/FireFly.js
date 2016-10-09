class FireFly {
    constructor(position, calcBrightness) {
        this._calcBrightness = calcBrightness;
        this._position = position;
        this._rank = calcBrightness(position);
    }

    get position () { return this._position; }

    set position (val) {
        this._position = val;
        this._rank = this._calcBrightness(val);
    }

    get rank () { return this._rank; }

    toString() { return `FireFly position: ${this._position} rank: ${this._rank}`; }
}

module.exports = FireFly;
