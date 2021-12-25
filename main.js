const crypto = require('crypto-js')

/**
 * computer is so fast these days so calculating hash is not a problem.
 * we need to prevent and it's called something like proof of work
 * ex; bitcoin requires the hash of the block begin with certain amount of 0, because we can't implement the output of the hash
 * 
 */
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();

    /**
     * why ? above index, timestamp, data, prevoiusHash is transaction so we can't change it. so we need the thing we can change.
     * generally 
     */
    this.nonce = 0; 
  }
  calculateHash() {
    return crypto.SHA256(this.index + this.previousHash + this.timestamp
                        + JSON.stringify(this.data) + this.nonce).toString()
  }

  mineBlock (difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [ this.createGenesisBlock() ];
    this.difficulty = 2;
  }

  createGenesisBlock () {
    return new Block(0, "12/21/2021", "Genesis block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock); // in reality, we can't add block easily. it will need to have some validation
  }


  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}


let hChain = new Blockchain();
console.log('Mining block 1...');
hChain.addBlock(new Block(1, "12/21/2021", { amount: 4 }));
console.log('Mining block 2...');
hChain.addBlock(new Block(2, "12/21/2021", { amount: 10 }));

