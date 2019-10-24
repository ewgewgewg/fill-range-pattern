function filler (startValue, algorithm, length) {
    if (typeof length !== "number"){
        throw new TypeError("Length argument not a number.")
    } else if (typeof startValue !== "number" && !Array.isArray(startValue)){
        throw new TypeError("Starting value or values not a number or an array.")
    } else if (typeof algorithm !== "string" && typeof algorithm !== "function"){
        throw new TypeError("Algorithm not a valid string or a function.")
    }

    const array = typeof startValue === "number" ? [startValue]: startValue;

    if (typeof algorithm === "string"){
        let step = +algorithm.slice(1);
        if (algorithm[0] === "+"){
            algorithm = (x) => x + step;
        } else if (algorithm[0] === "-"){
            algorithm = (x) => x - step;
        } else if (algorithm.slice(0,2) === "**"){
            step = +algorithm.slice(2);
            algorithm = (x) => x ** step;
        } else if (algorithm[0] === "*"){
            algorithm = (x) => x * step;
        } else if (algorithm[0] === "/"){
            algorithm = (x) => x / step;
        } else if (algorithm[0] === "^"){
            algorithm = (x) => x ** step;
        } else {
            throw new TypeError("Algorithm argument not of expected string format. Please use +, -, *, /, or ^ followed by a value that can be coerced into a number. Example => '*2' ");
        }
    }

        for (let i = array.length-1; i < length-1; i++){
            array.push(algorithm(array[i], i, array));
        };
        return array;
}

module.exports = filler;