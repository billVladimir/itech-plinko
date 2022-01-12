const chance = require("chance")();
const { generateResultNumbers2 } = require("./random");


/**
 * The game algorithm uses the Galton board (central limit theorem)
 */

class PlinkoResult {
    constructor() { }

    getResult(rSeed, uSeed, rows) {
        const numbers = generateResultNumbers2(rSeed, uSeed);
        const result = numbers
            .slice(0, rows)
            .reduce((acc, n) => acc + n, 0);
        return result;
    }
}

/**
 * Each round has a seed - a random string of 16 characters
 */
class PlinkoRound {
    constructor() {
        this.seed = chance.string({ length: 16 });
    }

    getSeed() {
        return this.seed;
    }
}

/**
 * The user has his own seed (a random string of 20 characters) 
 * and the number of rounds played with this seed (nonce). 
 * To get the seed used in the round, we concatenate 
 * the seed with the nonce, separating them with a "-"
 */
class User {
    constructor() {
        this.seed = chance.string({ length: 20 });
        this.nonce = 0;
    }

    updateNonce() {
        this.nonce += 1;
    }

    updateSeed() {
        this.seed = chance.string({ length: 20 });
        this.nonce = 0;
    }

    getSeed() {
        return this.seed + '-' + this.nonce;
    }
}

const plinkoResult = new PlinkoResult();
const user = new User();

/**
 * Suppose a user plays 100 rounds, and the number of rows is 12. 
 * In this case, the number of baskets will be 13 (index from 0 to 12)
 */
for (let i = 0; i < 100; i++) {
    const rows = 12;
    const round = new PlinkoRound(rows);
    const roundSeed = round.getSeed();
    const userSeed = user.getSeed();
    const result = plinkoResult.getResult(roundSeed, userSeed, rows);

    console.log('Basket index: ', result);

    /**
     * After each round, the value of the nonce is increased by one.
     */
    user.updateNonce();

    /**
     * The user can update the seed at any time. 
     * In this case, the number (nonce) is reset.
     */
    if (Math.random() < 0.1) user.updateSeed();
}