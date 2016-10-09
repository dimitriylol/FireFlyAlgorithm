function buildFunc (lambda, funcName, start, end) {
    return { lambda, funcName, start, end };
}

const funcs = [ buildFunc((nDimensionalPostion) =>
                          nDimensionalPostion
                          .reduce((res, point) => res += point*point,
                                  0),
                          'Sphere function',
                          -100,
                          100) ];

module.exports = funcs;
