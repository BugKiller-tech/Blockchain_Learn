// NFT Non-Fungible Token

const crypto = require('crypto-js')
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return crypto.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
  }
}

class Blockchain {
  constructor() {
    this.chain = [ this.createGenesisBlock() ];
  }

  createGenesisBlock () {
    return new Block(0, "12/21/2021", "Genesis block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
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
hChain.addBlock(new Block(1, "12/21/2021", { amount: 4 }));
hChain.addBlock(new Block(2, "12/21/2021", { amount: 10 }));

console.log(JSON.stringify(hChain, null, 4));

console.log('Is block chain valid ? ' + hChain.isChainValid());

// HERR for show to guys..
// hChain.chain[1].data = { amount: 100 }
// hChain.chain[1].hash = hChain.chain[1].calculateHash(); // if we recalculate then ok ? NOPE
// console.log('Is block chain valid ?? ' + hChain.isChainValid());

// if something broken block chain, then we need a way to rollback of the chain.


// let proofOfWork = 0
// while(true) {
//   proofOfWork++;
//   let hash = crypto.SHA256("some data here"+proofOfWork).toString();
//   console.log(proofOfWork, hash)
//   // if (proofOfWork > 100) {
//   //   break;
//   // }
//   if (hash.startsWith("000")) {
//     break;
//   }
// }