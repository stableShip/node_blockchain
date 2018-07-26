import {Block} from './Block'
import * as _ from 'lodash'

export class Blockchain {
  unconfirmedTransactions
  chain
  difficulty

  constructor () {
    this.unconfirmedTransactions = []
    this.chain = []
    this.createGenesisBlock()
    this.difficulty = 1
  }

  createGenesisBlock () {
    let genesisBlock = new Block(0, [], new Date().getTime(), '0')
    genesisBlock.hash = genesisBlock.computeHash()
    this.chain.push(genesisBlock)
  }

  getLastBlock (): Block {
    return this.chain[this.chain.length - 1]
  }

  proofOfWork (block: Block) {
    block.nonce = 0
    let computedHash = block.computeHash()
    console.log(`computedHash ${computedHash}`)
    while (!_.startsWith(computedHash, _.repeat('0', this.difficulty))) {
      console.log(`computedHash ${computedHash}`)
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
    this.chain.push(block)
    return true
  }

  isValidProof (block: Block, blockHash) {
    return _.startsWith(blockHash, _.repeat('0', this.difficulty)) && blockHash === block.computeHash()
  }

  addNewTransaction (transaction) {
    this.unconfirmedTransactions.push(transaction)
  }

  mime () {
    if (this.unconfirmedTransactions.length) {
      return -1
    }
    let lastBlock = this.getLastBlock()
    let newBlock = new Block(lastBlock.index + 1, this.unconfirmedTransactions, new Date().getTime(), lastBlock.hash)
    let proof = this.proofOfWork(newBlock)
    this.addBlock(newBlock, proof)
    this.unconfirmedTransactions = []
    return newBlock.index
  }

}