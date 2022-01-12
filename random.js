const crypto = require("crypto");

const strToNumbers = (hexString) => {
    const numbers = [];
    for (let i = 0; i < 16; i++) {
        numbers.push(hexString[i] > '7' ? 1 : 0);
    }
    return numbers;
}

const generateResultNumbers = (rSeed, uSeed) => {
    const hash = crypto
        .createHash("sha512")
        .update(`${rSeed}${uSeed}`)
        .digest("hex");
    const numbers = strToNumbers(hash);
    return numbers;
}

module.exports = {
    generateResultNumbers
}