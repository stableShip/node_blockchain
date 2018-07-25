'use strict'
import {EncryptTool} from './lib/EncryptTool'
import {StringTool} from './lib/StringTool'

export class Block {
  index
  transactions
  timestamp
  previousHash
  hash
  nonce

  constructor (index, transactions, timestamp, previousHash) {
    this.index = index
    this.transactions = transactions
    this.timestamp = timestamp
    this.previousHash = previousHash
  }

  computeHash () {
    let blockString = StringTool.getSortStr(this)
    return EncryptTool.aesEncode(blockString)
  }
}