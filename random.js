const crypto = require("crypto");

const decodeHexStringToByteArray = (hexString) => {
    const result = [];
    while (hexString.length >= 2) {
        result.push(parseInt(hexString.substring(0, 2), 16));
        hexString = hexString.substring(2, hexString.length);
    }
    return result;
}

const byteArrayToNumbers = (byteArray) => {
    const numbers = [];
    for (let i = 16, j = 0; i > 1; i--, j++) {
        const bytes = byteArray.slice(j * 8, j * 8 + 8);
        const number =
            bytes
                .map(
                    (byte, index) =>
                        byte / Math.pow(256, index + 1)
                )
                .reduce((sum, num) => sum + num, 0) * 2;
        numbers.push(Math.floor(number));
    }
    return numbers;
}

const generateResultNumbers = (rSeed, uSeed) => {
    const firstHash = crypto
        .createHash("sha512")
        .update(`${rSeed}${uSeed}0`)
        .digest("hex");
    const secondtHash = crypto
        .createHash("sha512")
        .update(`${rSeed}${uSeed}1`)
        .digest("hex");

    const byteArray = decodeHexStringToByteArray(
        `${firstHash}${secondtHash}`
    );
    const numbers = byteArrayToNumbers(byteArray);
    return numbers;
}

module.exports = {
    generateResultNumbers
}