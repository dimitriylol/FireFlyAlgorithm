const toCSV = require('./toCSV.js');
const generateGraphicFromCSV = require('./graphicFromCSV.js');
const resolvePath = require('path').resolve;
const when = require('when');

/**
 * arrFireFliesRes is array of object
 * { [String] funcName,
 *   [Array] arrBestFireFlies }
 */
function visualizeData (arrFireFliesRes) {
    return JSON.stringify(arrFireFliesRes
                          .map(({ funcName, arrBestFireFlies }) =>
                               ({ funcName,
                                  graphic: { axisX: 'fireFliesAmount',
                                             axisY: 'minFireFly',
                                             values: arrBestFireFlies
                                           }
                                })));
}

module.exports = visualizeData;










