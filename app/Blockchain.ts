import {Block} from './Block'
import _ from 'lodash'

export class Blockchain {
  unconfirmedTransactions
  chain
  difficulty

  constructor () {
    this.unconfirmedTransactions = []
    this.chain = []
    this.createGenesisBlock()
    this.difficulty = 2
  }

  createGenesisBlock () {
    let genesisBlock = new Block(0, [], new Date().getTime(), '0')
    genesisBlock.hash = genesisBlock.computeHash()
    this.chain.append(genesisBlock)
  }

  getLastBlock (): Block {
    return this.chain[this.chain.length - 1]
  }

  proofOfWork (block: Block) {
    block.nonce = 0
    let computedHash = block.computeHash()
    while (!_.startsWith(computedHash, _.repeat('0', this.difficulty))) {
      block.nonce += 1
      computedHash = block.computeHash()
    }
    return computedHash
  }

  addBlock (block: Block, proof) {
    let previousHash = this.getLastBlock().hash
    if (previousHash !== block.previousHash) {
      return false
    }
    if (!this.isValidProof(block, proof)) {
      return false
    }
    block.hash = proof
    this.chain.append(block)
    return true
  }

  isValidProof (block: Block, blockHash) {
    return _.startsWith(blockHash, _.repeat('0', this.difficulty)) && blockHash === block.computeHash()
  }

  addNewTransaction (transaction) {
    this.unconfirmedTransactions.append(transaction)
  }

  mime () {
    if (this.unconfirmedTransactions.length) {
      return false
    }
    let lastBlock = this.getLastBlock()
    let newBlock = new Block(lastBlock.index + 1, this.unconfirmedTransactions, new Date().getTime(), lastBlock.hash)
    let proof = this.proofOfWork(newBlock)
    this.addBlock(newBlock, proof)
    this.unconfirmedTransactions = []
    return newBlock.index
  }

}